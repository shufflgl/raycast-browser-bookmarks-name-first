# Attribution Notice

**Browser Bookmarks — Name First** is a derivative work based on the open-source **Browser Bookmarks** extension from the [`raycast/extensions`](https://github.com/raycast/extensions) repository.

## Upstream Project

- Extension: [Browser Bookmarks](https://github.com/raycast/extensions/tree/f38af6030233f08b358478e19e818fc71e58ec9d/extensions/browser-bookmarks)
- Original author: [Thomas Lombart (`thomaslombart`)](https://github.com/thomaslombart)
- Base commit: [`f38af6030233f08b358478e19e818fc71e58ec9d`](https://github.com/raycast/extensions/commit/f38af6030233f08b358478e19e818fc71e58ec9d)
- Copyright: `Copyright (c) 2021 Raycast`
- License: [MIT](./LICENSE)

The upstream contributor and past-contributor lists are preserved in [`package.json`](./package.json).

## Fork Modifications

This fork was created and is maintained by [`shufflgl`](https://github.com/shufflgl). Its primary behavioral change is to rank bookmark-name relevance ahead of usage frequency:

1. Exact bookmark-name match
2. Bookmark-name prefix match
3. Bookmark-name substring match
4. Fuzzy relevance
5. Usage frequency as a final tie-breaker

The extension name, command name, package identity, documentation, tests, and private-store publishing metadata were also changed to distinguish this fork from the original extension.

This is an independent, unofficial fork. It is not maintained by, affiliated with, or endorsed by Raycast or the original author.

## License Preservation

The upstream MIT copyright and permission notice are retained unchanged in [`LICENSE`](./LICENSE) and are included in the repository and downloadable release archives.
