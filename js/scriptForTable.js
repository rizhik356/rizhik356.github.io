import fs from 'fs';

const readFile = fs.readFileSync('./book-1.xlsx', 'utf-8');

console.log(readFile);