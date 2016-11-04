import lloader from 'little-loader';

function noop() { }

function callLoader(src, callback) {
    if (typeof src === 'string') {
        lloader(src, callback);
    } else {
        lloader(src.src, { callback, setup: (script) => script.crossOrigin = src.crossOrigin });
    }
}

export function parallel(libs, callback) {
    callback = callback || noop;

    let remaining = libs.length;

    if (!remaining) callback(); else {
        let done = false;

        for (let i = 0; i < libs.length; i++) {
            callLoader(libs[i], (err) => {
                remaining--;

                if (!done && (err || !remaining)) {
                    done = true;
                    callback(err);
                }
            });
        }
    }
}

export function load(libs, callback) {
    callback = callback || noop;

    // Load function and recursively call next function.
    function loadLib(idx) {
        if (idx >= libs.length) callback(); else {

            // Load this lib.
            callLoader(libs[idx], (err) => {
                // Short circuit if error.
                if (err) callback(err); else {

                    // Recursively go for next.
                    loadLib(idx + 1);
                }
            });
        }
    }

    // Start at first lib index.
    loadLib(0);
}
