import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Fetch all posts
export const fetchPosts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create a post
export const createPost = async (post) => {
  const response = await axios.post(API_URL, post);
  return response.data;
};

// Update a post
export const updatePost = async (id, updatedPost) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedPost);
  return response.data;
};

// Delete a post
export const deletePost = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};