import { mediaURL } from './mediaURL';

/**
 * Получение стилей для картинки
 * 
 * @example 
 * imgStyle("qwerty", "32-32"); // {backgroundImage: url("http://picture.whatsbetter.me/picture/size/32-32?hash=qwerty")}
 * 
 * @param {String} hash
 * @param {String} size
 * @returns {String} style
 */
const imgStyle = (media, size)=> {
    let style = {};
    let url = mediaURL(media, size);
    
    if (url !== null) {
        style.backgroundImage = `url(${url})`;
    }
    
    return style;	
};

export default imgStyle;