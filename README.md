# `@houkunlin/use-url-state`

[![NPM version](https://img.shields.io/npm/v/@houkunlin/use-url-state.svg?style=flat)](https://www.npmjs.com/package/@houkunlin/use-url-state)
[![NPM downloads](http://img.shields.io/npm/dm/@houkunlin/use-url-state.svg?style=flat)](https://www.npmjs.com/package/@houkunlin/use-url-state)

一个用于读取、设置 `window.location.search` 和 `window.location.hash` 查询参数信息的 hooks 工具。

- `useUrlParamsState` - 从 `window.location.search` 和 `window.location.hash` 中读取参数，返回 `URLSearchParams` 类型参数对象
- `useUrlState` - 从 `window.location.search` 和 `window.location.hash` 中读取参数，返回普通参数对象
- `useUrlHashParamsState` - 从 `window.location.hash` 中读取参数，返回 `URLSearchParams` 类型参数对象
- `useUrlHashState` - 从 `window.location.hash` 中读取参数，返回普通参数对象
- `useUrlSearchParamsState` - 从 `window.location.search` 中读取参数，返回 `URLSearchParams` 类型参数对象
- `useUrlSearchState` - 从 `window.location.search` 中读取参数，返回普通参数对象

## 安装

```npm
npm install @houkunlin/use-url-state
```

## 基本关系说明

`useUrlSearchParamsState` 和 `useUrlHashParamsState` 是原始用法支撑。

`useUrlParamsState` 是合并 `useUrlSearchParamsState` 和 `useUrlHashParamsState` 的用法到一个 hooks 里面。

`useUrlSearchParamsState` 返回的是 `URLSearchParams` 对象，`useUrlSearchState` 对其做了一次封装转换，使返回值为普通对象。

`useUrlHashParamsState` 返回的是 `URLSearchParams` 对象，`useUrlHashState` 对其做了一次封装转换，使返回值为普通对象。

`useUrlParamsState` 返回的是 `URLSearchParams` 对象，`useUrlState` 对其做了一次封装转换，使返回值为普通对象。

## 基本用法

```js
import useUrlState, {
  useUrlParamsState,
  useUrlHashParamsState,
  useUrlHashState,
  useUrlSearchParamsState,
  useUrlSearchState,
} from '@houkunlin/use-url-state';

const [query, setQuery, { searchQuery, hashQuery, setSearchQuery, setHashQuery }] = useUrlState();
useUrlState({ count: 0, page: 1, ids: [1, 2], 'pids[]': [1, 2] });
useUrlState({ count: 0 }, { page: 1 });
useUrlState({ count: 0 }, { page: 1 }, { newParamsLocation: 'hash', initParamsToSearch: true, initParamsToHash: true });

const [query, setQuery, { searchQuery, hashQuery, setSearchQuery, setHashQuery }] = useUrlParamsState();
useUrlParamsState({ count: 0, page: 1 });
useUrlParamsState({ count: 0 }, { page: 1 });
useUrlParamsState(
  { count: 0 },
  { page: 1 },
  {
    newParamsLocation: 'search',
    initParamsToSearch: true,
    initParamsToHash: true,
  },
);
useUrlParamsState(new URLSearchParams('count=0&page=1'));
useUrlParamsState(new URLSearchParams('count=0'), new URLSearchParams('page=1'));
useUrlParamsState(new URLSearchParams('count=0'), new URLSearchParams('page=1'), {
  newParamsLocation: 'search',
  initParamsToSearch: true,
  initParamsToHash: true,
});

const [query, setQuery] = useUrlHashState();
const [query, setQuery] = useUrlHashState({ count: 0, page: 1, ids: [1, 2], 'pids[]': [1, 2] });
const [query, setQuery] = useUrlHashState({ count: 0, page: 1 }, { initParamsToHash: true });

const [query, setQuery] = useUrlHashParamsState();
const [query, setQuery] = useUrlHashParamsState({ count: 0, page: 1 });
const [query, setQuery] = useUrlHashParamsState({ count: 0, page: 1 }, { initParamsToHash: true });
const [query, setQuery] = useUrlHashParamsState(new URLSearchParams('count=0&page=1'));
const [query, setQuery] = useUrlHashParamsState(new URLSearchParams('count=0&page=1'), { initParamsToHash: true });

const [query, setQuery] = useUrlSearchState();
const [query, setQuery] = useUrlSearchState({ count: 0, page: 1, ids: [1, 2], 'pids[]': [1, 2] });
const [query, setQuery] = useUrlSearchState({ count: 0, page: 1 }, { initParamsToSearch: true });

const [query, setQuery] = useUrlSearchParamsState();
const [query, setQuery] = useUrlSearchParamsState({ count: 0, page: 1 });
const [query, setQuery] = useUrlSearchParamsState({ count: 0, page: 1 }, { initParamsToSearch: true });
const [query, setQuery] = useUrlSearchParamsState(new URLSearchParams('count=0&page=1'));
const [query, setQuery] = useUrlSearchParamsState(new URLSearchParams('count=0&page=1'), { initParamsToSearch: true });
```

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

## 普通对象返回值的说明

所有 hooks 的入参 `UrlState` 初始化参数支持一级数组参数，但 `useUrlSearchState` `useUrlHashState` `useUrlState`
返回的普通对象会经过特殊处理。

其中 `''`_(空字符串)_ `null` `undefined` `[]` `['']` `[null]` `[undefined]` 都将被序列化成空字符串 `''` 值，解析也将按照空字符串来处理。

如果数组仅有 1 个值时，不以数组形式返回，如果参数 key 以 `[]` 中括号结尾（例如：`userIds[]`）则强制以数组形式返回。

## 文档

- [useUrlParamsState 文档](./src/useUrlParamsState)
- [useUrlState 文档](./src/useUrlState)
- [useUrlHashParamsState 文档](./src/useUrlHashParamsState)
- [useUrlHashState 文档](./src/useUrlHashState)
- [useUrlSearchParamsState 文档](./src/useUrlSearchParamsState)
- [useUrlSearchState 文档](./src/useUrlSearchState)
