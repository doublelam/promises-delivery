export declare enum DeliveryErrorCode {
    Timeout = "TIMEOUT",
    PromiseNotFound = "PROMISE_NOT_FOUND",
    PromiseAlreadyRegistered = "PROMISE_ALREADY_REGISTERED"
}
export declare class DeliveryError extends Error {
    code: DeliveryErrorCode;
    constructor(code: DeliveryErrorCode, message: string);
    /**
     * A static method to check if a given error is a `DeliveryError` and if its `code` property is valid.
     *
     * @param error - The error to be checked.
     * @returns `true` if the error is a `DeliveryError` and its `code` property is valid; otherwise, `false`.
     *
     * @example
     * ```typescript
     * const error = new DeliveryError(DeliveryErrorCode.Timeout, 'Request timed out');
     * if (DeliveryError.is(error)) {
     *   console.log(`Error code: ${error.code}`);
     * }
     * ```
     */
    static is(error: unknown): error is DeliveryError;
}
