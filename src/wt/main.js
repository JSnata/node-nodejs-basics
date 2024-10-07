import os from 'os';
import { Worker } from 'worker_threads';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const performCalculations = async () => {
    const numOfCpus = os.cpus().length;
    const workerPath = path.join(__dirname, 'worker.js');
    const results = [];
    let incNum = 10;

    return new Promise((resolve) => {
        let finishedWorkers = 0;

        for (let i = 0; i < numOfCpus; i++) {
            const worker = new Worker(workerPath, {
                workerData: { n: incNum },
            });
            incNum += 1;

            worker.on('message', (data) => {
                results[i] = { status: 'resolved', data };
            });

            worker.on('error', () => {
                results[i] = { status: 'error', data: null };
            });

            worker.on('exit', (code) => {
                if (code !== 0) {
                    results[i] = { status: 'error', data: null };
                }
                finishedWorkers += 1;
                if (finishedWorkers === numOfCpus) {
                    console.log(results);
                    resolve(results);
                }
            });
        }
    });
};

await performCalculations();