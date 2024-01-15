/**
 * Позволяет сделать ссылку в тексте кликабельной
 * 
 * @param {String} text - Параметры пользователя
 * @returns {String} carma
 */
const linkify = (text) => {
    let urlRegex = /(https?:\/\/[^\s]+)/g;
    let result = '';
    if (text) {
        result = text.replace(urlRegex, url => `<a target="_blank" href="${url}">${getHost(url)}</a>`); 
    }

    return result
};

const getHost =(url) => {
    let urlParts = /^(?:\w+\:\/\/)?([^\/]+)(.*)$/.exec(url);
    return urlParts[1]; 
};

export default linkify;	

    