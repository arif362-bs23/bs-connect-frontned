import api from '../api';
export const reactToPost = (postId, type) => {
    return api.post(`/posts/${postId}/reaction/${type}`);
};