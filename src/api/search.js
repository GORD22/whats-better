import t from 'api-helpers/toGqlParams';

/**
 * Поиск
 * 
 * @param {Object} params
 * @returns {String}
 */
export function execute(params) {  
    return `
        {search ${ t(params) } { 
            count
        }
    }`;
}