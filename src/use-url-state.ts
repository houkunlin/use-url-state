import type * as React from 'react';
import { useMemo, useRef } from 'react';
import useMemoizedFn from './ahooks/useMemoizedFn/index';
import useUpdate from './ahooks/useUpdate/index';
import { toObj } from './utils/index';

export type UrlState = Record<string, any>;

function useUrlState<S extends UrlState = UrlState>(initialState?: S | (() => S)) {
  type State = Partial<{ [key in keyof S]: string }>;
  const update = useUpdate();

  const initialStateRef = useRef(typeof initialState === 'function' ? (initialState as () => S)() : initialState || {});
  const targetInitialStateStr = JSON.stringify(initialStateRef.current);

  const [hashPath, hashQuery, searchQuery, useHash] = useMemo(() => {
    const hash = window.location.hash;
    const index = hash.indexOf('?');
    const hashQuery = hash.substring(index);
    return [hash.substring(0, index), hashQuery, window.location.search, hashQuery.length > 0];
  }, [window.location.hash, window.location.search]);

  const targetQueryURLSearchParams = useMemo(() => {
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
  }, [hashPath, hashQuery, searchQuery, targetInitialStateStr]);

  const targetQuery: State = useMemo(() => toObj(targetQueryURLSearchParams), [targetQueryURLSearchParams]);

  const setState = (s: React.SetStateAction<State>) => {
    const newQuery = typeof s === 'function' ? s(targetQuery) : s;

    // 1. 如果 setState 后，search 没变化，就需要 update 来触发一次更新。比如 demo1 直接点击 clear，就需要 update 来触发更新。
    // 2. update 和 history 的更新会合并，不会造成多次更新
    update();
    const query = new URLSearchParams((newQuery as any) ?? {}).toString();
    if (useHash) {
      if (query.length !== 0) {
        window.location.hash = hashPath + '?' + query;
      } else {
        window.location.hash = hashPath;
      }
    } else {
      window.location.search = query;
    }
  };

  return [targetQuery, useMemoizedFn(setState)] as const;
}

export default useUrlState;
