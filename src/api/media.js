import t from 'api-helpers/toGqlParams';
import { fragments } from './_fragments';


/**
 * Получение списка медио для одной сущности
 * 
 * @param {Object} params
 * @returns {String}
 */
export function findAll(params) {
	return `
		{ media ${ t(params) } 
			${fragments.mediaData}
	}`;
}


/**
 * Добавление медиа к сущности
 * 
 * @param {Object} params
 * @returns {String}
 */
export function add(params) {
    return `
        mutation {addMedia ${ t(params) } {
			result
		}
    }`;
}


/**
 * Добавление медиа из сущности
 * 
 * @param {Object} params
 * @returns {String}
 */
export function remove(params) {
    return `
        mutation {removeMedia ${ t(params) } {
			result
		}
    }`;
}