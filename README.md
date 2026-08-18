# Browser Bookmarks — Name First

**Unofficial personal fork · [MIT licensed](./LICENSE) · [Original extension](https://github.com/raycast/extensions/tree/main/extensions/browser-bookmarks)**

This project is an independent fork of Raycast's **Browser Bookmarks** extension, published privately to the **Ygdra** Raycast organization. It is not maintained by, affiliated with, or endorsed by Raycast or the original author.

It keeps the upstream browser and profile compatibility while changing only search-result ranking:

1. Exact bookmark-name match
2. Bookmark-name prefix match
3. Bookmark-name substring match
4. Fuse.js fuzzy relevance
5. Usage frequency as a final tie-breaker

The original extension ranked any previously opened fuzzy match ahead of an unused exact name match. This fork preserves frecency for the unfiltered list and for true search ties, but it can no longer override a better bookmark-name match.

## Installation

Install **Browser Bookmarks — Name First** from the [Ygdra Private Store](https://www.raycast.com/yggdrashufflgl/browser-bookmarks-name-first) in Raycast. Once installed, Raycast keeps it updated across every machine signed in to an account that belongs to the organization.

## Download

- [Download the v1.0.0 source ZIP](https://github.com/shufflgl/browser-bookmarks-name-first/releases/download/v1.0.0/browser-bookmarks-name-first-v1.0.0.zip)
- [Browse the source on GitHub](https://github.com/shufflgl/browser-bookmarks-name-first)

The ZIP is a portable source package, not a standalone Raycast installer. Unzip it, then run the local-development commands below. For normal use, prefer the Private Store link above.

For local development:

```sh
npm install
npm test
npm run lint
npm run build
npm run dev
```

The command is named **Search Browser Bookmarks by Name** so it can coexist with the public Store version during comparison. The package is private and publishes only to the Ygdra organization (`yggdrashufflgl`).

## Attribution

This project is derived from the open-source **Browser Bookmarks** extension maintained in Raycast's extensions repository.

- Original extension: [Browser Bookmarks](https://github.com/raycast/extensions/tree/f38af6030233f08b358478e19e818fc71e58ec9d/extensions/browser-bookmarks)
- Original author: [Thomas Lombart (`thomaslombart`)](https://github.com/thomaslombart)
- Upstream repository: [raycast/extensions](https://github.com/raycast/extensions)
- Base commit: [`f38af6030233f08b358478e19e818fc71e58ec9d`](https://github.com/raycast/extensions/commit/f38af6030233f08b358478e19e818fc71e58ec9d)
- Copyright notice: `Copyright (c) 2021 Raycast`

The upstream contributor and past-contributor lists are preserved in [`package.json`](./package.json). See [`NOTICE.md`](./NOTICE.md) for the complete provenance and modification notice.

## License

This project is distributed under the [MIT License](./LICENSE), the same license used by the upstream Raycast extensions repository.

The original Raycast copyright and permission notice are retained unchanged. The MIT License permits use, copying, modification, publication, distribution, sublicensing, and sale, provided that the copyright and permission notice remain included in copies or substantial portions of the software. Third-party dependencies remain subject to their respective licenses.

## Original Documentation

Integrate bookmarks from Brave, ChatGPT Atlas, Chrome, Edge, Firefox, Safari, Arc, Sidekick, Vivaldi, Prisma Access, Perplexity Comet, Dia, Ghost Browser, or Helium.

## Configuration

The extension retrieves bookmarks from two sources: your browsers and their profiles. The default browser is enabled by default, while the others are disabled. You can enable them using the `Select Browsers` action (`⌘` + `⇧` + `S`). This will directly get your bookmarks.

On Windows, the first supported browsers are:

- Chrome
- Edge
- Brave

Chromium bookmarks are automatically refreshed when the selected profile's bookmark file changes.

If you have multiple profiles, you can select the one you want from the enabled browsers:

- ChatGPT Atlas `⌘` + `⇧` + `G`
- Brave: `⌘` + `⇧` + `B`
- Chrome: `⌘` + `⇧` + `C`
- Dia: `⌘` + `⇧` + `D`
- Edge: `⌘` + `⇧` + `E`
- Firefox: `⌘` + `⇧` + `F`
- Helium: `⌘` + `⇧` + `H`
- Arc: `⌘` + `⇧` + `A`
- Vivaldi / Vivaldi Snapshot: `⌘` + `⇧` + `V`
- Prisma Access: `⌘` + `⇧` + `P`
- Perplexity Comet: `⌘` + `⇧` + `O`
- Whale: `⌘` + `⇧` + `W`
- Zen: `⌘` + `⇧` + `Z`
