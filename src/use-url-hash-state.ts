import type * as React from 'react';
import { useMemo, useRef } from 'react';
import useMemoizedFn from './ahooks/useMemoizedFn/index';
import useUpdate from './ahooks/useUpdate/index';
import { UrlState } from './use-url-state';
import { toObj } from './utils/index';

function useUrlHashState<S extends UrlState = UrlState>(initialState?: S | (() => S)) {
  type State = Partial<{ [key in keyof S]: string }>;
  const update = useUpdate();

  const initialStateRef = useRef(typeof initialState === 'function' ? (initialState as () => S)() : initialState || {});
  const targetInitialStateStr = JSON.stringify(initialStateRef.current);

  const [hashPath, hashQuery] = useMemo(() => {
    const hash = window.location.hash;
    const index = hash.indexOf('?');
    return [hash.substring(0, index), hash.substring(index)];
  }, [window.location.hash]);

  const targetQueryURLSearchParams = useMemo(() => {
    const urlSearchParams = new URLSearchParams(initialStateRef.current ?? {});

    const hashQueryParams = new URLSearchParams(hashQuery);
    for (const key of hashQueryParams.keys()) {
      if (urlSearchParams.has(key)) {
        urlSearchParams.delete(key);
      }
    }

    for (const [key, value] of hashQueryParams) {
      urlSearchParams.append(key, value);
    }

    return urlSearchParams;
  }, [hashPath, hashQuery, targetInitialStateStr]);

  const targetQuery: State = useMemo(() => toObj(targetQueryURLSearchParams), [targetQueryURLSearchParams]);

  const setState = (s: React.SetStateAction<State>) => {
    const newQuery = typeof s === 'function' ? s(targetQuery) : s;

    // 1. 如果 setState 后，search 没变化，就需要 update 来触发一次更新。比如 demo1 直接点击 clear，就需要 update 来触发更新。
    // 2. update 和 history 的更新会合并，不会造成多次更新
    update();
    const query = new URLSearchParams((newQuery as any) ?? {}).toString();
    if (query.length !== 0) {
      window.location.hash = hashPath + '?' + query;
    } else {
      window.location.hash = hashPath;
    }
  };

  return [targetQuery, useMemoizedFn(setState)] as const;
}

export default useUrlHashState;
