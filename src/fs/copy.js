import { access, mkdir, readdir, copyFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copy = async () => {
    const folderPath = path.join(__dirname, 'files');
    const destinationFolder = path.join(__dirname, 'files_copy');

    try {
        await access(folderPath, constants.F_OK);
        try {
            await access(destinationFolder, constants.F_OK);
            throw new Error('FS operation failed');
        } catch (err) {
            if (err.code === 'ENOENT') {
                await mkdir(destinationFolder);
                const files = await readdir(folderPath);

                for (const file of files) {
                    const sourceFile = path.join(folderPath, file);
                    const destinationFile = path.join(destinationFolder, file);
                    await copyFile(sourceFile, destinationFile);
                }

                console.log('Files copied successfully!');
            } else {
                throw err;
            }
        }
    } catch (err) {
        throw new Error('FS operation failed');
    }
};

await copy();
