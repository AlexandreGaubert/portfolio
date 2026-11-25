// French typography: a narrow no-break space before « : ; ! ? » and inside « 157 k » and « 32 % »,
// a no-break space inside « « » ».
export function frenchSpaces<T>(value: T): T {
  if (typeof value === 'string')
    return value
      .replace(/ ([:;!?])/g, '\u202f$1')
      .replace(/(\d) ([k%])(?=\s|$|[.,;:!?)])/g, '$1\u202f$2')
      .replace(/« /g, '«\u00a0')
      .replace(/ »/g, '\u00a0»') as T;
  if (Array.isArray(value)) return value.map(frenchSpaces) as T;
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, frenchSpaces(v)])) as T;
  return value;
}
