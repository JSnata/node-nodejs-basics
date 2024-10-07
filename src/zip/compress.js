import { createReadStream, createWriteStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { createGzip } from 'node:zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compress = async () => {
    const folderPath = path.join(__dirname, 'files');
    const filePath = path.join(folderPath, 'fileToCompress.txt');
    const archivePath = path.join(folderPath, 'archive.gz');

    const gzip = createGzip();
    const source = createReadStream(filePath);
    const destination = createWriteStream(archivePath);

    source.pipe(gzip).pipe(destination);

    destination.on('finish', () => {
        console.log('File compressed to archive.gz');
    });

    source.on('error', (err) => {
        console.error(err);
    });

    gzip.on('error', (err) => {
        console.error(err);
    });

    destination.on('error', (err) => {
        console.error(err);
    });
};

await compress();
