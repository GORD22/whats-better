/**
 * Валидация электронного адреса
 * 
 * @param {String} email 
 * @returns {Boolean} result 
 */
const email = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Валидация номера телефона
 * 
 * @param {String} digitsCount 
 * @returns {Boolean} result 
 */
const phone = (digitsCount) => {
    let  str = digitsCount.trim().match(/\d/g);
    let isValid = str && (str.length == 10 || str.length == 11 )
    return isValid; 
}

/**
 * Валидация имени
 * 
 * @param {String} str 
 * @returns {Boolean} result 
 */
const name = (str) => {
	let isValid = true;

	str = str.trim();

	if (str == '') {
		return false;
	}

	if (str.length == 1) {
		return false;
	}

	for (let i = 0; i < str.length; i++) {
		let c = str[i];
		if (c.toLowerCase() === c.toUpperCase()) {
			isValid = false
			break
		}
	}

	return isValid
}

export default { email, phone, name }