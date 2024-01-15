import t from 'api-helpers/toGqlParams';
import { renderFragments } from './_fragments';


/**
 * Найти группу критериев по идентификатору
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function findById(params) {
    return `
        {criteriaGroup ${ t(params) } {
            id
            name
            label
            countCriteria
            ${ renderFragments(params) }
        }
    }`;
}


/**
 * Найти все группы критериев
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function findAll(params, fragments) {    
    return `
        {criteriaGroups ${ t(params) } {
            id
            name
            label
            countCriteria
            ${ renderFragments(fragments) }
        }
    }`;
}


/**
 * Создание группу критериев
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function create(params) {
    return  `
        mutation {createCriteriaGroup ${ t(params) } {
            id
            name
            label
        }
    }`;
}


/**
 * Обновление группы критериев
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function update(params) {
    return `
        mutation {updateCriteriaGroup ${ t(params) } {
            id
            name
            label
        }
    }`;
}