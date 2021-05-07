const { parentPort, threadId } = require('worker_threads');

parentPort.on('message', (data) => {
  const { a, b } = data;
  console.log(`running task on thread: ${threadId}`);
  parentPort.postMessage(multiply(parseInt(a), parseInt(b)));
});

function multiply(a, b) {
  let product = 0;

  for (let i = 0; i < b; i++) {
    product += a;
  }

  return product;
}
