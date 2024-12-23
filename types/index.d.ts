import { DeliveryError, DeliveryErrorCode } from './errors';
export declare const isDeliveryError: (error: unknown) => error is DeliveryError;
export { DeliveryError, DeliveryErrorCode };
interface DeliveryOptions {
    timeout?: number;
}
declare class Delivery<T> {
    private promises;
    private timeout?;
    constructor(options?: DeliveryOptions);
    /**
     * Registers a new promise with the given key.
     *
     * @param key - The unique identifier for the promise to be registered.
     * @param options - Optional configuration for this specific promise.
     * @param options.timeout - Override default timeout for this promise.
     * @throws Will throw an error if a promise with the given key is already registered.
     * @returns A Promise<T> that can be used to handle the asynchronous operation.
     */
    register(key: string, options?: {
        timeout?: number;
    }): Promise<T>;
    /**
     * Resolves the promise associated with the given key.
     *
     * @param key - The unique identifier for the promise to be resolved.
     * @param value - The value to resolve the promise with.
     * @throws Will throw an error if a promise with the given key is not found.
     * @returns {void}
     */
    resolve(key: string, value: T): void;
    /**
     * Rejects the promise associated with the given key with the provided reason.
     *
     * @param key - The unique identifier for the promise to be rejected.
     * @param reason - The reason for rejecting the promise.
     * @throws Will throw an error if a promise with the given key is not found.
     * @returns {void}
     */
    reject(key: string, reason: unknown): void;
    /**
     * Retrieves the promise associated with the given key.
     *
     * @param key - The unique identifier of the promise to be retrieved.
     * @returns The promise associated with the given key if it exists, otherwise undefined.
     */
    getPromise(key: string): Promise<T> | undefined;
}
export default Delivery;
