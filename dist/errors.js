export var DeliveryErrorCode;
(function (DeliveryErrorCode) {
    DeliveryErrorCode["Timeout"] = "TIMEOUT";
    DeliveryErrorCode["PromiseNotFound"] = "PROMISE_NOT_FOUND";
    DeliveryErrorCode["PromiseAlreadyRegistered"] = "PROMISE_ALREADY_REGISTERED";
})(DeliveryErrorCode || (DeliveryErrorCode = {}));
export class DeliveryError extends Error {
    code;
    constructor(code, message) {
        super(message);
        this.code = code;
        this.name = 'DeliveryError';
    }
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
    static is(error) {
        return error instanceof DeliveryError;
    }
}
