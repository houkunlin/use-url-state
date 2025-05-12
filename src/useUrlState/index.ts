import { toURLSearchParams, UrlState, useUrlParamsState, UseUrlParamsStateOptions } from '@houkunlin/use-url-state';
import type * as React from 'react';
import { useMemo } from 'react';
import useMemoizedFn from '../ahooks/useMemoizedFn';
import { toState } from '../utils';

/**
 * 从 <code>window.location.search</code> 和 <code>window.location.hash</code> 中读取查询参数信息。
 * <p>
 *   参数读取顺序：
 *   <ul>
 *     <li><code>searchInitialState</code> 初始参数</li>
 *     <li><code>hashInitialState</code> 初始参数</li>
 *     <li><code>window.location.search</code> 路径参数</li>
 *     <li><code>window.location.hash</code> Hash参数</li>
 *   </ul>
 * </p>
 * <p>
 *   新设置的参数默认会追加到 <code>window.location.hash</code> 上，可通过 <code>options.newParamsLocation</code> 设置。
 * </p>
 *
 * @param searchInitialState search 初始化参数信息
 * @param hashInitialState hash 初始化参数信息
 * @param options 参数设置
 * @return [query, setQuery] query：UrlState，setQuery：设置 UrlState
 */
function useUrlState<S1 extends UrlState = UrlState, S2 extends UrlState = UrlState, S_ALL = S1 & S2>(
  searchInitialState?: S1 | (() => S1),
  hashInitialState?: S2 | (() => S2),
  options?: UseUrlParamsStateOptions,
) {
  type State1 = Partial<{ [key in keyof S1]: string }>;
  type State2 = Partial<{ [key in keyof S2]: string }>;
  type State = Partial<{ [key in keyof S_ALL]: string }>;

  const [query, setQuery, { searchQuery, hashQuery, setSearchQuery, setHashQuery }] = useUrlParamsState(
    searchInitialState,
    hashInitialState,
    options,
  );

  const targetQuery: State = useMemo(() => toState(query), [query]);
  const searchQueryState: State1 = useMemo(() => toState(searchQuery), [searchQuery]);
  const hashQueryState: State2 = useMemo(() => toState(hashQuery), [hashQuery]);

  const setState = (s: React.SetStateAction<State>) => {
    const newQuery = typeof s === 'function' ? s(targetQuery) : s;

    const urlSearchParams = toURLSearchParams(newQuery);

    setQuery(urlSearchParams);
  };
  const setSearchState = (s: React.SetStateAction<State1>) => {
    const newQuery = typeof s === 'function' ? s(searchQueryState) : s;

    const urlSearchParams = toURLSearchParams(newQuery);

    setSearchQuery(urlSearchParams);
  };
  const setHashState = (s: React.SetStateAction<State2>) => {
    const newQuery = typeof s === 'function' ? s(hashQueryState) : s;

    const urlSearchParams = toURLSearchParams(newQuery);

    setHashQuery(urlSearchParams);
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
