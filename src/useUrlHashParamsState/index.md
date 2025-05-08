# useUrlHashParamsState

从 <code>window.location.hash</code> 中读取查询参数信息，以及设置 <code>window.location.hash</code> 查询信息。

```js
const [query, setQuery] = useUrlHashParamsState();

useEffect(() => {
  // 在地址栏 hash 查询参数变化时
  console.log('hash query', query.toString());
}, [query]);
```

### 基础用法

<code src="./demo/demo1.tsx"></code>

### API

```js
const [query, setQuery] = useUrlHashParamsState();
const [query, setQuery] = useUrlHashParamsState({ count: 0, page: 1 });
const [query, setQuery] = useUrlHashParamsState(new URLSearchParams('count=0&page=1'));
```

### 参数列表

| 参数           | 类型                                                  | 说明    |
|--------------|-----------------------------------------------------|-------|
| initialState | <code>Record<string, any> \| URLSearchParams</code> | 初始化参数 |
