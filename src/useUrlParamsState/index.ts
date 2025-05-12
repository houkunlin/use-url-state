import { useUrlHashParamsState, useUrlSearchParamsState } from '@houkunlin/use-url-state';
import type * as React from 'react';
import { useMemo } from 'react';
import useMemoizedFn from '../ahooks/useMemoizedFn';

export type UrlParamsState = Record<string, any> | URLSearchParams;

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
 *   新设置的参数会追加到 <code>window.location.hash</code> 上
 * </p>
 *
 * @param initialState 初始化参数信息
 * @return [query, setQuery] query：URLSearchParams，setQuery：设置 URLSearchParams
 */
function useUrlParamsState(initialState?: UrlParamsState | (() => UrlParamsState)) {
  const [searchQueryParams, setSearchQueryParams] = useUrlSearchParamsState(initialState);
  const [hashQueryParams, setHashQueryParams] = useUrlHashParamsState();

  const targetQuery = useMemo(() => {
    const urlSearchParams = new URLSearchParams();

    for (const [key, value] of searchQueryParams) {
      urlSearchParams.append(key, value);
    }
    for (const [key, value] of hashQueryParams) {
      urlSearchParams.append(key, value);
    }

    return urlSearchParams;
  }, [searchQueryParams, hashQueryParams /*, targetInitialStateStr*/]);

  const setState = (s: React.SetStateAction<URLSearchParams>) => {
    const newQuery = typeof s === 'function' ? s(new URLSearchParams(targetQuery)) : s;

    const searchParams = new URLSearchParams(searchQueryParams);
    const hashParams = new URLSearchParams(hashQueryParams);

    const firstKeys = new Set<string>();
    for (const key of newQuery.keys()) {
      // 变更 key 值
      const value = newQuery.get(key);
      if (value !== null) {
        if (!firstKeys.has(key)) {
          firstKeys.add(key);
          if (searchParams.has(key)) {
            searchParams.set(key, value);
          }
          if (hashParams.has(key)) {
            hashParams.set(key, value);
          }
        } else {
          if (searchParams.has(key)) {
            searchParams.append(key, value);
          }
          if (hashParams.has(key)) {
            hashParams.append(key, value);
          }
        }
      }
    }

    for (const key of searchParams.keys()) {
      if (!newQuery.has(key)) {
        // 删除不存在的 key
        searchParams.delete(key);
      }
    }
    for (const key of hashParams.keys()) {
      if (!newQuery.has(key)) {
        // 删除不存在的 key
        hashParams.delete(key);
      }
    }

    for (const key of newQuery.keys()) {
      // 删除以前处理过的 KEY
      if (searchParams.has(key) || hashParams.has(key)) {
        newQuery.delete(key);
      } else {
        // 追加新的 key
        const value = newQuery.get(key);
        if (value !== null) {
          // 新设置的参数会追加到 <code>window.location.hash</code> 上
          hashParams.append(key, value);
        }
      }
    }

    setHashQueryParams(hashParams);
    setSearchQueryParams(searchParams);
  };

  return [
    targetQuery,
    useMemoizedFn(setState),
    {
      searchQuery: searchQueryParams,
      hashQuery: hashQueryParams,
      setSearchQuery: setSearchQueryParams,
      setHashQuery: setHashQueryParams,
    },
  ] as const;
}

export default useUrlParamsState;
