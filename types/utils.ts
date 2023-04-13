/**
 * Overrides prop T2 in type T1
 * example
 *
 * ```type AB = Override<A, { b: number }>```
 */
export type Override<T1, T2> = Omit<T1, keyof T2> & T2

/**
 * Returns DB query result type
 */
export type DBQueryResult<T extends (...args: any) => any> = NonNullable<
  Awaited<ReturnType<T>>
>
