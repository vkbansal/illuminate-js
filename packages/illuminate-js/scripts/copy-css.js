const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');

const srcPath = path.resolve(__dirname, '../src');
const files = glob.sync(path.join(srcPath, '**', '*.css'));

files.map(file => {
    const srcFile = path.relative(__dirname, file);
    const libPath = srcFile.replace('/src/', '/lib/');
    const esmPath = srcFile.replace('/src/', '/esm/');

    fs.copySync(path.resolve(__dirname, srcFile), path.resolve(__dirname, libPath));
    fs.copySync(path.resolve(__dirname, srcFile), path.resolve(__dirname, esmPath));
});
