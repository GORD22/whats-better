
const queue = (pool, callback) => {
    
    let i = 0;
    let length = pool.length;

    let interval = setInterval( () => {
        const [func, params] = pool[i];
        func(params);
        
        i++;
        if (i >= length) {
            clearInterval(interval);
            
            if (callback) {
                callback();
            }
        }
    }, 300); 
};


export default queue;