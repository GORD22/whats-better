import t from 'api-helpers/toGqlParams';
import { fragments } from './_fragments';


/**
 * Изменить полезность
 * 
 * @param {Object} params
 * @param {Object} options
 * @returns {String}
 */
 export function change(params) {    
    return `
        mutation {changeUsefulness ${ t(params) } {
			subject      
			subjectID    
			useful     
			userID            
			countUseful  
			countUseless 
			createdAt
        }
    }`;
}


/**
 * Пользователи, которые оценили сущность 
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function getUsers(params) {
    return `
		{usefulnessUsers ${ t(params) } {
           id
		   name
		   mainMedia ${fragments.mediaData}
		}
	}`;
}