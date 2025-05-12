import useUrlState from '@houkunlin/use-url-state';
import React, { useEffect } from 'react';

export default () => {
  const [query, setQuery] = useUrlState({ count: 0 });
  const count = parseInt(query.count || '0');

  useEffect(() => {
    // 在地址栏 search/hash 查询参数变化时
    console.log('search/hash query', query);
  }, [query]);

  console.log('any update', new Date());

  return (
    <>
      <p>count: {count}</p>
      <button
        type="button"
        onClick={() => {
          setQuery({ count: `${count + 1}` });
        }}
      >
        改变
      </button>
      <button
        type="button"
        onClick={() => {
          setQuery({ count: `0` });
        }}
      >
        重置
      </button>
      <button
        type="button"
        onClick={() => {
          setQuery({});
        }}
      >
        删除
      </button>
      <div>
        <pre><code>{JSON.stringify(query, null, 2)}</code></pre>
      </div>
    </>
  );
};
