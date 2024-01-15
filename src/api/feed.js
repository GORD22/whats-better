import get from 'api-helpers/get';


/**
 * Получение ленты
 * 
 * @param {Object} params
 * @returns {String}
 */
export function find(params) {  
	let  { id, type, ...rest } = params;

	return (
		get(`v1.0/feed/${type}/${id}`, rest)
	)
}


/**
 * Удаление элемента ленты
 * 
 * @param {Object} params
 * @returns {String}
 */
export function removeItem(id) {  
	return (
		get(`v1.0/feed/remove/${id}`)
	)
}