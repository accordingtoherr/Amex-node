const { Worker, isMainThread } = require('worker_threads');
const path = require('path');
const requestTracker = require('./requestTracker');

const generateNewWorker = (workerName) => {
  const worker = new Worker(path.join(__dirname, '../workers', workerName));
  worker.on('message', (data) => {
  console.log('new worker created')
    const { response, requestId } = data;
    requestTracker[requestId](response);
    delete requestTracker[requestId];
  });
  worker.on('error', () => {
    console.log('worker terminated')
    worker.terminate();
  });
  setTimeout(() => {
    console.log("Worker is gonna be terminated if remains idle");
    console.log('worker terminated')
    worker.terminate();
  }, 900000);


  return worker;
}

module.exports = generateNewWorker;