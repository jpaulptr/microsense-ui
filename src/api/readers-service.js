import api from './api';
const basePath = 'http://localhost:3000/';

const readerService = {
    getReaders: function() {
        return api.get(`${basePath}readers`);
    },
    getHealth: function() {
        return api.get(`${basePath}health`);
    },
    getOperations: function() {
        return api.get(`${basePath}operations`);
    },
    sendJobs: function(body) {
        console.log(body)
        return api.post(`${basePath}jobs`, body);
    },
};

export default readerService;
