import * as http from 'http';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { createReadStream } from 'fs';
import * as fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(async (req, res) => {
  const url = req.url;

  if (url === '/index.html') {
    await sendFile('/index.html', res);
  } else if (url.indexOf('/dist') === 0) {
    await sendFile(url, res);
  } else {
    res.writeHead(400, { 'Content-Type': 'text/html' });
    res.end('<h1>Not found!<h1>');
  }
});

server.listen(8000);

async function sendFile(url, res) {
  const filePath = path.join(__dirname, url);
  const stat = await fs.stat(filePath);

  res.writeHead(200, { 'Content-Length': stat.size });

  const readStream = createReadStream(filePath);

  await readStream.pipe(res);
}
