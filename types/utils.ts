/**
 * Overrides prop T2 in type T1
 *
 * @example
 * type AB = Override<A, { b: number }>
 */
export type Override<T1, T2> = Omit<T1, keyof T2> & T2

/**
 * Returns DB query result type
 */
export type DBQueryResult<T extends (...args: any) => any> = NonNullable<
  Awaited<ReturnType<T>>
>

export type FetchedDBQueryResult<T> = Awaited<T> | undefined

/**
 * search and convert prop with data value type in to string type
 *
 * @example
 * ConvertDatePropToString<{ a: "b" }>          // {a: 'b'}
 * ConvertDatePropToString<{ a: "b"; c: Date }> // {a: 'b', c: string}
 * ConvertDatePropToString<{ a: Date | null }>  // {a: string | null}
 */
export type ConvertDatePropToString<T extends object> = {
  [key in keyof T]: Date extends T[key]
    ? Exclude<T[key], Date> | string
    : T[key]
}
