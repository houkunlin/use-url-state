import { setWindowLocationHash, setWindowLocationSearch } from '@houkunlin/use-url-state';
import type * as React from 'react';
import { useMemo, useRef } from 'react';
import useMemoizedFn from '../ahooks/useMemoizedFn';
import useUpdate from '../ahooks/useUpdate';

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
 *   <code>window.location.search</code> 和 <code>window.location.hash</code> 参数会合并，然后覆盖 <code>initialState</code> 参数；
 *   调用 setQuery 设置参数时，如果存在 <code>window.location.hash</code> 参数，则设置到 <code>window.location.hash</code> 参数上，
 *   否则设置到 <code>window.location.search</code> 参数上。
 * </p>
 *
 * @param initialState 初始化参数信息
 * @return [query, setQuery] query：URLSearchParams，setQuery：设置 URLSearchParams
 */
function useUrlParamsState(initialState?: UrlParamsState | (() => UrlParamsState)) {
  const update = useUpdate();

  const initialStateRef = useRef(
    typeof initialState === 'function' ? (initialState as () => UrlParamsState)() : initialState || {},
  );
  // const targetInitialStateStr = JSON.stringify(initialStateRef.current);

  const [hashPath, hashQuery, searchQuery, useHash] = useMemo(() => {
    const hash = window.location.hash;
    const index = hash.indexOf('?');
    const hashQuery = hash.substring(index + 1);
    return [hash.substring(0, index), hashQuery, window.location.search, hashQuery.length > 0];
  }, [window.location.hash, window.location.search]);

  const targetQuery = useMemo(() => {
    const urlSearchParams = new URLSearchParams(initialStateRef.current ?? {});

    const searchQueryParams = new URLSearchParams(searchQuery);
    for (const key of searchQueryParams.keys()) {
      if (urlSearchParams.has(key)) {
        urlSearchParams.delete(key);
      }
    }
    const hashQueryParams = new URLSearchParams(hashQuery);
    for (const key of hashQueryParams.keys()) {
      if (urlSearchParams.has(key)) {
        urlSearchParams.delete(key);
      }
    }

    for (const [key, value] of searchQueryParams) {
      urlSearchParams.append(key, value);
    }
    for (const [key, value] of hashQueryParams) {
      urlSearchParams.append(key, value);
    }

    return urlSearchParams;
  }, [hashPath, hashQuery, searchQuery /*, targetInitialStateStr*/]);

  const setState = (s: React.SetStateAction<URLSearchParams>) => {
    const newQuery = typeof s === 'function' ? s(targetQuery) : s;

    // 1. 如果 setState 后，search 没变化，就需要 update 来触发一次更新。比如 demo1 直接点击 clear，就需要 update 来触发更新。
    // 2. update 和 history 的更新会合并，不会造成多次更新
    update();
    if (useHash) {
      setWindowLocationHash(hashPath, newQuery);
    } else {
      setWindowLocationSearch(newQuery);
    }
  };

  return [targetQuery, useMemoizedFn(setState)] as const;
}

export default useUrlParamsState;
