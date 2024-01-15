import t from 'api-helpers/toGqlParams';
import { renderFragments } from './_fragments';


/**
 * Получение всех бронирований
 * 
 * @param {Object} params
 * @returns {String}
 */
 export function findAll(params = {}, segments= {}) {  

	return `{
		bookings ${ t(params) } { 
			id
			parentEntity {
				id
				label
			}
			startDate
			endDate
			count
			price
			userCount
			childrens
			active
			isPaid
			cancelReason
			createdAt
			updatedAt
			cancelAt
			${ renderFragments(segments) }
		}
	}`
}

/**
 * Получение бронирования по идентификатору
 * 
 * @param {Object} params
 * @returns {String}
 */
export function findById(params = {}, segments= {}) {  

	return `{
		booking ${ t(params) } { 
			id
			parentEntity {
				id
				label
			}
			startDate
			endDate
			count
			price
			userCount
			childrens
			goal
			comment
			source
			active
			paymentMethod
			prepaymentAmount
			isPaid
			cancelReason
			users {
				name
			}
			createdAt
			updatedAt
			cancelAt
			${ renderFragments(segments) }
		}
	}`
}


/**
 * Создать бронирования
 * 
 * @param {Object} params
 * @returns {String}
 */
 export function create(params = {}) {  

	return `mutation {
		createBooking ${ t(params) } { 
			id
		}
	}`
}

/**
 * Обновить бронирование
 * 
 * @param {Object} params
 * @returns {String}
 */
export function update(params = {}) {  

	return `mutation {
		updateBooking ${ t(params) } { 
			id
		}
	}`
}