import useUrlState from '@houkunlin/use-url-state';
import React, { useEffect } from 'react';

export default () => {
  const [query, setQuery, { searchQuery, hashQuery, setSearchQuery, setHashQuery }] = useUrlState<any, any>({
    count: 0,
  });
  const count = parseInt(query.count || '0');
  const searchSum0 = parseInt(searchQuery.sum0 || '0');
  const hashSum1 = parseInt(hashQuery.sum1 || '0');

  useEffect(() => {
    // 在地址栏 search/hash 查询参数变化时
    console.log('search/hash query', query);
  }, [query]);

  console.log('any update', new Date());

  return (
    <>
      <h5>URL无参数则默认放在 hash 位置</h5>
      <p>count: {count}</p>
      <div>
        <pre>
          <code>ALL: {JSON.stringify(query, null, 2)}</code>
        </pre>
      </div>
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
      <h5>直接设置 search 位置</h5>
      <p>sum0: {searchSum0}</p>
      <div>
        <pre>
          <code>
            Search: {JSON.stringify(searchQuery, null, 2)} <br />
          </code>
        </pre>
      </div>
      <button
        type="button"
        onClick={() => {
          setSearchQuery({ sum0: `${searchSum0 + 1}` });
        }}
      >
        改变 search sum0+1
      </button>
      <button
        type="button"
        onClick={() => {
          setSearchQuery({ sum0: '0' });
        }}
      >
        重置 search sum0=0
      </button>
      <button
        type="button"
        onClick={() => {
          setSearchQuery({});
        }}
      >
        删除 search sum0
      </button>
      <h5>直接设置 hash 位置</h5>
      <p>sum1: {hashSum1}</p>
      <div>
        <pre>
          <code>{JSON.stringify(hashQuery, null, 2)}</code>
        </pre>
      </div>
      <button
        type="button"
        onClick={() => {
          setHashQuery({ sum1: `${hashSum1 + 1}` });
        }}
      >
        改变 hash sum1+1
      </button>
      <button
        type="button"
        onClick={() => {
          setHashQuery({ sum1: '0' });
        }}
      >
        重置 hash sum1=0
      </button>
      <button
        type="button"
        onClick={() => {
          setHashQuery({});
        }}
      >
        删除 hash sum1
      </button>
    </>
  );
};
