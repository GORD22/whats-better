import get from 'api-helpers/get';
import post from 'api-helpers/post';


export function findAll(params) {  
	return (
		get('v1/media/', params)
	)
}

export function update(params) {  
	let  { mediaID, ...rest } = params;

	return (
		post(`v1/media/media_id/${mediaID}/update`, rest)
	)
}