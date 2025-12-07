import fs from 'fs';

fs.rmSync('../m-days-public', { recursive: true });
fs.mkdirSync('../m-days-public');

fs.cpSync('./dist', '../m-days-public', { recursive: true });
fs.cpSync('../m-days-legacy', '../m-days-public/l', { recursive: true });
