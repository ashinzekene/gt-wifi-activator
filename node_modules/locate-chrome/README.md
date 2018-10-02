# locate-chrome [![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Find Google Chrome on your system.

Based on [`chrome-location`](https://github.com/hughsk/chrome-location).

## Usage

```js
var locateChrome = require('locate-chrome');
// Use a callback
locateChrome(function(l) {
  console.log(l);
});
// Use the returned Promise
locateChrome.then(function(l) {
  console.log(l);
});
```

### CLI Usage

`stdout` path to Chrome (or `null`):
```bash
> locate-chrome
# /Applications/Google Chrome.app/Contents/MacOS/Google Chrome
```

Open Chrome (you'll need to use quotes if Chrome's path has spaces in it):

```bash
> "`locate-chrome`"
```
