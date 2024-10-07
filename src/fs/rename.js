import { access, rename as renameFunc } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rename = async () => {
    try {
        const wrongFileNamePath = path.join(__dirname, 'files', 'wrongFilename.txt');
        const properFileNamePath = path.join(__dirname, 'files', 'properFilename.md');

        try {
            await access(properFileNamePath , constants.F_OK);
            throw new Error('FS operation failed');
        } catch (err) {
            if (err.code === 'ENOENT') {
                try {
                    await access(wrongFileNamePath , constants.F_OK);
                    await renameFunc(wrongFileNamePath, properFileNamePath);
                } catch (err) {
                    throw new Error('FS operation failed');
                }
                
            } else {
                throw err;
            }
        }
    } catch (err) {
        throw new Error(err);
    }
};

await rename();