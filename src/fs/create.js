import { writeFile, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'path'; 
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const create = async () => {
    try {
        const filePath = path.join(__dirname, 'files', 'fresh.txt');
        const content = 'I am fresh and young';

        try {
            await access(filePath, constants.F_OK);
            throw new Error('FS operation failed');
        } catch (err) {
            if (err.code === 'ENOENT') {
                await writeFile(filePath, content);
            } else {
                throw err;
            }
        }
    } catch (err) {
        throw new Error(err);
    }
};

await create();