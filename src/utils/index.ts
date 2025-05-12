import { UrlParamsState } from '@houkunlin/use-url-state';
import isNil from '../lodash/isNil';

/**
 * 把 URLSearchParams 转换成数据对象
 * @param urlSearchParams URLSearchParams
 */
export function toState<S = any>(urlSearchParams: URLSearchParams): Partial<{ [key in keyof S]: string }> {
  type State = Partial<{ [key in keyof S]: string }>;
  const keys = new Set<string>();
  for (const key of urlSearchParams.keys()) {
    keys.add(key);
  }
  const obj: State = {};
  for (const key of keys) {
    const values = urlSearchParams.getAll(key);
    if (key.endsWith('[]')) {
      // 把以中括号结束的 key 强制设置值为数组类型
      // @ts-ignore
      obj[key] = values;
      continue;
    }
    if (values.length === 0) {
      continue;
    }
    // @ts-ignore
    obj[key] = values.length === 1 ? values[0] : values;
  }
  return obj;
}

/**
 * 循环参数对象，回调值内容，并把对象中 key 值为 null 或 undefined 的数据返回空字符串
 * @param state 参数对象
 * @param fn 回调方法
 */
export function forEachUrlParamsState(state?: UrlParamsState, fn?: (key: string, value: string) => void) {
  if (isNil(fn)) {
    return;
  }
  if (state instanceof URLSearchParams) {
    state.forEach((value, key) => fn(key, value));
    return;
  }
  if (isNil(state)) {
    return;
  }
  const keys = Object.keys(state);
  for (const key of keys) {
    const o = state[key];
    if (!(o instanceof Array)) {
      fn(key, `${isNil(o) ? '' : o}`);
    } else {
      if (o.length !== 0) {
        o.forEach((value) => {
          fn(key, `${isNil(value) ? '' : value}`);
        });
      } else {
        // 保留空数组的值，使空数组 [] 与 [''] 的表现一致
        fn(key, '');
      }
    }
  }
}

/**
 * 把数据对象转换成 URLSearchParams 对象
 * @param state 数据对象
 */
export function toURLSearchParams(state?: UrlParamsState) {
  const urlSearchParams = new URLSearchParams();
  forEachUrlParamsState(state, (key, value) => urlSearchParams.append(key, value));
  return urlSearchParams;
}

/**
 * 设置 window.location.hash 值
 * @param hashPath
 * @param urlSearchParams
 */
export function setWindowLocationHash(hashPath: string, urlSearchParams: URLSearchParams) {
  const query = urlSearchParams.toString();
  if (query.length !== 0) {
    window.location.hash = hashPath + '?' + query;
  } else {
    window.location.hash = hashPath;
  }
}

/**
 * 设置 window.location.search 值，但是为了设置值后不刷新页面，因此使用 window.history.replaceState 来替代
 * @param urlSearchParams
 */
export function setWindowLocationSearch(urlSearchParams: URLSearchParams) {
  const query = urlSearchParams.toString();
  // window.location.search = query;
  if (query.length !== 0) {
    window.history.replaceState({}, '', `${window.location.pathname}?${query}${window.location.hash}`);
  } else {
    window.history.replaceState({}, '', `${window.location.pathname}${window.location.hash}`);
  }
}

/**
 * 获取 hash 片段信息
 * @return [hashPath, hashQuery, useHash]
 */
export function getHashSegment(): [string, string] {
  const hash = window.location.hash;
  const index = hash.indexOf('?');
  if (index < 0) {
    return [hash, ''];
  }
  const hashQuery = hash.substring(index + 1);
  return [hash.substring(0, index), hashQuery];
}
