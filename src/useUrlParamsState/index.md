# useUrlParamsState

从 <code>window.location.search</code> 和 <code>window.location.hash</code> 中读取查询参数信息，以及设置查询信息，
新设置的参数会追加到 <code>window.location.hash</code> 上。

```js
const [query, setQuery] = useUrlParamsState();

useEffect(() => {
  // 在地址栏 search/hash 查询参数变化时
  console.log('search/hash query', query.toString());
}, [query]);
```

### 基础用法

<code src="./demo/demo1.tsx"></code>

与上面完全相同的示例
<code src="./demo/demo1.tsx"></code>

### API

```js
const [query, setQuery] = useUrlParamsState();
const [query, setQuery] = useUrlParamsState({ count: 0, page: 1 });
const [query, setQuery] = useUrlParamsState(new URLSearchParams('count=0&page=1'));
```

### 参数列表

| 参数         | 类型                                                | 说明       |
| ------------ | --------------------------------------------------- | ---------- |
| initialState | <code>Record<string, any> \| URLSearchParams</code> | 初始化参数 |
