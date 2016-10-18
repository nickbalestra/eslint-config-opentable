import lloader from 'little-loader';

function noop() { }

export function parallel(libs, callback) {
    callback = callback || noop;

    if (!libs.length) {
        return callback();
    }

    let remaining = libs.length;
    let done = false;

    for (let i = 0; i < libs.length; i++) {
        lloader(libs[i], (err) => {
            remaining--;

            if (!done && (err || !remaining)) {
                done = true;
                callback(err);
            }
        });
    }
}

export function load(libs, callback) {
    callback = callback || noop;

    // Load function and recursively call next function.
    function loadLib(idx) {
        if (idx >= libs.length) {
            return callback();
        }

        // Load this lib.
        lloader(libs[idx], (err) => {
            // Short circuit if error.
            if (err) {
                return callback(err);
            }

            // Recursively go for next.
            loadLib(idx + 1);
        });
    }

    // Start at first lib index.
    loadLib(0);
}
