class Delivery<T> {
  private promises: {
    [key: string]: {
      promise: Promise<T>;
      resolve: (value: T) => void;
      reject: (reason: string) => void;
    };
  } = {};
  public register(key: string) {
    if (this.promises[key]) {
      throw new Error(`Promise with Key: ${key} is already registered`);
    }
    const state: {
      promise: Promise<T> | null;
      resolve: ((value: T) => void) | null;
      reject: ((reason: string) => void) | null;
    } = {
      promise: null,
      resolve: null,
      reject: null,
    };

    state.promise = new Promise((resolve, reject) => {
      state.resolve = resolve;
      state.reject = reject;
    });

    this.promises[key] = state as {
      promise: Promise<T>;
      resolve: (value: T) => void;
      reject: (reason: string) => void;
    };

    return this.promises[key].promise;
  }

  public resolve(key: string, value: T) {
    if (!this.promises[key]) {
      throw new Error(`Promise with Key: ${key} is  not found`);
    }
    this.promises[key].resolve(value);
    delete this.promises[key];
  }

  public reject(key: string, reason: string) {
    if (!this.promises[key]) {
      throw new Error(`Promise with Key: ${key} is  not found`);
    }
    this.promises[key].reject(reason);
    delete this.promises[key];
  }
}

export default Delivery;
