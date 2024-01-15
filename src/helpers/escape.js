/**
 * Экранирование кавычек
 * 
 * 
 * @param {String} str
 * @returns {String} 
 */

 const escape = (str) => {
	let result;
	
	result = str.replace(/(?:\r\n|\r|\n)/g, '\n');
	result = result.replace(/\\([\s\S])|(")/g,"\\$1$2"); 
	return result;
}

export default escape;