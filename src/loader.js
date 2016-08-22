import load from 'little-loader';

export const parallel = (libs, callback = () => { }) => {
    if (!(libs && libs.length)) {
        return callback();
    }

    let remaining = libs.length;
    let done = false;

    libs.forEach(lib => load(lib, (err) => {
        remaining = remaining - 1;

        if (!done && (err || !remaining)) {
            done = true;
            callback(err);
        }
    }));
};

export const serial = (libs, callback = () => { }) => {
    // Load function and recursively call next function.
    const loadLib = (idx) => {
        const lib = libs[idx];

        // Done with all libs.
        if (typeof lib === 'undefined') {
            return callback();
        }

        // Load this lib.
        load(lib, (err) => {
            // Short circuit if error.
            if (err) { return callback(err); }

            // Recursively go for next.
            loadLib(idx + 1);
        });
    };

    // Start at first lib index.
    loadLib(0);
};
