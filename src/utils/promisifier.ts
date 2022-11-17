export const promisifier = async <T>(promise: any): Promise<[T, any]> => {
  try {
    const result = await promise;
    return [result, null];
  } catch (error) {
    return [null, error];
  }
};

export const ok = <T, E>(value: T): Result<T, E> => [value, null];
export const err = <T, E>(error: E): Result<T, E> => [null, error];
