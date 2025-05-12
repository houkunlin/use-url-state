import { getHashSegment, setWindowLocationHash, UrlParamsState } from '@houkunlin/use-url-state';
import type * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import useMemoizedFn from '../ahooks/useMemoizedFn';
import useUpdate from '../ahooks/useUpdate';

export type UseUrlHashParamsStateOptions = {
  /**
   * 初始参数是否设置到 hash
   */
  initParamsToHash?: boolean;
};

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
 * @return [query, setQuery] query：URLSearchParams，setQuery：设置 URLSearchParams
 */
function useUrlHashParamsState(
  initialState?: UrlParamsState | (() => UrlParamsState),
  options?: UseUrlHashParamsStateOptions,
) {
  const update = useUpdate();
  const [[hashPath, hashQuery], setHashInfo] = useState<[string, string]>(getHashSegment);

  const initialStateRef = useRef(
    typeof initialState === 'function' ? (initialState as () => UrlParamsState)() : initialState || {},
  );
  // const targetInitialStateStr = JSON.stringify(initialStateRef.current);

  useEffect(() => {
    const fn = () => {
      setHashInfo(getHashSegment());
    };
    window.addEventListener('hashchange', fn);
    return () => {
      window.removeEventListener('hashchange', fn);
    };
  }, []);

  const targetQuery = useMemo(() => {
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
  }, [hashPath, hashQuery /*, targetInitialStateStr*/]);

  const setState = (s: React.SetStateAction<URLSearchParams>) => {
    const newQuery = typeof s === 'function' ? s(new URLSearchParams(targetQuery)) : s;

    // 1. 如果 setState 后，search 没变化，就需要 update 来触发一次更新。比如 demo1 直接点击 clear，就需要 update 来触发更新。
    // 2. update 和 history 的更新会合并，不会造成多次更新
    update();
    setWindowLocationHash(hashPath, newQuery);
  };

  useEffect(() => {
    if (options?.initParamsToHash) {
      setWindowLocationHash(hashPath, targetQuery);
    }
  }, []);

  return [targetQuery, useMemoizedFn(setState)] as const;
}

export default useUrlHashParamsState;
