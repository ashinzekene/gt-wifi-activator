const path = require('path');

const getPath = (name) => {
  name = name.replace(/(http(s)?:\/\/|\/)/g, '');
  name = name.split('.')
  var [ext, ...name] = name.reverse();
  name = name.reverse().join('').substr(0, 30) + `.${ext}`;
  return path.join(__dirname, 'screenshots', name);
}

module.exports = async (page, { verbose = false } = {}) => {
  const filename = getPath(`${(new Date()).toISOString()}#${page.url()}.jpg`);
  await page.screenshot({ path: filename })
  if (verbose) {
    console.log('Screenshot %s taken', filename);
  }
  return true;
}