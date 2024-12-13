class Delivery {
    promises = {};
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
    resolve(key, value) {
        if (!this.promises[key]) {
            throw new Error(`Promise with Key: ${key} is  not found`);
        }
        this.promises[key].resolve(value);
        delete this.promises[key];
    }
    reject(key, reason) {
        if (!this.promises[key]) {
            throw new Error(`Promise with Key: ${key} is  not found`);
        }
        this.promises[key].reject(reason);
        delete this.promises[key];
    }
}
export default Delivery;
