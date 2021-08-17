// const rimraf = require('rimraf');
const fs = require('fs');
const child_process = require('child_process');

if (fs.existsSync('./docs-theme')) {
  // rimraf('./docs-theme');
}

fs.mkdirSync('./docs-theme');

const cpaths = fs.readdirSync('./components').filter(item => {
  return !['__tests__', '_util'].includes(item);
});

cpaths.forEach(item => {
  fs.mkdirSync(`./docs-theme/${item}`);
  
  const src = `components/${item}/style`;
  const dist = `./docs-theme/${item}/style`;
  const origin_dist = `./docs-theme/${item}/_style`;
  
  child_process.spawn('cp', ['-r', src, dist]);
  child_process.spawn('cp', ['-r', src, origin_dist]);	
})
