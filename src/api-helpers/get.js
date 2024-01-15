const config = require('config');
const auth = require('auth');


const get = async (path, params = {}) => {   

    if (!auth.hasToken) {
        await auth.guest.signUp();
    }

    let keys = Object.keys(params);
    let urlParams = [];

    for (let key of keys) {
        urlParams.push(key+'='+params[key]);
    }

    let url = config.apiGateway + '/' + path;
    if (urlParams.length > 0) {
        url = url + '?' + urlParams.join('&');
    }
    
    console.log(url);

	let headers = {};

	headers['Content-Type'] = 'application/json';
	headers['Authorization'] = `${config.appName} ${auth.session.token}`;
	if ('version' in config) {
		headers['X-App-Version'] = config.version;
	}   
  
    let fetchOptions = {
        method: 'GET',
        headers: headers
    };

    console.log(fetchOptions); 

    return fetch(url, fetchOptions)
        .then(res => res.json())
};


export default get