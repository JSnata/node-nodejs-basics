import { createReadStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
    const folderPath = path.join(__dirname, 'files');
    const filePath = path.join(folderPath, 'fileToRead.txt');

    const fileStream = createReadStream(filePath, { encoding: 'utf-8' });
    fileStream.on('data', (chunk) => {
        process.stdout.write(chunk);
    });

    fileStream.on('end', () => {
        console.log('\nFile reading finished.');
    });

    fileStream.on('error', (err) => {
        console.error(err);
    });
};

await read();