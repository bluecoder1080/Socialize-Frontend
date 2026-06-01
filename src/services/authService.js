import api from '../api/axios';
export const signIn = (email, password) => api.post('/signin', { Email: email, Password: password });
export const signUp  = (data)           => api.post('/signup', data);
export const logOut  = ()               => api.post('/logout');
export const getProfile   = ()        => api.get('/profile');
export const editProfile  = (payload) => api.patch('/profile/edit', payload);
export const changePassword = (payload) => api.patch('/profile/forgetPassword', payload);
