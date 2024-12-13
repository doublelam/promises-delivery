# promises-delivery
```ts

const delivery = new Delivery<string>();

const start = async () => {

  [1,2,3,4,5,6,7,8,9,10].forEach(async v => {
    const val = await delivery.register(`key-${v}`);
		console.log('------',`key-${v}`, val);
  })
}

start();

[1,2,3,4,5,6,7,8,9,10].forEach(v => {
  setTimeout(() => {
  delivery.resolve(`key-${v}`, `Key: key-${v} resolved`)
  }, 1000 * v)
});
```
