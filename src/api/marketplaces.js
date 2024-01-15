import t from 'api-helpers/toGqlParams';
import { fragments } from './_fragments';
   

/**
 * Получение всех магазинов
 * 
 * @param {Object} params
 * @returns {String}
 */
export function findAll(params) {  
    
    return `
        {marketplaces ${ t(params) } {
            id
            name
            label
        }  
    }`;
}


/**
 * Найти магазин по идентификатору
 * 
 * @param {Object} params
 * @param {Object} options
 * @returns {String} 
 */
export function findById(params) {   
    
    return `
        {marketplace ${ t(params) } {
            id
            name
            label
			mainMedia ${fragments.mediaData}
			url
            address
            phone
			dealName
			unitName
            entityID
            authorID
			author {
				id
				name
			}
            delivery
            deliveryDescription
          
        }  
    }`;
}


/**
 * Создать магазин
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function create(params) {
    return `
        mutation {createMarketplace ${ t(params) } {
            id
            name
            label
        }
    }`;
}


/**
 * Обновить магазин
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function update(params) {
    return `
        mutation {updateMarketplace ${ t(params) } {
            id
        }
    }`;
}