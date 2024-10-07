import { createWriteStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const write = async () => {
    const folderPath = path.join(__dirname, 'files');
    const filePath = path.join(folderPath, 'fileToWrite.txt');

    const fileStream = createWriteStream(filePath, { encoding: 'utf-8' });
    process.stdin.on('data', (chunk) => {
        fileStream.write(chunk);
    });

    process.stdin.on('end', () => {
        fileStream.end();
        console.log('\nFile writing finished.');
    });

    fileStream.on('error', (err) => {
        console.error(err);
    });
};

await write();