import { useUrlSearchParamsState } from '@houkunlin/use-url-state';
import React, { useEffect } from 'react';

export default () => {
  const [query, setQuery] = useUrlSearchParamsState({ count: 0 });
  const count = query.has('count') ? parseInt(query.get('count') || '0') : 0;

  useEffect(() => {
    // 在地址栏 search 查询参数变化时
    console.log('search query', query.toString());
  }, [query]);

  console.log('any update', new Date());

  return (
    <>
      <p>count: {count}</p>
      <button
        type="button"
        onClick={() => {
          setQuery((c) => {
            c.set('count', `${count + 1}`);
            return c;
          });
        }}
      >
        改变
      </button>
      <button
        type="button"
        onClick={() => {
          setQuery((c) => {
            c.set('count', `0`);
            return c;
          });
        }}
      >
        重置
      </button>
      <button
        type="button"
        onClick={() => {
          setQuery((c) => {
            c.delete('count');
            return c;
          });
        }}
      >
        删除
      </button>
    </>
  );
};
