
function shakeCase(str) {
    return str.replace(/\.?([A-Z]+)/g, function (x,y) {
        return '_' + y.toLowerCase();
    }).replace(/^_/, '');
}

export default shakeCase

