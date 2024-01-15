import t from 'api-helpers/toGqlParams';
import { fragments } from './_fragments';
import escape from 'helpers/escape';

let presetFragment = `
    id
    name
    label
    description 
    mainMedia ${fragments.mediaData}
    withGivenEntities
    criteria {
        id
        label
    }
    users {
        id
        name
        mainMedia ${fragments.mediaData}
    }
    filters{
        id
        label
        value
        op
        items {
            id
            label
        }
    }
    sphere {
        id
        name
        label
        mainMedia ${fragments.mediaData}
    }
    author {
        id
        name 
		login
        mainMedia ${fragments.mediaData}
        karma
    }
    createdAt
`;


/**
 * Получение всех подборок
 * 
 * @param {Object} params
 * @returns {String}
 */
export function findAll(params) {  
    
    return `
        {presets ${ t(params) } {
            ${ presetFragment }
        }
    }`;
}


/**
 * Получение подборки по идентификатору
 * 
 * @param {Object} params
 * @returns {String}
 */
export function findById(params) {           
    return `
        {preset ${ t(params) } {
            ${ presetFragment }
        }
    }`;
}


/**
 * Создание подборки
 * 
 * @param {type} params
 * @returns {String}
 */
export function create(params) {
    if ('description' in params) {
        let desc = escape(params.description);
        params.description = `""${desc}""`;
    }
   
    return `
        mutation {createPreset ${ t(params) } {
            id
            name
            label
            description
            mainMedia ${fragments.mediaData}
            sphere {
                id
            }
        }
    }`;
}


/**
 * Обновление подборки
 * 
 * @param {type} params
 * @returns {String}
 */
export function update(params) {
    // if ('title' in params) {
    //     params.title = params.title.replace(/\\([\s\S])|(")/g,'\\$1$2');
    // };
    
    return `
        mutation {updatePreset ${ t(params) } {
            id
            name
            label
            description
            mainMedia ${fragments.mediaData}
            sphere {
                id
            }
        }
    }`;
}


/**
 * Добавить критерии к подборке
 * 
 * @param {Object} params
 * @returns {String}
 */
export function addCriteria(params) { 
    return `
        mutation {addCriteriaToPreset ${ t(params) } {
            id
        }
    }`;
}


/**
 * Удалить критерии из подборки
 * 
 * @param {Object} params
 * @returns {String}
 */
export function removeCriteria(params) { 
    return `
        mutation {removeCriteriaFromPreset ${ t(params) } {
            id
        }
    }`;
}


/**
 * Добавить объект к подборке
 * 
 * @param {Object} params
 * @returns {String}
 */
export function addEntities(params) { 
    return `
        mutation {addEntitiesToPreset ${ t(params) } {
            id
        }
    }`;
}


/**
 * Удалить объект из подборки
 * 
 * @param {Object} params
 * @returns {String}
 */
export function removeEntities(params) { 
    return `
        mutation {removeEntitiesFromPreset ${ t(params) } {
            id
        }
    }`;
}


/**
 * Удалить пользователей из подборки
 * 
 * @param {Object} params
 * @returns {String}
 */
export function removeUser(params) { 
    return `
        mutation {removeUserFromPreset ${ t(params) } {
            id, 
        }
    }`;
}