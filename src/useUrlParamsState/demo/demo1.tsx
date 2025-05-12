import { useUrlParamsState } from '@houkunlin/use-url-state';
import React, { useEffect } from 'react';

export default () => {
  const [query, setQuery, { searchQuery, hashQuery, setSearchQuery, setHashQuery }] = useUrlParamsState(
    {
      count: 0,
      sum0: 0,
    },
    {
      sum1: 0,
    },
    {
      initParamsToSearch: false,
      initParamsToHash: false,
    },
  );
  const count = query.has('count') ? parseInt(query.get('count') || '0') : 0;
  const searchSum0 = searchQuery.has('sum0') ? parseInt(searchQuery.get('sum0') || '0') : 0;
  const hashSum1 = hashQuery.has('sum1') ? parseInt(hashQuery.get('sum1') || '0') : 0;

  useEffect(() => {
    // 在地址栏 search/hash 查询参数变化时
    console.log('search/hash query', query.toString());
  }, [query]);

  console.log('any update', new Date());

  return (
    <>
      <h5>URL无参数则默认放在 hash 位置</h5>
      <p>count: {count}</p>
      <div>
        <pre>
          <code>ALL: {query.toString()}</code>
        </pre>
      </div>
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
      <h5>直接设置 search 位置</h5>
      <p>sum0: {searchSum0}</p>
      <div>
        <pre>
          <code>
            Search: {searchQuery.toString()} <br />
          </code>
        </pre>
      </div>
      <button
        type="button"
        onClick={() => {
          setSearchQuery((c) => {
            c.set('sum0', `${searchSum0 + 1}`);
            return c;
          });
        }}
      >
        改变 search sum0+1
      </button>
      <button
        type="button"
        onClick={() => {
          setSearchQuery((c) => {
            c.set('sum0', `0`);
            return c;
          });
        }}
      >
        重置 search sum0=0
      </button>
      <button
        type="button"
        onClick={() => {
          setSearchQuery((c) => {
            c.delete('sum0');
            return c;
          });
        }}
      >
        删除 search sum0
      </button>
      <h5>直接设置 hash 位置</h5>
      <p>sum1: {hashSum1}</p>
      <div>
        <pre>
          <code>Hash: {hashQuery.toString()}</code>
        </pre>
      </div>
      <button
        type="button"
        onClick={() => {
          setHashQuery((c) => {
            c.set('sum1', `${hashSum1 + 1}`);
            return c;
          });
        }}
      >
        改变 hash sum1+1
      </button>
      <button
        type="button"
        onClick={() => {
          setHashQuery((c) => {
            c.set('sum1', `0`);
            return c;
          });
        }}
      >
        重置 hash sum1=0
      </button>
      <button
        type="button"
        onClick={() => {
          setHashQuery((c) => {
            c.delete('sum1');
            return c;
          });
        }}
      >
        删除 hash sum1
      </button>
    </>
  );
};
