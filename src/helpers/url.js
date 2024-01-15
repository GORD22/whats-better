import { isBrowser } from './isBrowser';

/**
 * Обновление GET параметров текущего адреса без перезагрузки страницы
 * 
 * @param {String} param 
 * @param {String} value 
 * @param {String} url 
 * @returns {String} result 
 */
const update = (param, value, url = window.location.href, isReplace = true) => {
   
    let urlParts	= url.split('?');
    let urlBase		= urlParts[0];
    let urlParams	= urlParts[1];
    let isFind		= false;
    let newUrlParams	= [];
    let spliter		= '';
    
    if (urlParams) {
        newUrlParams = urlParams.split('&');
	
        for (let i = 0, length = newUrlParams.length; i < length; i++){
            if (newUrlParams[i].split('=')[0] === param){
                isFind = true;
		
                if (value === null) {
                    newUrlParams.splice(i, 1);
                }
                else {
                    newUrlParams[i] = param + '=' + value;
                }
            }
        }
    }
    
    if (!isFind && value !== null) {
        newUrlParams.push(param + '=' + value);
    }
    
    if (newUrlParams.length > 0) {
        spliter = '?';
    }
    
    let result = urlBase + spliter + newUrlParams.join('&');

    if (isReplace) {   
        window.history.replaceState(null, null, result);
    }
    
    
    return result;
};


/**
 * Возращает список GET параметров текущей страницы
 * 
 * @returns {Array} params
 */
const parse = (href = window.location.href) =>{
    let params = {};
    
    if (isBrowser) {
        href = href.replace(window.location.hash , "");  
    }

    href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
        params[key] = value;
    });
    
    return params;
};

export default { update, parse };