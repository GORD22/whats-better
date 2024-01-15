import t from 'api-helpers/toGqlParams';
import { renderFragments } from './_fragments';


/**
 * Получение свойств сферы
 * 
 * @param {Object} params
 * @returns {String}
 */
export function findAll(params, fragments) {
    params.limit = 'limit' in params ?  params.limit : 100;

    return `
        {sphereProperties ${ t(params) } {
            id
			name
            propertyID
            propertyLabel
            label
            kind
            associatedSphereID
			filterable
            itemsType
            units
            min
            max
			hideOnEntity
            ${ renderFragments(fragments) }
        }
    }`;
}


/**
 * Получение групп свойств
 * 
 * @param {Object} params
 * @returns {String}
 */
export function getGroups(params) {
    return `
        {propertiesGroups ${ t(params) } {
            id
            name
            label
        }
    }`;
}


/**
 * Получение группы свойств
 * 
 * @param {Object} params
 * @returns {String}
 */
export function getGroup(params) {
    return `
        {propertiesGroup ${ t(params) } {
            id
            name
            label
			popular
			sphereProperties {
				id
				name
				label
				kind
			}
        }
    }`;
}


/**
 * Создать свойство
 * 
 * @param {Object} params
 * @returns {String}
 */
export function create(params) {
    return `
        mutation {createSphereProperty ${ t(params) } {
            id
            name
            kind
            label
        }
    }`;
}


/**
 * Обновить свойство
 * 
 * @param {Object} params
 * @returns {String}
 */
export function update(params) {
    return `
        mutation {updateSphereProperty ${ t(params) } {
            id
            name
            kind
            label
        }
    }`;
}