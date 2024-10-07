import { createReadStream, createWriteStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { createGunzip } from 'node:zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const decompress = async () => {
  const folderPath = path.join(__dirname, 'files');
  const filePath = path.join(folderPath, 'fileToCompress.txt');
  const archivePath = path.join(folderPath, 'archive.gz');

  const gunzip = createGunzip();
  const source = createReadStream(archivePath);
  const destination = createWriteStream(filePath);

  source.pipe(gunzip).pipe(destination);

  destination.on('finish', () => {
    console.log('File decompressed into fileToCompress.txt');
  });

  source.on('error', (err) => {
    console.error(err);
  });

  gunzip.on('error', (err) => {
    console.error(err);
  });

  destination.on('error', (err) => {
    console.error(err);
  });
};

await decompress();
