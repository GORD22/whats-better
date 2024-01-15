import t from 'api-helpers/toGqlParams';
import { fragments } from './_fragments';


/**
 * Получение всех баттлов
 * 
 * @param {Object} params
 * @returns {String}
 */
 export function findAll(params = {}) {  
    params.limit = params.limit || 20;

	return `{
		battles ${ t(params) }{
			id
		  	description
		  	createdAt
		  	sphere{
				id
				label
		  	}
		  	entities {
				id
				label
				mainMedia ${fragments.mediaData}
				countScores
				avgScore
		  	}
		}
	}`
}