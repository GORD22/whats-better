const auth = require('auth');
const _ = require('lodash');
const config = require('config').default;

const log = (message, value) => {
    if (value) { 
        console.log(message, value);
    }
};


const logging = (args, headers) => {
    console.groupCollapsed('API', args.caller);
    console.log(args.query);
    log('res: ', args.res);
    log('params: ', args.params);
    log('options: ', args.options);  
    log('variables: ', args.variables);  
    log('headers: ', headers);
    log('extraHeaders: ', args.extraHeaders);
    console.log('url: ', args.url);
    console.groupEnd();
};

const request = async (args) => {
    if (!auth.hasToken) {
        await auth.guest.signUp();
    }

	let headers = {};

	headers['Content-Type'] = 'application/json';
	headers['Authorization'] = `${config.appName} ${auth.session.token}`;
	if ('version' in config) {
		headers['X-App-Version'] = config.version;
	}

    logging(args, headers);

    let body = {
        query: args.query   
    };

    if (args.variables) {
        body.variables = args.variables;
    }

    let fetchOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    };

    const cb = (res) => callback(res, args);

    return fetch(args.url, fetchOptions)
        .then(res => res.json())
        .then(cb);
};


const callback = async (res, args) => {
    let errCode = _.get(res, 'error.code');

    /*
     * срок действия токена истек
     */
    if (errCode === 'TOKEN_EXPIRED') {

        await auth.refreshToken();
        
        if ('restart' in  args ) {
            args.restart++;
        } else {
            args.restart = 1;
        }

        args.restart = args.restart ? args.restart++ : 1;
       
        if (args.restart < 3) {
            return request(args);
        }
        return false;
    }
  
    /*
     * ошибки api
     */
    if ('errors' in res) {
        return false;
    }

    /*
     * если группа запросов
     */
    if (args.isGroup) {
        return res.data;
    }
    
    /*
     * получить корневой ключ
     */
    let rootKey;
    for (rootKey in res.data) {
        break;
    }
    
    return res.data[rootKey];
};


module.exports = request;