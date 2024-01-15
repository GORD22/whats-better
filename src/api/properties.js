import t from 'api-helpers/toGqlParams';
import { renderFragments } from './_fragments';


/**
 * Поиск свойств по имени
 * 
 * @param {Object} params
 * @returns {String}
 */
 export function search(params) {
    params.type = 'properties';
    
    return `
        {search ${ t(params) } {
            count
            properties {
                id
                label
                kind
            }
        }
    }`;
}


/**
 * Получить свойство по идентификатору
 * 
 * @param {Object} params
 * @returns {String}
 */
export function findById(params, segments) {

    return `
        {property ${ t(params) } {
            id
            name
            label
            kind
            associatedSphereID
            itemsType
            units
            min
            max
            ${ renderFragments(segments) }
        }
    }`;
}


/**
 * Получение списка элементов свойства
 * 
 * @param {Object} params
 * @returns {String}
 */
 export function getPropertyItems(params) {
    return `
        {propertyItems ${ t(params) } {
            id
            label
        }
    }`;
}


/**
 * Добавить элемент в список
 * 
 * @param {Object} params
 * @returns {String}
 */
export function addItems(params) {
    return `
		mutation {addPropertyItem ${ t(params) } {
			id
			label
			name
        }
    }`;
}