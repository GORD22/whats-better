import config from 'config';
import headers from './_headers';
import t from 'api-helpers/toGqlParams';
import request from 'api-helpers/request';

const reqOptions = {
	url: config.apiServer, 
	headers: headers,
}

/**
 * Получение данных на календаре
 * 
 * @param {Object} params
 * @returns {Request}
 */
 export function getData(params = {}) {  

	let query = `{
		calendarData ${ t(params) } { 
			values
			startDate
			endDate
			daysCount
			property {
				name
				units
			}
			keyProperty {
				name
				value
			}
		}
	}`

	return request({
		...reqOptions,
		query,
		caller: 'calendar.getData', 
	});
}

/**
 * Сохранение данных на календаре
 * 
 * @param {Object} params
 * @returns {Request}
 */
export function addData(params = {}) {  
	const { data, ...rest } = params;

	let v = t(rest);
	let c = v.slice(0, v.length - 1) + ", data: $data" + v.slice(v.length - 1);

	let query = `mutation ($data: [CalendarValuesType]!) {
		addCalendarData ${ c } { 
		  	result
		}
	}`

	return request({
		...reqOptions,
		query,
		variables: {data},
		caller: 'calendar.addData', 
	});
}