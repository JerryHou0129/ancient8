/**
 * tryCatch return Promise<[TReturn, TError]>
 * @param {Promise<TReturn>} promise
 */
export async function tryCatch<TReturn, TError = Error>(
  promise: Promise<TReturn> | TReturn,
): Promise<[TReturn, null] | [null, TError]> {
  try {
    const ret = await promise
    return [ret, null]
  } catch (e) {
    return [null, e as TError]
  }
}
