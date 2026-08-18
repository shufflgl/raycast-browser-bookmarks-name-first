type BookmarkFrecency = {
  frecency: number;
};

export type SearchableBookmark = {
  title: string;
  bookmarkFrecency?: BookmarkFrecency;
};

export type BookmarkSearchResult<T extends SearchableBookmark> = {
  item: T;
  score?: number;
};

function normalizeSearchText(value: string) {
  return value.normalize("NFKC").trim().toLowerCase();
}

function getTitleMatchRank(title: string, query: string) {
  const normalizedTitle = normalizeSearchText(title);
  const normalizedQuery = normalizeSearchText(query);

  if (normalizedTitle === normalizedQuery) {
    return 0;
  }

  if (normalizedTitle.startsWith(normalizedQuery)) {
    return 1;
  }

  if (normalizedTitle.includes(normalizedQuery)) {
    return 2;
  }

  return 3;
}

/**
 * Rank explicit bookmark-name matches before fuzzy relevance and usage history.
 * Frecency remains a final tie-breaker so it can never displace a better name match.
 */
export function sortBookmarkSearchResults<T extends SearchableBookmark>(
  results: BookmarkSearchResult<T>[],
  query: string,
) {
  return results.sort((a, b) => {
    const titleRankDifference = getTitleMatchRank(a.item.title, query) - getTitleMatchRank(b.item.title, query);

    if (titleRankDifference !== 0) {
      return titleRankDifference;
    }

    const scoreDifference = (a.score ?? 1) - (b.score ?? 1);

    if (scoreDifference !== 0) {
      return scoreDifference;
    }

    const frecencyDifference = (b.item.bookmarkFrecency?.frecency ?? 0) - (a.item.bookmarkFrecency?.frecency ?? 0);

    if (frecencyDifference !== 0) {
      return frecencyDifference;
    }

    return a.item.title.localeCompare(b.item.title);
  });
}
