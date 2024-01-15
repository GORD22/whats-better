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
import numFormat from './numFormat';

const SYMBOLS = {
	usd: '$',
	rub: '₽',
	cny: '¥',
	eur: '€',
}

let printPrice = (price) => {
	let cur = '';

	if ('currency' in price) {
		if (price.currency in SYMBOLS) {
			cur =  SYMBOLS[price.currency];
		} else {
			cur = price.currency
		}
	}

	return numFormat(price.value) + ' ' + cur
}

export default printPrice;