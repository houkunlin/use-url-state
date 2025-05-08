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
