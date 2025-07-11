import axios from 'axios';

const API = axios.create({
  baseURL: 'https://localhost:7115/api',
});


export const getBooks = async () => {
  const res = await API.get('/book');
  return res.data;
};


export const createBook = async (book) => {
  const res = await API.post('/book', book);
  return res.data;
};


export const updateBook = async (id, book) => {
  const res = await API.put(`/book/${id}`, book);
  return res.data;
};


export const deleteBook = async (id) => {
  const res = await API.delete(`/book/${id}`);
  return res.data;
};
