const WorkerPool = require('./worker_pool');
const path = require('path');
const os = require('os');

const Koa = require('koa');

const pool = new WorkerPool(
  os.cpus().length,
  path.resolve(__dirname, 'worker.js')
);

console.log(os.cpus().length);

const app = new Koa();

app.use(async (ctx) => {
  const { a, b } = ctx.query;

  ctx.body = await new Promise((resolve, reject) => {
    pool.runTask({ a, b }, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });

  ctx.status = 200;
});

app.listen(8000);
