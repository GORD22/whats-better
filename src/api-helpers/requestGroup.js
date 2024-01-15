const requestGroup = (queries) => {
    let req = queries.map(t => {
    let str = t.replace(/\s+/g, ' ').trim();
        return str.slice(1, -1);;
    });
    let query = `{${req.join('')}}`;
    return query;
};
    
export default requestGroup;