import cookies from './cookies';


/**
 * Загрузка изображений на сервер
 * 
 */
const uploadMedia = (assets, callback) => {

	const params = {}

	const meJSON = cookies.get('me');
	if (meJSON) {
		let me = JSON.parse(meJSON);
		params.userID = me.id;
	}

	let sizes = [1080,480,240]
	if (params.kind === 'avatar') {
		sizes = [1080,240,140]
	}

	let count = assets.length
	let counter = 0
	
	for (let i = 0; i < count; i++) {
		let asset = assets[i]

		let formdata = new FormData();
		let mediaType = "image"

		formdata.append(mediaType, asset)
		formdata.append("sizes", sizes.join(","))

		let fields = ['userID', 'sphereID', 'entityID', 'kind', 'title', 'description'];
		let keys = Object.keys(params);

		for (let key of keys) {
			if (fields.includes(key)) {
				formdata.append(key, params[key])	
			}
		}

		let options = {
			method: 'POST',
			headers: {
				"Accept": "application/json", 
			},
			body: formdata
		}

		const url = 'https://ttcdn.me/upload/' + mediaType;
		console.log(url, options)

		fetch(url, options)
			.then(res => res.json())
			.then(body => {
				counter++
				callback(body, counter == count)
			})
			.catch(err => {
				console.log(err)
				callback(null, true)
			}) 
	}
}


export default uploadMedia;  