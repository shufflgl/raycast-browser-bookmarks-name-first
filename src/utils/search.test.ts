import assert from "node:assert/strict";
import test from "node:test";

import { sortBookmarkSearchResults } from "./search.ts";

type TestBookmark = {
  title: string;
  bookmarkFrecency?: { frecency: number };
};

function result(title: string, score: number, frecency = 0) {
  const item: TestBookmark = {
    title,
    ...(frecency > 0 ? { bookmarkFrecency: { frecency } } : {}),
  };

  return { item, score };
}

test("exact custom name beats a frequently used weaker match", () => {
  const sorted = sortBookmarkSearchResults([result("GitHub Dashboard", 0.01, 10_000), result("工作台", 0.2)], "工作台");

  assert.deepEqual(
    sorted.map(({ item }) => item.title),
    ["工作台", "GitHub Dashboard"],
  );
});

test("prefix match beats contains match", () => {
  const sorted = sortBookmarkSearchResults([result("我的项目面板", 0.01), result("项目文档", 0.2)], "项目");

  assert.deepEqual(
    sorted.map(({ item }) => item.title),
    ["项目文档", "我的项目面板"],
  );
});

test("Unicode width and case differences still count as an exact match", () => {
  const sorted = sortBookmarkSearchResults([result("GitHub Work", 0.01, 100), result("ＧＩＴＨＵＢ", 0.2)], "github");

  assert.equal(sorted[0].item.title, "ＧＩＴＨＵＢ");
});

test("fuzzy relevance is considered before frecency within the same title tier", () => {
  const sorted = sortBookmarkSearchResults(
    [result("Documentation", 0.3, 10_000), result("Developer Portal", 0.1)],
    "dev docs",
  );

  assert.equal(sorted[0].item.title, "Developer Portal");
});

test("frecency breaks a true relevance tie", () => {
  const sorted = sortBookmarkSearchResults(
    [result("Alpha Portal", 0.2, 10), result("Beta Portal", 0.2, 20)],
    "portal docs",
  );

  assert.equal(sorted[0].item.title, "Beta Portal");
});
