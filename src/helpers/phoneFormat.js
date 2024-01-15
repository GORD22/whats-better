/** 
 * Форматирование номера телефона
 * 
 * @example 
 * phoneFormat("71234567890") // +7 (123) 456-78-90
 * 
 * @param {String} phone
 * @return {String} result
 */
const phoneFormat = (phone) => {	
    if (!phone) {
        return null;
    }
    return `+7 (${phone.substr(1, 3)}) ${phone.substr(4, 3)}-${phone.substr(7, 2)}-${phone.substr(9, 2)}`;
};

export default phoneFormat;	    