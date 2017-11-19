const logger = (error) => {
    console.log(error);
}

const api = {
    get: function get(url) {
        return fetch(url).then((response) => {
            if(response.status===200){
                return response.json();
            }
            
            return Promise.reject(response);
        }).catch((error) => {
            logger(error);
            return Promise.reject( new Error('There was an error retrieving the item.'));
        })
    },

    post: function post(url, body) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: myHeaders,
        }).then((result) => {
            if(result.status===200){
                return result;
            }
            
            return Promise.reject(result);
        }).catch((error) => {
            logger(error);
            return Promise.reject(  new Error('There was an error retrieving the item.'))
        })
    }
}

export default api;