# useUrlState

从 <code>window.location.search</code> 和 <code>window.location.hash</code> 中读取查询参数信息，以及设置查询信息，
新设置的参数默认会追加到 <code>window.location.hash</code> 上，可通过 <code>options.newParamsLocation</code> 设置。

```js
const [query, setQuery, { searchQuery, hashQuery, setSearchQuery, setHashQuery }] = useUrlState();

useEffect(() => {
  // 在地址栏 search/hash 查询参数变化时
  console.log('search/hash query', query);
}, [query]);
```

### 基础用法

<code src="./demo/demo1.tsx"></code>

与上面完全相同的示例
<code src="./demo/demo1.tsx"></code>

### API

```js
const [query, setQuery, { searchQuery, hashQuery, setSearchQuery, setHashQuery }] = useUrlState();
useUrlState({ count: 0, page: 1 });
useUrlState({ count: 0, page: 1 }, {}, { newParamsLocation: 'search' });
useUrlState({ count: 0 }, { page: 1 });
useUrlState({ count: 0 }, { page: 1 }, { newParamsLocation: 'search' });
```

### 参数列表

| 参数               | 类型                                  | 说明                  |
| ------------------ | ------------------------------------- | --------------------- |
| searchInitialState | <code>Record<string, any></code>      | search 初始化参数信息 |
| hashInitialState   | <code>Record<string, any></code>      | hash 初始化参数信息   |
| options            | <code>UseUrlParamsStateOptions</code> | 参数设置              |

#### UseUrlParamsStateOptions

| 参数              | 类型                            | 说明                                                               |
| ----------------- | ------------------------------- | ------------------------------------------------------------------ |
| newParamsLocation | <code>'search' \| 'hash'</code> | 新参数追加到路径的位置：`search` \| `hash`，默认追加到 `hash` 位置 |
