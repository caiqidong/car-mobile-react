export function mergeProps<T extends object[]>(...items: T): T[number] {
  const ret: Partial<T[number]> = {};
  items.forEach(item => {
    if (item) {
      Object.keys(item).forEach(key => {
        const typedKey = key as keyof typeof item;
        if (item[typedKey] !== undefined) {
          ret[typedKey] = item[typedKey];
        }
      });
    }
  });
  return ret as T[number];
}

/**
 * Merge props and return the first non-undefined value.
 * The later has higher priority. e.g. (10, 1, 5) => 5 wins.
 * This is useful with legacy props that have been deprecated.
 */
export function mergeProp<T, DefaultT extends T = T>(defaultProp: DefaultT, ...propList: T[]): T | undefined {
  for (let i = propList.length - 1; i >= 0; i -= 1) {
    if (propList[i] !== undefined) {
      return propList[i];
    }
  }
  return defaultProp;
}