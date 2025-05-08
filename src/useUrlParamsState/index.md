# useUrlParamsState

从 <code>window.location.search</code> 和 <code>window.location.hash</code> 中读取查询参数信息，以及设置查询信息，
设置参数时，如果存在 <code>window.location.hash</code> 参数，则设置到 <code>window.location.hash</code> 参数上，
否则设置到 <code>window.location.search</code> 参数上。

<code>window.location.search</code> 和 <code>window.location.hash</code> 参数会合并。

```js
const [query, setQuery] = useUrlParamsState();

useEffect(() => {
  // 在地址栏 search/hash 查询参数变化时
  console.log('search/hash query', query.toString());
}, [query]);
```

### 基础用法

<code src="./demo/demo1.tsx"></code>

### API

```js
const [query, setQuery] = useUrlParamsState();
const [query, setQuery] = useUrlParamsState({ count: 0, page: 1 });
const [query, setQuery] = useUrlParamsState(new URLSearchParams('count=0&page=1'));
```

### 参数列表

| 参数           | 类型                                                  | 说明    |
|--------------|-----------------------------------------------------|-------|
| initialState | <code>Record<string, any> \| URLSearchParams</code> | 初始化参数 |
