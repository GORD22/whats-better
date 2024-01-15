import t from 'api-helpers/toGqlParams';
import { renderFragments } from './_fragments';


/**
 * Поиск критериев по имени 
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function search(params) {
    params.type = 'criteria';

    return `{
        search ${ t(params) } {
            count
            criteria {
                id
                label
            }
        }
    }`;
}


/**
 * Найти критерий по идентификатору
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function findById(params) {
    return `
        {criterion ${ t(params) } {
            id
            name
            label
            description
            hide
			hasGender
            criterionGroups {
                id
                name
                label
            }
        }
    }`;
}


/**
 * Найти все критерии
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function findAll(params, segments) {
    params.hide = false;
    
    return `
        {criteria ${ t(params) } {
            id
            name
            label
            description
            countScores
            avgScore
			hasGender
            ${ renderFragments(segments) }
        }
    }`;
}


/**
 * Создание критерия
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function create(params) {
    return  `
        mutation {createCriterion ${ t(params) } {
            id
            name
            label
            description
        }
    }`;
}


/**
 * Обновление критерия
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function update(params) {
    return `
        mutation {updateCriterion ${ t(params) } {
            id
            name
            label
            description
        }
    }`;
}


/**
 * Получить список критерий, которые использовал пользователь для оценок
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function getUsersCriteria(params) {
    return `
        {usersCriteria ${ t(params) } {
            id
            name
            label
            countScores
        }
    }`;
}


/**
 * Добавить критерий в группу
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function addToGroup(params) {
    return `
        mutation {addCriteriaToGroup ${ t(params) } {
            result
        }
    }`;
}


/**
 * Удалить критерий из группы
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function removeFromGroup(params) {
    return `
        mutation {removeCriteriaFromGroup ${ t(params) } {
            result
        }
    }`;
}