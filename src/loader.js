/* eslint no-param-reassign: ["error", { "props": false }] */
import lloader from 'little-loader';

export function load(src, callback) {
  if (typeof src === 'string') lloader(src, callback);
  else {
    lloader(src.src, {
      callback: callback || src.callback,

      setup(script) {
        script.crossOrigin = src.crossOrigin;
      }
    });
  }
}

export function parallel(libs, callback) {
  let remaining = libs.length;
  const cb = callback || function () { };

  if (!remaining) cb();
  else {
    let done = false;

    const loadCallback = (err) => {
      remaining -= 1;
      if (!done && (err || !remaining)) {
        done = true;
        cb(err);
      }
    };

    for (let i = 0; i < libs.length; i += 1) {
      load(libs[i], loadCallback);
    }
  }
}
