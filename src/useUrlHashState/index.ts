import {
  getUrlHashParamsState,
  toURLSearchParams,
  UrlState,
  useUrlHashParamsState,
  UseUrlHashParamsStateOptions,
} from '@houkunlin/use-url-state';
import type * as React from 'react';
import { useMemo } from 'react';
import useMemoizedFn from '../ahooks/useMemoizedFn';
import { toState } from '../utils';

/**
 * 直接从 <code>window.location.hash</code> 中读取查询参数信息
 * <p>
 *   参数读取顺序：
 *   <ul>
 *     <li><code>initialState</code> 初始参数</li>
 *     <li><code>window.location.hash</code> Hash参数</li>
 *   </ul>
 * </p>
 * @param initialState 初始化参数信息
 */
export function getUrlHashState<S extends UrlState = UrlState>(initialState?: S | (() => S)) {
  type State = Partial<{ [key in keyof S]: string }>;

  const query = getUrlHashParamsState(initialState);

  return toState(query) as State;
}

/**
 * 从 <code>window.location.hash</code> 中读取查询参数信息。
 * <p>
 *   参数读取顺序：
 *   <ul>
 *     <li><code>initialState</code> 初始参数</li>
 *     <li><code>window.location.hash</code> Hash参数</li>
 *   </ul>
 * </p>
 *
 * @param initialState 初始化参数信息
 * @param options 参数设置
 * @return [query, setQuery] query：参数对象，setQuery：设置方法
 */
function useUrlHashState<S extends UrlState = UrlState>(
  initialState?: S | (() => S),
  options?: UseUrlHashParamsStateOptions,
) {
  type State = Partial<{ [key in keyof S]: string }>;

  const [query, setQuery] = useUrlHashParamsState(initialState, options);

  const targetQuery: State = useMemo(() => toState(query), [query]);

  const setState = (s: React.SetStateAction<State>) => {
    const newQuery = typeof s === 'function' ? s(targetQuery) : s;

    const urlSearchParams = toURLSearchParams(newQuery);

    setQuery(urlSearchParams);
  };

  return [targetQuery, useMemoizedFn(setState)] as const;
}

export default useUrlHashState;
