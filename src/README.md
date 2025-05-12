---
nav:
  title: Hooks
  order: 2
---

# Hooks

- [x] [useUrlParamsState](/components/use-url-params-state) 从 `window.location.search` 和 `window.location.hash`
      中读取参数，返回 `URLSearchParams` 类型参数对象
- [x] [useUrlState](/components/use-url-state) 从 `window.location.search` 和 `window.location.hash` 中读取参数，返回普通参数对象
- [x] [useUrlHashParamsState](/components/use-url-hash-params-state) 从 `window.location.hash` 中读取参数，返回
      `URLSearchParams` 类型参数对象
- [x] [useUrlHashState](/components/use-url-hash-state) 从 `window.location.hash` 中读取参数，返回普通参数对象
- [x] [useUrlSearchParamsState](/components/use-url-search-params-state) 从 `window.location.search` 中读取参数，返回
      `URLSearchParams` 类型参数对象
- [x] [useUrlSearchState](/components/use-url-search-state) 从 `window.location.search` 中读取参数，返回普通参数对象

## 基本关系说明

`useUrlSearchParamsState` 和 `useUrlHashParamsState` 是原始用法支撑。

`useUrlParamsState` 是合并 `useUrlSearchParamsState` 和 `useUrlHashParamsState` 的用法到一个 hooks 里面。

`useUrlSearchParamsState` 返回的是 `URLSearchParams` 对象，`useUrlSearchState` 对其做了一次封装转换，使返回值为普通对象。

`useUrlHashParamsState` 返回的是 `URLSearchParams` 对象，`useUrlHashState` 对其做了一次封装转换，使返回值为普通对象。

`useUrlParamsState` 返回的是 `URLSearchParams` 对象，`useUrlState` 对其做了一次封装转换，使返回值为普通对象。

## 基本类型

```ts
export type UrlState = Record<string, string | number | null | undefined | (string | number | null | undefined)[]>;
export type UrlParamsState = UrlState | URLSearchParams;
export type UseUrlHashParamsStateOptions = {
  /**
   * 初始参数是否设置到 hash
   */
  initParamsToHash?: boolean;
};
export type UseUrlSearchParamsStateOptions = {
  /**
   * 初始参数是否设置到 search
   */
  initParamsToSearch?: boolean;
};
export type UseUrlParamsStateOptions = {
  /**
   * 新参数追加到路径的位置：search | hash，默认追加到 hash 位置
   */
  newParamsLocation?: 'search' | 'hash';
} & UseUrlSearchParamsStateOptions &
  UseUrlHashParamsStateOptions;
```

## 普通对象返回值的示例对比

所有 hooks 的入参 `UrlState` 初始化参数支持一级数组参数，但 `useUrlSearchState` `useUrlHashState` `useUrlState`
返回的普通对象会经过特殊处理。

其中 `''`_(空字符串)_ `null` `undefined` `[]` `['']` `[null]` `[undefined]` 都将被序列化成空字符串 `''` 值，解析也将按照空字符串来处理。

如果数组仅有 1 个值时，不以数组形式返回，如果参数 key 以 `[]` 中括号结尾（例如：`userIds[]`）则强制以数组形式返回。

<code src="./useUrlState/demo/demo2.tsx"></code>
