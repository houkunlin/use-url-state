import {
  toURLSearchParams,
  UrlState,
  useUrlSearchParamsState,
  UseUrlSearchParamsStateOptions,
} from '@houkunlin/use-url-state';
import type * as React from 'react';
import { useMemo } from 'react';
import useMemoizedFn from '../ahooks/useMemoizedFn';
import { toState } from '../utils';

/**
 * 从 <code>window.location.search</code>中读取查询参数信息。
 * <p>
 *   参数读取顺序：
 *   <ul>
 *     <li><code>initialState</code> 初始参数</li>
 *     <li><code>window.location.search</code> 路径参数</li>
 *   </ul>
 * </p>
 *
 * @param initialState 初始化参数信息
 * @param options 参数设置
 * @return [query, setQuery] query：UrlState，setQuery：设置 UrlState
 */
function useUrlSearchState<S extends UrlState = UrlState>(
  initialState?: S | (() => S),
  options?: UseUrlSearchParamsStateOptions,
) {
  type State = Partial<{ [key in keyof S]: string }>;

  const [query, setQuery] = useUrlSearchParamsState(initialState, options);

  const targetQuery: State = useMemo(() => toState(query), [query]);

  const setState = (s: React.SetStateAction<State>) => {
    const newQuery = typeof s === 'function' ? s(targetQuery) : s;

    const urlSearchParams = toURLSearchParams(newQuery);

    setQuery(urlSearchParams);
  };

  return [targetQuery, useMemoizedFn(setState)] as const;
}

export default useUrlSearchState;
