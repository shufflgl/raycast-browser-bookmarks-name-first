import { readdir, readFile, stat } from "node:fs/promises";
import { join } from "node:path";

type ChromiumProfile = { path: string; name: string };

function isMissing(error: unknown) {
  return (error as NodeJS.ErrnoException).code === "ENOENT";
}

// Check real profile directories even when Local State is absent or incomplete.
// Propagate access failures so they are not presented as an empty bookmark list.
export async function getChromiumProfiles(path: string) {
  let entries;
  try {
    entries = await readdir(path, { withFileTypes: true });
  } catch (error) {
    if (isMissing(error)) return { profiles: [], defaultProfile: "" };
    throw error;
  }

  let metadata: { profile?: { info_cache?: Record<string, { name?: string }>; last_used?: string } } | null = null;
  try {
    metadata = JSON.parse(await readFile(join(path, "Local State"), "utf8"));
  } catch (error) {
    // Directory discovery also works when only Local State is inaccessible.
    if (!(error instanceof SyntaxError) && !isMissing(error)) {
      const code = (error as NodeJS.ErrnoException).code;
      if (code !== "EACCES" && code !== "EPERM") throw error;
    }
  }

  const profiles: ChromiumProfile[] = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    let hasBookmarks = false;
    for (const fileName of ["Bookmarks", "AccountBookmarks"]) {
      try {
        if ((await stat(join(path, entry.name, fileName))).isFile()) hasBookmarks = true;
      } catch (error) {
        if (!isMissing(error)) throw error;
      }
    }
    if (!hasBookmarks) continue;
    const name = metadata?.profile?.info_cache?.[entry.name]?.name;
    profiles.push({ path: entry.name, name: typeof name === "string" && name ? name : entry.name });
  }

  profiles.sort((a, b) => a.name.localeCompare(b.name));
  const lastUsed = metadata?.profile?.last_used;
  const defaultProfile =
    profiles.find((profile) => profile.path === lastUsed)?.path ??
    profiles.find((profile) => profile.path === "Default")?.path ??
    profiles[0]?.path ??
    "";
  return { profiles, defaultProfile };
}
