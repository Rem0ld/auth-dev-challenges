import { Result } from "../global";

export const promisifier = async <T>(
  promise: any
): Promise<[T | null, any]> => {
  try {
    const result = await promise;
    return [result, null];
  } catch (error) {
    return [null, error];
  }
};

export const ok = <T>(value: T): Result<T, null> => [value, null];
export const err = <E>(error: E): Result<null, E> => [null, error];
