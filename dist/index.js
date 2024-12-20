class Delivery {
    promises = {};
    /**
     * Registers a new promise with the given key.
     *
     * This method creates a new promise and stores it along with its resolve and reject functions.
     * If a promise with the given key already exists, an error is thrown.
     *
     * @param key - The unique identifier for the promise to be registered.
     * @throws Will throw an error if a promise with the given key is already registered.
     * @returns A Promise<T> that can be used to handle the asynchronous operation.
     */
    register(key) {
        if (this.promises[key]) {
            throw new Error(`Promise with Key: ${key} is already registered`);
        }
        const state = {
            promise: null,
            resolve: null,
            reject: null,
        };
        state.promise = new Promise((resolve, reject) => {
            state.resolve = resolve;
            state.reject = reject;
        });
        this.promises[key] = state;
        return this.promises[key].promise;
    }
    /**
     * Resolves the promise associated with the given key with the provided value.
     *
     * @param key - The unique identifier for the promise to be resolved.
     * @param value - The value to fulfill the promise with.
     *
     * @throws Will throw an error if a promise with the given key is not found.
     *
     * @returns {void}
     */
    resolve(key, value) {
        if (!this.promises[key]) {
            throw new Error(`Promise with Key: ${key} is not found`);
        }
        this.promises[key].resolve(value);
        delete this.promises[key];
    }
    /**
     * Rejects the promise associated with the given key with the provided reason.
     *
     * This method finds the promise with the specified key, rejects it with the given reason,
     * and then removes it from the internal promises storage.
     *
     * @param key - The unique identifier for the promise to be rejected.
     * @param reason - The reason for rejecting the promise.
     * @throws Will throw an error if a promise with the given key is not found.
     * @returns {void}
     */
    reject(key, reason) {
        if (!this.promises[key]) {
            throw new Error(`Promise with Key: ${key} is  not found`);
        }
        this.promises[key].reject(reason);
        delete this.promises[key];
    }
    /**
     * Returns the promise associated with the given key.
     *
     * This method finds the promise with the specified key and returns it.
     *
     * @param key - The unique identifier for the promise to be retrieved.
     * @throws Will throw an error if a promise with the given key is not found.
     * @returns {Promise<T>} The promise associated with the given key.
     */
    getPromise(key) {
        if (!this.promises[key]) {
            throw new Error(`Promise with Key: ${key} is not found`);
        }
        return this.promises[key].promise;
    }
}
export default Delivery;
