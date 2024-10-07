import { spawn } from 'child_process';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const spawnChildProcess = async (args) => {
    const folderPath = path.join(__dirname, 'files');
    const filePath = path.join(folderPath, 'script.js');

    const child = spawn('node', [filePath, ...args]);
    process.stdin.pipe(child.stdin);
    child.stdout.pipe(process.stdout);

    child.on('error', (error) => {
        console.error(`Error: ${error.message}`);
    });

    child.on('exit', (code) => {
        console.log(`Child process exited with code ${code}`);
    });
};

spawnChildProcess(['arg1', 'arg2']);