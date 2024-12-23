# promises-delivery

This package is used to manage multiple promises by giving a key, you can call resolve or reject function out of the promise parameter callback and manage them by a key.

## Install

```bash
yarn add promises-delivery
```

## Usage
*index.ts*
```ts
import Delivery from 'promises-delivery';

// Initialize with default timeout
const delivery = new Delivery<string>({ timeout: 1000 });

// Register a promise with custom timeout
const promise = delivery.register('uniqueKey', { timeout: 2000 });

// Resolve the promise later
delivery.resolve('uniqueKey', 'value');

// Or reject it
delivery.reject('uniqueKey', new Error('something went wrong'));

// Get an existing promise
const existingPromise = delivery.getPromise('uniqueKey');
```

## Methods
```ts
{
    register: (key: string) => Promise<T>
    resolve: (key: string, value: T) => void;
    reject: (key: string, reason: string) => void
}
```

## Error Handling

The library provides a custom `DeliveryError` class and error codes for different scenarios:

```typescript
import Delivery, { DeliveryError, DeliveryErrorCode, isDeliveryError } from 'promises-delivery';

const delivery = new Delivery({ timeout: 1000 });

try {
  await delivery.register('key');
  // or delivery.resolve(key, value);
  // or delivery.reject(key, value);
} catch (error) {
  if (isDeliveryError(error)) {
    switch (error.code) {
      case DeliveryErrorCode.Timeout:
        console.log('Promise timed out');
        break;
      case DeliveryErrorCode.PromiseNotFound:
        console.log('Promise not found');
        break;
      case DeliveryErrorCode.PromiseAlreadyRegistered:
        console.log('Promise already registered');
        break;
    }
  }
}
```

## Error Types
| Error Code | Description |
| --- | ----------- |
| `TIMEOUT` | Promise execution exceeded timeout limit |
| `PROMISE_NOT_FOUND` | Attempted to access a non-existent promise |
| `PROMISE_ALREADY_REGISTERED` | Attempted to register a duplicate key |

## Contribution

```bash
yarn install
yarn tsc
```
