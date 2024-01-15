import round10 from './round10';
import numFormat from './numFormat';

/** 
 * Сокращение длинного числа
 * 
 * @example 
 * shortCount(1000) // 1k
 * 
 * @param {Integer} value
 * @return {String} result
 */
const shortCount = (value) => {
	let count = parseInt(value, 10)
	if (count < 1000) {
		return {
			count: count,
			countLabel: count.toString()
		}
	}
	else {
		let n = round10(count, 3) / 1000;
		return {
			count: n * 1000,
			countLabel: numFormat(n) + 'k'
		}
	}
};

export default shortCount;