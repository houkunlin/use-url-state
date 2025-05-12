# useUrlSearchState

从 <code>window.location.search</code> 中读取查询参数信息，以及设置 <code>window.location.search</code> 查询信息。

```js
const [query, setQuery] = useUrlSearchState();

useEffect(() => {
  // 在地址栏 search 查询参数变化时
  console.log('search query', query);
}, [query]);
```

### 基础用法

<code src="./demo/demo1.tsx"></code>

与上面完全相同的示例
<code src="./demo/demo1.tsx"></code>

### API

```js
const [query, setQuery] = useUrlSearchState();
const [query, setQuery] = useUrlSearchState({ count: 0, page: 1 });
const [query, setQuery] = useUrlSearchState({ count: 0, page: 1 }, { initParamsToSearch: true });
```

### 参数列表

| 参数         | 类型                                        | 说明       |
| ------------ | ------------------------------------------- | ---------- |
| initialState | <code>Record<string, any></code>            | 初始化参数 |
| options      | <code>UseUrlSearchParamsStateOptions</code> | 参数设置   |

#### UseUrlSearchParamsStateOptions

| 参数               | 类型                 | 说明                      |
| ------------------ | -------------------- | ------------------------- |
| initParamsToSearch | <code>boolean</code> | 初始参数是否设置到 search |
