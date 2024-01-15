import t from 'api-helpers/toGqlParams';


/**
 * Детализация фильтров
 * 
 * @param {Object} params
 * @returns {String}
 */
 export function getDetails(params) {   
    
    return `
        { getFiltersDetails ${ t(params) } {
            id
            label
            op
            kind
            units
            value
            items {
                id
                label
            }
        }
    }`;
}