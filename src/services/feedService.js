import api from '../api/axios';
export const getFeed    = (skip=0,limit=20) => api.get('/feed',{params:{skip,limit}});
export const sendRequest = (userId, status) => api.post('/requests/'+userId+'/send/'+status);
