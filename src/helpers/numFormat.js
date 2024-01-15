/** 
 * Форматирование чисел с плавующей точкой
 * 
 * @example 
 * numFormat("31000.50", 0) // 31 000
 * 
 * @param {Float} num
 * @param {Integer} fixed
 * @return {String} result
 */
const numFormat = (num, fixed = 0) => { 
	if (num === undefined) {
		return ''
	}

	if (num === null) {
		return ''
	}

	if (num === false) {
		return ''
	}

    let decimalPart;
    let result;

    let array = Math.floor(num).toString().split('');
    let index = -3; 
    while ( array.length + index > 0 ) { 
        array.splice( index, 0, ' ' );              
        index -= 4;
    }

    if (num % 1 === 0) {
        result = array.join('');
    } else if (fixed > 0){
        decimalPart = num.toFixed(fixed).split('.')[1];
        result = array.join('') + ',' + decimalPart;
    }
    else {
        result = array.join(''); 
    }
    
    return result;
};

export default numFormat;