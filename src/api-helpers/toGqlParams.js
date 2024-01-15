const toGqlParams = (params) => {
    if (params === undefined) {
        return '';
    }
    
    let gqlParams = [];
    let gqlConditions = '';
    
    for (let key of Object.keys(params)) {
        let value;
        let type = typeof params[key];
	
        if (['updatedAt', 'createdAt'].includes(key)) {
            continue;
        }
	
        if (type === 'object') {  
            value = JSON.stringify(params[key]).replace(/\"([^(\")"]+)\":/g, "$1:");
        }
        else if (type === 'boolean' || type === 'number') {
            value = `${params[key]}`;  
        }
        else {
            value = `"${params[key]}"`;
        }
        
        let item  = `${key}: ${value}`;
	
        gqlParams.push(item);
    }
    
    if (gqlParams.length > 0) {
        gqlConditions = `(${gqlParams.join(', ')})`
    }
    
    return gqlConditions;
}

export default toGqlParams;


