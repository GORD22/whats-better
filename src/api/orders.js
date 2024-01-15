import t from 'api-helpers/toGqlParams';
import { fragments } from './_fragments';


/**
 * Получить список заказов
 * 
 * @param {Object} params
 * @returns {String}
 */
export function findAll(params) {   
    return `{
        orders ${ t(params) } {
            id
            amount
            status
            statusLabel
            deliveryAddress
            paymentURL
            failURL
            successURL
            createdAt
            items {
                marketplaceID
                sphereID
                entity {
                    id
                    label
                    mainMedia ${fragments.mediaData}
                }
                price
                quantity
                discount
                amount
            }
        }
    }`;
}