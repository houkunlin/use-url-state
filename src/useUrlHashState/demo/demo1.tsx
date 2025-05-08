import { useUrlHashState } from '@houkunlin/use-url-state';
import React, { useEffect } from 'react';

export default () => {
  const [query, setQuery] = useUrlHashState({ count: 0 });
  const count = parseInt(query.count || '0');

  useEffect(() => {
    // 在地址栏 hash 查询参数变化时
    console.log('hash query', query);
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
    </>
  );
};
