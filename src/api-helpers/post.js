const config = require('config');
const auth = require('auth');


const post = async (path, params = {}) => {   
    if (!auth.hasToken) {
        await auth.guest.signUp();
    }

    let url = config.apiGateway+ '/' + path;

	let headers = {};

	headers['Content-Type'] = 'application/json';
	headers['Authorization'] = `${config.appName} ${auth.session.token}`;
	if ('version' in config) {
		headers['X-App-Version'] = config.version;
	}   
  
    let fetchOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(params)
    };

    console.log(url, fetchOptions); 

    return fetch(url, fetchOptions)
        .then(res => res.json())
};


export default post