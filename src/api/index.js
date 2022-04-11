import axios from 'axios';

const API = axios.create({ baseUrl: 'https://share-memories-123.herokuapp11.com/' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
      }
    
    return req;
});

export const fetchPost = (id) => API.get(`https://share-memories-123.herokuapp.com/posts/${id}`);
export const fetchPosts = (page) => {
  console.log("i am here")
  console.log(axios.get(`https://share-memories-123.herokuapp.com/posts?page=${page}`))
  return axios.get(`https://share-memories-123.herokuapp.com/posts?page=${page}`)
}



export const fetchPostsByCreator = (name) => API.get(`https://share-memories-123.herokuapp.com/posts/creator?name=${name}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`https://share-memories-123.herokuapp.com/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('https://share-memories-123.herokuapp.com/posts', newPost);
export const likePost = (id) => API.patch(`https://share-memories-123.herokuapp.com/posts/${id}/likePost`);
export const comment = (value, id) => API.post(`https://share-memories-123.herokuapp.com/posts/${id}/commentPost`, { value });
export const updatePost = (id, updatedPost) => API.patch(`https://share-memories-123.herokuapp.com/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`https://share-memories-123.herokuapp.com/posts/${id}`);

export const signIn = (formData) => API.post('https://share-memories-123.herokuapp.com/user/signin', formData);
export const signUp = (formData) => API.post('https://share-memories-123.herokuapp.com/user/signup', formData);