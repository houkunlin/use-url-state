export function toObj<S = any>(urlSearchParams: URLSearchParams): Partial<{ [key in keyof S]: string }> {
  type State = Partial<{ [key in keyof S]: string }>;
  const keys = new Set<string>();
  for (const key of urlSearchParams.keys()) {
    keys.add(key);
  }
  const obj: State = {};
  for (const key of keys) {
    const values = urlSearchParams.getAll(key);
    if (values.length === 0) {
      continue;
    }
    // @ts-ignore
    obj[key] = values.length === 1 ? values[0] : values;
  }
  return obj;
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
