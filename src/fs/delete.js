import { access, unlink } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const remove = async () => {
    try {
        const fileToRemovePath = path.join(__dirname, 'files', 'fileToRemove.txt');
        try {
            await access(fileToRemovePath , constants.F_OK);
            await unlink(fileToRemovePath)
        } catch (err) {
            if (err.code === 'ENOENT') {
                throw new Error('FS operation failed');
            } else {
                throw err;
            }
        }
    } catch (err) {
        throw new Error(err);
    }
};

await remove();