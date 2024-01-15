import post from 'api-helpers/post';
import get from 'api-helpers/get';


/**
 * Сохранить параметры для отправки уведомлений
 * 
 * @param {Object} params
 */
export function saveUserDevice(params) {
	return (
		post(`v1.0/notifications/users/device`, params)
	);
}


/**
 * Получить все уведомления для пользователя
 * 
 * @param {Object} params
 */
export function findAll(params) {
	return (
		get(`v1.0/notifications/`, params)
	);
}


/**
 * Получить количество непрочитанных уведомлений
 * 
 * @param {Object} params
 */
export function getCountOfUnread(params) {

	return (
		get(`v1.0/notifications/get_unread_count`, params)
	);
}


/**
 * Прочитать все уведомления
 */
export function read() {

	return (
		get(`v1.0/notifications/read`)
	);
}


