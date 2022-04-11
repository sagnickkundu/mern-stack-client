import axios from 'axios';

const URL = 'https://share-memories-123.herokuapp.com';
const API = axios.create({ baseUrl: 'https://share-memories-123.herokuapp.com/' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
      }
    
    return req;
});

export const fetchPost = (id) => API.get(`${URL}/posts/${id}`);
export const fetchPosts = (page) => API.get(`${URL}/posts?page=${page}`);
export const fetchPostsByCreator = (name) => API.get(`${URL}/posts/creator?name=${name}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`${URL}/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('${URL}/posts', newPost);
export const likePost = (id) => API.patch(`${URL}/posts/${id}/likePost`);
export const comment = (value, id) => API.post(`${URL}/posts/${id}/commentPost`, { value });
export const updatePost = (id, updatedPost) => API.patch(`${URL}/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`${URL}/posts/${id}`);

export const signIn = (formData) => API.post('${URL}/user/signin', formData);
export const signUp = (formData) => API.post('${URL}/user/signup', formData);