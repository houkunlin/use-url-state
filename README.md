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

## 基本用法

```js
import useUrlState, {
  useUrlParamsState,
  useUrlHashParamsState,
  useUrlHashState,
  useUrlSearchParamsState,
  useUrlSearchState,
} from '@houkunlin/use-url-state';

const [query, setQuery] = useUrlState();
const [query, setQuery] = useUrlState({ count: 0, page: 1 });

const [query, setQuery] = useUrlParamsState();
const [query, setQuery] = useUrlParamsState({ count: 0, page: 1 });
const [query, setQuery] = useUrlParamsState(new URLSearchParams('count=0&page=1'));

const [query, setQuery] = useUrlHashState();
const [query, setQuery] = useUrlHashState({ count: 0, page: 1 });

const [query, setQuery] = useUrlHashParamsState();
const [query, setQuery] = useUrlHashParamsState({ count: 0, page: 1 });
const [query, setQuery] = useUrlHashParamsState(new URLSearchParams('count=0&page=1'));

const [query, setQuery] = useUrlSearchState();
const [query, setQuery] = useUrlSearchState({ count: 0, page: 1 });

const [query, setQuery] = useUrlSearchParamsState();
const [query, setQuery] = useUrlSearchParamsState({ count: 0, page: 1 });
const [query, setQuery] = useUrlSearchParamsState(new URLSearchParams('count=0&page=1'));
```

## 文档

- [useUrlParamsState 文档](./src/useUrlParamsState)
- [useUrlState 文档](./src/useUrlState)
- [useUrlHashParamsState 文档](./src/useUrlHashParamsState)
- [useUrlHashState 文档](./src/useUrlHashState)
- [useUrlSearchParamsState 文档](./src/useUrlSearchParamsState)
- [useUrlSearchState 文档](./src/useUrlSearchState)
