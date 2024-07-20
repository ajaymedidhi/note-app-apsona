import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export const register = (name, email, password) => api.post('/auth/register', { name, email, password });
export const login = (email, password) => api.post('/auth/login', { email, password });
export const getNotes = () => api.get('/notes');
export const createNote = (note) => api.post('/notes', note);
export const updateNote = (id, note) => api.put(`/notes/${id}`, note);
export const deleteNote = (id) => api.delete(`/notes/${id}`);
