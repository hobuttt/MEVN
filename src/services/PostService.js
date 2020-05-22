import axios from 'axios';

export default {
  fetchPosts() {
    return axios.get('/posts');
  },
  getPost(postId) {
    return axios.get('/post', { params: { id: postId } });
  },
  addPost(post) {
    return axios.post('/posts', post);
  },
  deletePost(postId) {
    return axios.delete(`/posts/${postId}`);
  },
};
