const _ = require('lodash');
const request = require('./request');


function toGqlRequest (url, headers, functions, name) {
    return _.mapValues(functions, func => {
        return  (...args) => {
            let caller = name + '.' + func.name;            
            let [params, options, extraHeaders] = args;        


            let reqParams = {
                query: func(...args),
                caller: caller,
                url,
                params,
                options,
                headers,
                extraHeaders
            };

            return request(reqParams);
        };
    });
}

export default toGqlRequest;