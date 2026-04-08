import fs from 'fs';
const buffer = fs.readFileSync('public/images/1.png');
console.log(buffer.toString('utf8', 0, 200));
