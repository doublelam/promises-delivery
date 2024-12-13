# promises-delivery

This package is used to manage multiple promises by giving a key, you can call resolve or reject function out of the promise parameter callback and manage them by a key.

## Install

```bash
yarn add promises-delivery
```

## Usage
*index.js*
```ts
import Delivery from 'promises-delivery';

const delivery = new Delivery<string>();
[1,2,3,4,5,6,7,8,9,10].forEach(async v => {
    // Register a promise by giving a key. it will return a promise.
    const val = await delivery.register(`key-${v}`);
    console.log('------',`key-${v}`, val);
})
```
*where-else.js*
```ts
// pass delivery from outside
[1,2,3,4,5,6,7,8,9,10].forEach(v => {
    setTimeout(() => {
    // resolve a promise by calling `resolve` with a key.
    delivery.resolve(`key-${v}`, `Key: key-${v} resolved`)
    }, 1000 * v)
});
```

## Methods
```ts
{
    register: (key: string) => Promise<T>
    resolve: (key: string, value: T) => void;
    reject: (key: string, reason: string) => void
}
```

## Contribution

```bash
yarn install
yarn tsc
```
