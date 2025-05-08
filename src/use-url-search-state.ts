import type * as React from 'react';
import { useMemo, useRef } from 'react';
import { toObj } from './utils/index';
import useMemoizedFn from './ahooks/useMemoizedFn/index';
import useUpdate from './ahooks/useUpdate/index';
import { UrlState } from './use-url-state';

function useUrlSearchState<S extends UrlState = UrlState>(initialState?: S | (() => S)) {
  type State = Partial<{ [key in keyof S]: string }>;
  const update = useUpdate();

  const initialStateRef = useRef(typeof initialState === 'function' ? (initialState as () => S)() : initialState || {});
  const targetInitialStateStr = JSON.stringify(initialStateRef.current);

  const [hashPath, hashQuery, searchQuery] = useMemo(() => {
    return ['', '', window.location.search];
  }, [window.location.search]);

  const targetQueryURLSearchParams = useMemo(() => {
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
  }, [hashPath, hashQuery, searchQuery, targetInitialStateStr]);

  const targetQuery: State = useMemo(() => toObj(targetQueryURLSearchParams), [targetQueryURLSearchParams]);

  const setState = (s: React.SetStateAction<State>) => {
    const newQuery = typeof s === 'function' ? s(targetQuery) : s;

    // 1. 如果 setState 后，search 没变化，就需要 update 来触发一次更新。比如 demo1 直接点击 clear，就需要 update 来触发更新。
    // 2. update 和 history 的更新会合并，不会造成多次更新
    update();
    window.location.search = new URLSearchParams((newQuery as any) ?? {}).toString();
  };

  return [targetQuery, useMemoizedFn(setState)] as const;
}

export default useUrlSearchState;
