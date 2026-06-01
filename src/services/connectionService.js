import api from '../api/axios';
export const getConnections      = ()                   => api.get('/user/connections');
export const getReceivedRequests = ()                   => api.get('/user/requests/received');
export const reviewRequest       = (requestId, status) => api.post('/requests/'+requestId+'/review/'+status);
