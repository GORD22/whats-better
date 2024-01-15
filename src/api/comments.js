import t from 'api-helpers/toGqlParams';
import { fragments } from './_fragments';


/**
 * Получить список комментарий
 * 
 * @param {Object} params
 * @returns {String}
 */
 export function findAll(params) {   
    return `
		{comments ${ t(params) } {
			id
			text
			author {
				id
				name
				karma
				login
				mainMedia ${fragments.mediaData} 
			}
			createdAt
			useless
			useful
		}
	}`;
}


/**
 *  Создать комментарий
 * 
 * @param {Object} params
 * @returns {String}
 */
export function create(params) {
    let text = params.text.replace(/(?:\r\n|\r|\n)/g, '\n');
    params.text = `""${text}""`;
    
    return `
        mutation {createComment ${ t(params) } {
            id
            text
			createdAt
			useless
			useful
            author {
                id
                name
				login
                mainMedia ${fragments.mediaData} 
                karma
            }
        }
    }`;
}
