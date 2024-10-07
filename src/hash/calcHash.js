import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calculateHash = async () => {
    return new Promise((resolve, reject) => {
        const folderPath = path.join(__dirname, 'files');
        const filePath = path.join(folderPath, 'fileToCalculateHashFor.txt');

        const hash = createHash('sha256');
        const fileStream = fs.createReadStream(filePath);

        fileStream.on('data', (data) => {
            hash.update(data);
        });

        fileStream.on('end', () => {
            const fileHash = hash.digest('hex');
            console.log(`${fileHash}`);
            resolve(fileHash);
        });

        fileStream.on('error', (err) => {
            console.error(err);
            reject(err);
        });
    });
};

await calculateHash();
