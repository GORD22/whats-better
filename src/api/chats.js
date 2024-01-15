import get from 'api-helpers/get';
import post from 'api-helpers/post';


/**
 * Получение всех чатов
 * 
 * @param {Object} params
 * @returns {String}
 */
export function findAll(params = {}) {  
	return (
		get(`v1.0/chats/`, params)
			.then(body => body.data)
	)
}


/**
 * Найти чат
 * 
 * @param {Object} params
 * @param {Object} options
 * @returns {String} 
 */
export function findById(params, options = {}) {   
    //let usersLimit = 'usersLimit' in options ? options.usersLimit : 20;
    
	const { chatID, ...rest } = params

	return (
		get(`v1.0/chats/${chatID}`, rest)
			.then(body => body.data)
	);
}


/**
 * Получение всех участников чата
 * 
 * @param {Object} params
 * @returns {String}
 */
export function getUsers(params) {   
	const { chatID, ...rest } = params

	return (
		get(`v1.0/chats/${chatID}/users`, rest)
			.then(body => body.data)
	);
}


/**
 * Создать чат
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function create(params) {
	return (
		post(`v1.0/chats/create`, params)
			.then(body => body.data)
	);
}


/**
 * Создать чат
 * 
 * @param {Object} params
 * @returns {String} 
 */
 export function update(params) {
	const { chatID, ...rest } = params;

	return (
		post(`v1.0/chats/${chatID}/update`, rest)
			.then(body => body.data)
	);
}


/**
 * Прочитать чат
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function read(params) {
	const { chatID, ...rest } = params;

	return (
		get(`v1.0/chats/${chatID}/read`, rest)
			.then(body => body.data)
	);
}


/**
 * Покинуть чат
 * 
 * @param {Object} params
 * @returns {String} 
 */
 export function leave(params) {
    const { chatID, ...rest } = params;

	return (
		get(`v1.0/chats/${chatID}/leave`, rest)
			.then(body => body.data)
	);
}


/**
 * Присоедениться к чату
 * 
 * @param {Object} params
 * @returns {String} 
 */
 export function join(params) {
	const { chatID, ...rest } = params;

	return (
		get(`v1.0/chats/${chatID}/join`, rest)
			.then(body => body.data)
	);
}


/**
 * Добавить пользователей к чату
 * 
 * @param {Object} params
 * @returns {String} 
 */
 export function addUsers(params) {
	const { chatID, ...rest } = params;

	return (
		post(`v1.0/chats/${chatID}/add_users`, rest)
			.then(body => body.data)
	);
}


/**
 * Удалить пользователей чата
 * 
 * @param {Object} params
 * @returns {String} 
 */
 export function removeUsers(params) {
	const { chatID, ...rest } = params;

	return (
		post(`v1.0/chats/${chatID}/remove_users`, rest)
			.then(body => body.data)
	);
}


/**
 * Получить статистику
 * 
 * @param {Object} params
 * @returns {String} 
 */
 export function getStat(params) {
	return (
		get(`v1.0/chats/stat`, params)
			.then(body => body.data)
	);
}


/**
 * Получить чат с пользователем по его идентификатору
 * 
 * @param {Object} params
 * @returns {String} 
 */
export function findByUserID(params) {       
	const { userID, ...rest } = params

	return (
		get(`v1.0/chats/user/${userID}`, rest)
			.then(body => body.data)
	);
}