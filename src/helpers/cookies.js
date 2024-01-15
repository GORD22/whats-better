/**
 * Чтение из cookie
 * 
 * @param {String} name
 */   
import { isBrowser } from './isBrowser';

const get = (name) => {
    let matches;
    
    if (!isBrowser) {
        return null;
    } 
    
    matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
    
    if (matches) {
        return decodeURIComponent(matches[1]);
    } 
    else {
        return void 0;
    }
};

     
/**
 * Записывает параметр в cookie
 * 
 * @param {String} name
 * @param {String} value
 * @param {Object} options
 */        
const save = (name, value, options) => {
    if (!isBrowser) {
        return null;
    } 
    
    options = options || {};

    let expires = options.expires;

    if (typeof expires == 'number' && expires) {
        let d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    let updatedCookie = name + '=' + value;

    for (let propName in options) {
        updatedCookie += '; ' + propName;
        let propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }

    document.cookie = updatedCookie;
};


export default { get, save };