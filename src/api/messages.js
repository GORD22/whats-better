import get from 'api-helpers/get';
import post from 'api-helpers/post';


/**
 * Получение всех собщений в чате
 * 
 * @param {Object} params
 * @returns {String}
 */
export function findAll(params) { 
	const { chatID, ...rest } = params;

	return (
		get(`v1.0/chats/${chatID}/messages`, rest)
			.then(body => body.data)
	);
}


/**
 * Создать сообщение
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function create(params) {
    if ('text' in params) {
        let text = params.text.replace(/(?:\r\n|\r|\n)/g, '\n');
        params.text = text;
    }

	const { chatID, ...rest } = params;

	return (
		post(`v1.0/chats/${chatID}/send`, rest)
			.then(body => body.data)
	);
}