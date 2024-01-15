import t from 'api-helpers/toGqlParams';

const addressFields = `
    id
    userID
    cityName
    cityID
    cityFiasID
    value
    fiasID
    flat
    entrance
    floor
    alias
`


/**
 * Получить список адресов
 * 
 * @param {Object} params
 * @returns {String}
 */
export function findAll(params) {   
    return `{
        userAddresses ${ t(params) } {
            ${ addressFields }
        }
    }`;
}


/**
 * Создание адреса
 * 
 * @param {Object} params
 * @returns {String}
 */
 export function create(params) {
    return `
        mutation { createUserAddress ${ t(params) } {
            ${ addressFields }
        }
    }`;
}


/**
 * Обновление адреса
 * 
 * @param {Object} params
 * @returns {String}
 */
 export function update(params) {
    return `
        mutation { updateUserAddress ${ t(params) } {
            ${ addressFields }
        }
    }`;
}