/**
 * title: 初始化数据与解析返回值对比
 * description: 其中 `''`_(空字符串)_ `null` `undefined` `[]` `['']` `[null]` `[undefined]` 都将被序列化成空字符串 `''` 值，解析也将按照空字符串来处理。如果数组仅有 1 个值时，不以数组形式返回，如果参数 key 以 `[]` 中括号结尾（例如：`userIds[]`）则强制以数组形式返回。
 *
 */

import useUrlState from '@houkunlin/use-url-state';
import React, { useEffect } from 'react';

export default () => {
  const initValues = {
    test1: 0,
    test2: 0,
    u1: null,
    u2: undefined,
    arr0: [],
    arr1: [''],
    arr2: [null],
    arr3: [undefined],
    arr4: [2],
    arr5: [1, 2, 3],
    arr6: [1, 2, 3, null, undefined],
    'arr0[]': [],
    'arr1[]': [''],
    'arr2[]': [null],
    'arr3[]': [undefined],
    'arr4[]': [2],
    'arr5[]': [1, 2, 3],
    'arr6[]': [1, 2, 3, null, undefined],
  };
  const [query] = useUrlState(initValues);

  useEffect(() => {
    // 在地址栏 search/hash 查询参数变化时
    console.log('search/hash query', query);
  }, [query]);

  console.log('any update', new Date());

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'inline-block', width: '49%' }}>
          <h5>初始化的数据</h5>
          <pre>
            <code>{JSON.stringify(initValues, null, 2)}</code>
          </pre>
        </div>
        <div style={{ display: 'inline-block', width: '49%' }}>
          <h5>解析后返回的数据</h5>
          <pre>
            <code>{JSON.stringify(query, null, 2)}</code>
          </pre>
        </div>
      </div>
    </>
  );
};
