
const Mash = function () {
    var n = 0xefc8249d;
    var mash = function (data) {
        if (data) {
            data = data.toString();
            for (var i = 0; i < data.length; i++) {
                n += data.charCodeAt(i);
                var h = 0.02519603282416938 * n;
                n = h >>> 0;
                h -= n;
                h *= n;
                n = h >>> 0;
                h -= n;
                n += h * 0x100000000; // 2^32
            }
            return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
        } else {
            n = 0xefc8249d;
        }
    };
    return mash;
};
    
const uheprng = function (seed) {
    return (function () {
        var o = 48; 
        var c = 1; 
        var p = o; 
        var s = new Array(o); 
        var i; 
        var j; 
        var k = 0; 


        var mash = new Mash(); 

        for (i = 0; i < o; i++) {
            s[i] = mash(Math.random());
        }

        var rawprng = function () {
            if (++p >= o) {
                p = 0;
            }
            var t = 1768863 * s[p] + c * 2.3283064365386963e-10; // 2^-32
            return s[p] = t - (c = t | 0);
        };


        var random = function (range) {
            return Math.floor(range * (rawprng() + (rawprng() * 0x200000 | 0) * 1.1102230246251565e-16)); // 2^-53
        };

        random.string = function (count) {
            var i;
            var s = '';
            for (i = 0; i < count; i++) {
                s += String.fromCharCode(33 + random(94));
            }
            return s;
        };


        var hash = function () {
            var args = Array.prototype.slice.call(arguments);
            for (i = 0; i < args.length; i++) {
                for (j = 0; j < o; j++) {
                    s[j] -= mash(args[i]);
                    if (s[j] < 0) {
                        s[j] += 1;
                    }
                }
            }
        };


        random.cleanString = function (inStr) {
            inStr = inStr.replace(/(^\s*)|(\s*$)/gi, ''); // remove any/all leading spaces
            inStr = inStr.replace(/[\x00-\x1F]/gi, ''); // remove any/all control characters
            inStr = inStr.replace(/\n /, '\n'); // remove any/all trailing spaces
            return inStr; // return the cleaned up result
        };


        random.hashString = function (inStr) {
            inStr = random.cleanString(inStr);
            mash(inStr); // use the string to evolve the 'mash' state
            for (i = 0; i < inStr.length; i++) { // scan through the characters in our string
                k = inStr.charCodeAt(i); // get the character code at the location
                for (j = 0; j < o; j++) { //	"mash" it into the UHEPRNG state
                    s[j] -= mash(k);
                    if (s[j] < 0) {
                        s[j] += 1;
                    }
                }
            }
        };

        random.seed = function (seed) {
            if (typeof seed === 'undefined' || seed === null) {
                seed = Math.random();
            }

            random.initState();
            random.hashString(seed);
        };

        // this handy exported function is used to add entropy to our uheprng at any time
        random.addEntropy = function ( /* accept zero or more arguments */ ) {
            var args = [];
            for (i = 0; i < arguments.length; i++) {
                args.push(arguments[i]);
            }
            hash((k++) + (new Date().getTime()) + args.join('') + Math.random());
        };

        random.initState = function () {
            mash(); // pass a null arg to force mash hash to init
            for (i = 0; i < o; i++) {
                s[i] = mash(' '); // fill the array with initial mash hash values
            }
            c = 1; // init our multiply-with-carry carry
            p = o; // init our phase
        };

        random.done = function () {
            mash = null;
        };

        if (typeof seed !== 'undefined') {
            random.seed(seed);
        }

        random.range = function (range) {
            return random(range);
        };

        random.random = function () {
            return random(Number.MAX_VALUE - 1) / Number.MAX_VALUE;
        };

        random.floatBetween = function (min, max) {
            return random.random() * (max - min) + min;
        };

        random.intBetween = function (min, max) {
            return Math.floor(random.random() * (max - min + 1)) + min;
        };

        return random;
    }());
};
    
uheprng.create = function (seed) {
    return new uheprng(seed);
};

export default uheprng;