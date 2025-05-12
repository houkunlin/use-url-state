import { useUrlHashParamsState, useUrlSearchParamsState } from '@houkunlin/use-url-state';
import type * as React from 'react';
import { useMemo } from 'react';
import useMemoizedFn from '../ahooks/useMemoizedFn';

export type UrlParamsState = Record<string, any> | URLSearchParams;

export type UseUrlParamsStateOptions = {
  /**
   * 新参数追加到路径的位置：search | hash，默认追加到 hash 位置
   */
  newParamsLocation?: 'search' | 'hash';
};

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
 * @return [query, setQuery] query：URLSearchParams，setQuery：设置 URLSearchParams
 */
function useUrlParamsState(
  searchInitialState?: UrlParamsState | (() => UrlParamsState),
  hashInitialState?: UrlParamsState | (() => UrlParamsState),
  options?: UseUrlParamsStateOptions,
) {
  const [searchQueryParams, setSearchQueryParams] = useUrlSearchParamsState(searchInitialState);
  const [hashQueryParams, setHashQueryParams] = useUrlHashParamsState(hashInitialState);

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
          if (
            options === null ||
            options === undefined ||
            options?.newParamsLocation === null ||
            options?.newParamsLocation === undefined ||
            options?.newParamsLocation === 'hash'
          ) {
            hashParams.append(key, value);
          } else {
            searchParams.append(key, value);
          }
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
