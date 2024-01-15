import t from 'api-helpers/toGqlParams';
import escape from 'helpers/escape';


/**
 * Жалоба на пользователя
 * 
 * @param {Object} params
 * @returns {String}
 */
 export function aboutUser(params) { 
	if ('comment' in params) {
        let comment = escape(params.comment);
        params.comment = `""${comment}""`;
    }
	 
	return `mutation {
		createReportAboutUser ${ t(params) } {
			result
		}
	}`
}


/**
 * Жалоба на контент
 * 
 * @param {Object} params
 * @returns {String}
 */
export function aboutContent(params) {  
	if ('comment' in params) {
        let comment = escape(params.comment);
        params.comment = `""${comment}""`;
    }

	return `mutation {
		createReportAboutContent ${ t(params) } {
			result
		}
	}`
}