import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { getChromiumProfiles } from "./chromiumProfiles.ts";

for (const [label, metadata] of [
  ["missing Local State", undefined],
  ["malformed Local State", "{"],
  ["missing profile metadata", "{}"],
  ["null metadata", "null"],
  ["stale last_used", JSON.stringify({ profile: { last_used: "Deleted", info_cache: {} } })],
] as const) {
  test(`discovers bookmark profiles with ${label}`, async (t) => {
    const root = await mkdtemp(join(tmpdir(), "bookmark-profiles-"));
    t.after(() => rm(root, { recursive: true, force: true }));
    await mkdir(join(root, "Default"));
    await writeFile(join(root, "Default", "AccountBookmarks"), "{}");
    await mkdir(join(root, "Unrelated"));
    if (metadata !== undefined) await writeFile(join(root, "Local State"), metadata);
    assert.deepEqual(await getChromiumProfiles(root), {
      profiles: [{ path: "Default", name: "Default" }],
      defaultProfile: "Default",
    });
  });
}

test("preserves profile names and a valid last-used profile, including uncached directories", async (t) => {
  const root = await mkdtemp(join(tmpdir(), "bookmark-profiles-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  for (const profile of ["Default", "Profile 2"]) {
    await mkdir(join(root, profile));
    await writeFile(join(root, profile, "Bookmarks"), "{}");
  }
  await writeFile(
    join(root, "Local State"),
    JSON.stringify({ profile: { last_used: "Profile 2", info_cache: { "Profile 2": { name: "Work" } } } }),
  );
  assert.deepEqual(await getChromiumProfiles(root), {
    profiles: [
      { path: "Default", name: "Default" },
      { path: "Profile 2", name: "Work" },
    ],
    defaultProfile: "Profile 2",
  });
});
