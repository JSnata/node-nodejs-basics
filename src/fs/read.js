import { access, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
    const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

    try {
        await access(filePath, constants.F_OK);
        const content = await readFile(filePath, 'utf-8');
        console.log(content);
    } catch (err) {
        throw new Error('FS operation failed');
    }
};

await read();