/**
 * Склонение слов
 * 
 * @example 
 * declension(56, ['мнение','мнения','мнений', 'Нет мнений'], false); // 56 мнений
 * 
 * @param {String} number 
 * @param {Array} expressions 
 * @returns {String} result
 */
const declension = (number, expressions, onlytext = false) => {

    let word;
    let result;
    let numInt	= number ? parseInt(number, 10) : 0;

    let numStr	= onlytext ? '' : numInt.toLocaleString().replace(/,/g,' ') + ' ';
    let count	= numInt % 100;
    
    if (numInt === 0) {
        result = expressions[3];
    }
    
    else if (count >= 5 && count <= 20) {
        result = `${numStr}${expressions[2]}`;
    }
    
    else {
        count = count % 10;
	
        if (count === 1) {
            word = expressions[0];
        } 
        else if (count >= 2 && count <= 4) {
            word = expressions[1];
        } 
        else {
            word = expressions[2];
        }
        result = `${numStr}${word}`;
    }
    
    return result;
};

export default declension;