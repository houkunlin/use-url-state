---
nav:
  title: 指南
  order: 0
---

# 指南

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
