import { useUrlParamsState } from '@houkunlin/use-url-state';
import type * as React from 'react';
import { useMemo } from 'react';
import useMemoizedFn from '../ahooks/useMemoizedFn';
import { toObj } from '../utils';

export type UrlState = Record<string, any>;

function stateToURLSearchParams(state: UrlState) {
  return new URLSearchParams(state);
}

/**
 * 从 <code>window.location.search</code> 和 <code>window.location.hash</code> 中读取查询参数信息。
 * <p>
 *   参数读取顺序：
 *   <ul>
 *     <li><code>initialState</code> 初始参数</li>
 *     <li><code>window.location.search</code> 路径参数</li>
 *     <li><code>window.location.hash</code> Hash参数</li>
 *   </ul>
 * </p>
 * <p>
 *   <code>window.location.search</code> 和 <code>window.location.hash</code> 参数会合并，然后覆盖 <code>initialState</code> 参数；
 *   调用 setQuery 设置参数时，如果存在 <code>window.location.hash</code> 参数，则设置到 <code>window.location.hash</code> 参数上，
 *   否则设置到 <code>window.location.search</code> 参数上。
 * </p>
 *
 * @param initialState 初始化参数信息
 * @return [query, setQuery] query：UrlState，setQuery：设置 UrlState
 */
function useUrlState<S extends UrlState = UrlState>(initialState?: S | (() => S)) {
  type State = Partial<{ [key in keyof S]: string }>;

  const [query, setQuery, { searchQuery, hashQuery, setSearchQuery, setHashQuery }] = useUrlParamsState(initialState);

  const targetQuery: State = useMemo(() => toObj(query), [query]);
  const searchQueryState: State = useMemo(() => toObj(searchQuery), [searchQuery]);
  const hashQueryState: State = useMemo(() => toObj(hashQuery), [hashQuery]);

  const setState = (s: React.SetStateAction<State>) => {
    const newQuery = typeof s === 'function' ? s(targetQuery) : s;

    setQuery(stateToURLSearchParams(newQuery));
  };
  const setSearchState = (s: React.SetStateAction<State>) => {
    const newQuery = typeof s === 'function' ? s(searchQueryState) : s;

    setSearchQuery(stateToURLSearchParams(newQuery));
  };
  const setHashState = (s: React.SetStateAction<State>) => {
    const newQuery = typeof s === 'function' ? s(hashQueryState) : s;

    setHashQuery(stateToURLSearchParams(newQuery));
  };

  return [
    targetQuery,
    useMemoizedFn(setState),
    {
      searchQuery: searchQueryState,
      hashQuery: hashQueryState,
      setSearchQuery: useMemoizedFn(setSearchState),
      setHashQuery: useMemoizedFn(setHashState),
    },
  ] as const;
}

export default useUrlState;
