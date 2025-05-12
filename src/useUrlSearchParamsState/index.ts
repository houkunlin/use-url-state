import { setWindowLocationSearch, UrlParamsState } from '@houkunlin/use-url-state';
import type * as React from 'react';
import { useEffect, useMemo, useRef } from 'react';
import useMemoizedFn from '../ahooks/useMemoizedFn';
import useUpdate from '../ahooks/useUpdate';

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
 * @return [query, setQuery] query：URLSearchParams，setQuery：设置 URLSearchParams
 */
function useUrlSearchParamsState(initialState?: UrlParamsState | (() => UrlParamsState)) {
  const update = useUpdate();
  const searchQuery = window.location.search;

  const initialStateRef = useRef(
    typeof initialState === 'function' ? (initialState as () => UrlParamsState)() : initialState || {},
  );
  // const targetInitialStateStr = JSON.stringify(initialStateRef.current);

  const targetQuery = useMemo(() => {
    const urlSearchParams = new URLSearchParams(initialStateRef.current ?? {});

    const searchQueryParams = new URLSearchParams(searchQuery);
    for (const key of searchQueryParams.keys()) {
      if (urlSearchParams.has(key)) {
        urlSearchParams.delete(key);
      }
    }

    for (const [key, value] of searchQueryParams) {
      urlSearchParams.append(key, value);
    }

    return urlSearchParams;
  }, [searchQuery /*, targetInitialStateStr*/]);

  const setState = (s: React.SetStateAction<URLSearchParams>) => {
    const newQuery = typeof s === 'function' ? s(new URLSearchParams(targetQuery)) : s;

    // 1. 如果 setState 后，search 没变化，就需要 update 来触发一次更新。比如 demo1 直接点击 clear，就需要 update 来触发更新。
    // 2. update 和 history 的更新会合并，不会造成多次更新
    update();
    setWindowLocationSearch(newQuery);
  };

  useEffect(() => {
    setWindowLocationSearch(targetQuery);
  }, []);

  return [targetQuery, useMemoizedFn(setState)] as const;
}

export default useUrlSearchParamsState;
