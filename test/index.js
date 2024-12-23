import { describe, it } from 'mocha';
import Delivery, {
  DeliveryError,
  DeliveryErrorCode,
  isDeliveryError,
} from '../dist/index.js';
describe('Delivery', () => {
  describe('register', () => {
    it('should successfully register a new key and return a promise', done => {
      const delivery = new Delivery();
      const key = 'newKey';

      const result = delivery.register(key);

      if (
        result instanceof Promise &&
        delivery['promises'][key] &&
        delivery['promises'][key].promise === result
      ) {
        done();
      } else {
        done(new Error('Failed to register a new key and return a promise'));
      }
    });

    it('should throw DeliveryError with PromiseAlreadyRegistered when registering existing key', done => {
      const delivery = new Delivery();
      const key = 'existingKey';

      delivery.register(key);

      try {
        delivery.register(key);
        done(new Error('Expected error was not thrown'));
      } catch (error) {
        if (
          error instanceof DeliveryError &&
          error.code === DeliveryErrorCode.PromiseAlreadyRegistered &&
          error.message === `Promise with Key: ${key} is already registered`
        ) {
          done();
        } else {
          done(new Error('Unexpected error type or message'));
        }
      }
    });

    it('should reject with timeout error when timeout occurs', done => {
      const delivery = new Delivery({ timeout: 500 });
      const key = 'timeoutKey';
      delivery
        .register(key)
        .then(() => {
          done(new Error('Promise should have been rejected'));
        })
        .catch(error => {
          if (
            isDeliveryError(error) &&
            error.code === DeliveryErrorCode.Timeout
          ) {
            done();
          } else {
            done(new Error('Unexpected error type or message'));
          }
        });
    });
  });

  describe('resolve', () => {
    it('should resolve the promise with the given key', done => {
      const delivery = new Delivery();
      const key = 'resolveKey';
      const value = 'resolvedValue';

      const promise = delivery.register(key);
      setTimeout(() => {
        delivery.resolve(key, value);
      }, 200);

      promise
        .then(result => {
          if (result === value) {
            done();
          } else {
            done(new Error('Promise was not resolved with the correct value'));
          }
        })
        .catch(done);
    });
  });

  describe('reject', () => {
    it('should reject the promise with the given key', done => {
      const delivery = new Delivery();
      const key = 'rejectKey';
      const reason = 'rejectedReason';

      const promise = delivery.register(key);
      setTimeout(() => {
        delivery.reject(key, reason);
      }, 200);

      promise.catch(error => {
        if (error === reason) {
          done();
        } else {
          done(new Error('Promise was not rejected with the correct reason'));
        }
      });
    });
  });

  describe('getPromise', () => {
    it('should return the promise associated with the given key', done => {
      const delivery = new Delivery();
      const key = 'getPromiseKey';

      const registeredPromise = delivery.register(key);
      const retrievedPromise = delivery.getPromise(key);

      if (registeredPromise === retrievedPromise) {
        done();
      } else {
        done(new Error('getPromise did not return the correct promise'));
      }
    });
  });
});
