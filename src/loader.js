import lloader from 'little-loader';

export function load(src, callback) {
    if (typeof src === 'string') lloader(src, callback); else lloader(src.src, {
        callback: src.callback || callback,

        setup: function(script) {
            script.crossOrigin = src.crossOrigin;
        }
    });
}

export function parallel(libs, callback) {
    var remaining = libs.length;

    callback = callback || function() { };

    if (!remaining) callback(); else {
        var done = false;

        for (var i = 0; i < libs.length; i++) {
            load(libs[i], function(err) {
                remaining--;

                if (!done && (err || !remaining)) {
                    done = true;
                    callback(err);
                }
            });
        }
    }
}
