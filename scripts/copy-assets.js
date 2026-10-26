const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'nodes');
const destDir = path.join(__dirname, '..', 'dist', 'nodes');

if (fs.existsSync(srcDir)) {
  fs.cpSync(srcDir, destDir, {
    recursive: true,
    filter: (src) => {
      const stat = fs.statSync(src);
      return stat.isDirectory() || /\.(png|svg)$/i.test(src);
    },
  });
}
