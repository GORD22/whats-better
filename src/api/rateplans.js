import t from 'api-helpers/toGqlParams';

import { fragments } from './_fragments';


/**
 * Получение тарифных планов для объекта
 * 
 * @param {Object} params
 * @returns {String}
 */
 export function findByEntity(params = {}) {  

	return `{
		ratePlansOfEntity ${ t(params) } { 
			id
			name
			label
			description
			currency
			amount
			mainImage ${fragments.mediaData}
			mainIcon ${fragments.mediaData}
		  }
	}`
}