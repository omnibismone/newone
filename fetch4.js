import fs from 'fs';
async function run() {
  const res = await fetch('https://make.ct.ws/projects/');
  const data = await res.text();
  fs.writeFileSync('projects.html', data);
}
run();
