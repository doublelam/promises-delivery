import { DeliveryError, DeliveryErrorCode } from './errors';

export const isDeliveryError = (error: unknown): error is DeliveryError => {
  return DeliveryError.is(error);
};

export { DeliveryError, DeliveryErrorCode };

interface DeliveryOptions {
  timeout?: number;
}

interface PromiseState<T> {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (reason?: unknown) => void;
}

class Delivery<T> {
  private promises: { [key: string]: PromiseState<T> } = {};
  private timeout?: number;

  constructor(options?: DeliveryOptions) {
    if (options && options.timeout) {
      this.timeout = options.timeout;
    }
  }

  /**
   * Registers a new promise with the given key.
   *
   * @param key - The unique identifier for the promise to be registered.
   * @param options - Optional configuration for this specific promise.
   * @param options.timeout - Override default timeout for this promise.
   * @throws Will throw an error if a promise with the given key is already registered.
   * @returns A Promise<T> that can be used to handle the asynchronous operation.
   */
  public register(key: string, options?: { timeout?: number }): Promise<T> {
    if (this.promises[key]) {
      throw new DeliveryError(
        DeliveryErrorCode.PromiseAlreadyRegistered,
        `Promise with Key: ${key} is already registered`,
      );
    }

    let timeoutId: number;
    let resolvePromise: (value: T) => void;
    let rejectPromise: (reason?: unknown) => void;

    const promise = new Promise<T>((resolve, reject) => {
      resolvePromise = resolve;
      rejectPromise = reject;

      const timeoutValue = options?.timeout ?? this.timeout;
      if (timeoutValue) {
        timeoutId = setTimeout(() => {
          reject(
            new DeliveryError(
              DeliveryErrorCode.Timeout,
              `Promise with Key: ${key} timed out after ${timeoutValue}ms`,
            ),
          );
          delete this.promises[key];
        }, timeoutValue);
      }
    });

    const state: PromiseState<T> = {
      promise,
      resolve: resolvePromise,
      reject: rejectPromise,
    };

    promise.finally(() => clearTimeout(timeoutId));

    this.promises[key] = state;

    return promise;
  }

  /**
   * Resolves the promise associated with the given key.
   *
   * @param key - The unique identifier for the promise to be resolved.
   * @param value - The value to resolve the promise with.
   * @throws Will throw an error if a promise with the given key is not found.
   * @returns {void}
   */
  public resolve(key: string, value: T): void {
    if (!this.promises[key]) {
      throw new DeliveryError(
        DeliveryErrorCode.PromiseNotFound,
        `Promise with Key: ${key} is not found`,
      );
    }
    this.promises[key].resolve(value);
    delete this.promises[key];
  }

  /**
   * Rejects the promise associated with the given key with the provided reason.
   *
   * @param key - The unique identifier for the promise to be rejected.
   * @param reason - The reason for rejecting the promise.
   * @throws Will throw an error if a promise with the given key is not found.
   * @returns {void}
   */
  public reject(key: string, reason: unknown): void {
    if (!this.promises[key]) {
      throw new DeliveryError(
        DeliveryErrorCode.PromiseNotFound,
        `Promise with Key: ${key} is not found`,
      );
    }
    this.promises[key].reject(reason);
    delete this.promises[key];
  }

  /**
   * Retrieves the promise associated with the given key.
   *
   * @param key - The unique identifier of the promise to be retrieved.
   * @returns The promise associated with the given key if it exists, otherwise undefined.
   */
  public getPromise(key: string): Promise<T> | undefined {
    return this.promises[key]?.promise;
  }
}

export default Delivery;
