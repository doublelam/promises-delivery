import { DeliveryError, DeliveryErrorCode } from './errors.js';
export const isDeliveryError = (error) => {
    return DeliveryError.is(error);
};
export { DeliveryError, DeliveryErrorCode };
class Delivery {
    promises = {};
    timeout;
    constructor(options) {
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
    register(key, options) {
        if (this.promises[key]) {
            throw new DeliveryError(DeliveryErrorCode.PromiseAlreadyRegistered, `Promise with Key: ${key} is already registered`);
        }
        let timeoutId;
        let resolvePromise;
        let rejectPromise;
        const promise = new Promise((resolve, reject) => {
            resolvePromise = resolve;
            rejectPromise = reject;
            const timeoutValue = options?.timeout ?? this.timeout;
            if (timeoutValue) {
                timeoutId = setTimeout(() => {
                    reject(new DeliveryError(DeliveryErrorCode.Timeout, `Promise with Key: ${key} timed out after ${timeoutValue}ms`));
                    delete this.promises[key];
                }, timeoutValue);
            }
        });
        const state = {
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
    resolve(key, value) {
        if (!this.promises[key]) {
            throw new DeliveryError(DeliveryErrorCode.PromiseNotFound, `Promise with Key: ${key} is not found`);
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
    reject(key, reason) {
        if (!this.promises[key]) {
            throw new DeliveryError(DeliveryErrorCode.PromiseNotFound, `Promise with Key: ${key} is not found`);
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
    getPromise(key) {
        return this.promises[key]?.promise;
    }
}
export default Delivery;
