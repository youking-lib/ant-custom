// const rimraf = require('rimraf');
const fs = require('fs');
const child_process = require('child_process');

if (fs.existsSync('./docs-theme')) {
  // rimraf('./docs-theme');
}

fs.mkdirSync('./docs-theme');

const cpaths = fs.readdirSync('./components').filter(item => {
  return !['__tests__', '_util', 'index.tsx'].includes(item);
});

cpaths.forEach(item => {
  const src = `components/${item}/style`;
  const dist = `./docs-theme/${item}/style`;
  const origin_dist = `./docs-theme/${item}/_style`;

  if (fs.existsSync(src)) {
    fs.mkdirSync(`./docs-theme/${item}`);
    sync(src, dist, origin_dist);
  }
})

sync(`components/style`, './docs-theme/style');

function sync (src, dist, origin_dist) {
  
    child_process.spawn('cp', ['-r', src, dist]);

    if (origin_dist) {
      child_process.spawn('cp', ['-r', src, origin_dist]);
    }
}
