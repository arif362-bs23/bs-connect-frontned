import api from '../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {toast} from "react-toastify";
import React from "react";

export const useCreatePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ postData, auth }) => {
            if (!auth.token) {
                toast.info(
                    React.createElement('div', null,
                        'You must be logged in to create a post. ',
                        React.createElement('a', { href: '/login', className: 'font-bold text-blue-600 hover:underline ml-1' }, 'Login here')
                    )
                );
                return Promise.reject(new Error("User not authenticated"));
            }

            // Create FormData for file uploads
            const formData = new FormData();
            if (postData.content) {
                formData.append('content', postData.content);
            }
            formData.append('privacy', postData.privacy);

            // Append media files if they exist
            if (postData.mediaFiles && postData.mediaFiles.length > 0) {
                postData.mediaFiles.forEach((file) => {
                    formData.append('media_files', file);
                });
            }

            const res = await api.post('/posts/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return res.data;
        },
        onSuccess: () => {
            toast.success("Post created successfully!");
            // Invalidate posts queries to refetch updated data
            queryClient.invalidateQueries(['posts']);
        },
        onError: (error) => {
            if (error.message !== "User not authenticated") {
                console.error("Creating post failed:", error);
                toast.error(error?.response?.data?.message || "Failed to create post.");
            }
        },
    });
};

// React to a post
export const useReactToPost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ postId, reactionType, auth }) => {
            if (!auth.token) {
                toast.info(
                    React.createElement('div', null,
                        'You must be logged in to react. ',
                        React.createElement('a', { href: '/login', className: 'font-bold text-blue-600 hover:underline ml-1' }, 'Login here')
                    )
                );
                return Promise.reject(new Error("User not authenticated"));
            }
            // Add an empty object as the request body, as some backends require it for POST requests.
            const res = await api.post(`/posts/${postId}/reaction/${reactionType}`, {});
            return res.data;
        },
        onSuccess: (_, { postId }) => {
            // Invalidate queries for the specific post and for post lists to refetch updated data.
            queryClient.invalidateQueries(['post', postId]);
            queryClient.invalidateQueries(['posts']);
        },
        onError: (err) => {
            if (err.message !== "User not authenticated") {
                console.error("Reacting to post failed:", err);
            }
        },
    });
};

export const useSharePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({postId, auth}) => {
            if (!auth.token) {
                toast.info(
                    React.createElement('div', null,
                        'You must be logged in to share. ',
                        React.createElement('a', { href: '/login', className: 'font-bold text-blue-600 hover:underline ml-1' }, 'Login here')
                    )
                );
                return Promise.reject(new Error("User not authenticated"));
            }
            const res = await api.post(`/posts/${postId}/share`);
            return res.data;
        },
        onSuccess: (_, {postId}) => {
            toast.success("Post shared successfully!");
            queryClient.invalidateQueries(['post', postId]);
        },
        onError: (error) => {
            if (error.message !== "User not authenticated") {
                console.error("Sharing failed:", error);
                toast(error?.response?.data?.message || "Failed to share post.");
            }
        },
    });
};

export const getPostById = async (postId) => {
    const response = await api.get(`/posts/${postId.queryKey[1]}`);
    return response.data;
};

export const useUpdatePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ postId, postData, auth }) => {
            if (!auth.token) {
                toast.info(
                    React.createElement('div', null,
                        'You must be logged in to edit a post. ',
                        React.createElement('a', { href: '/login', className: 'font-bold text-blue-600 hover:underline ml-1' }, 'Login here')
                    )
                );
                return Promise.reject(new Error("User not authenticated"));
            }
            const res = await api.put(`/posts/${postId}/edit`, postData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return res.data;
        },
        onSuccess: (_, { postId }) => {
            toast.success("Post updated successfully!");
            queryClient.invalidateQueries(['post', postId]);
            queryClient.invalidateQueries(['posts']);
        },
        onError: (error) => {
            if (error.message !== "User not authenticated") {
                console.error("Updating post failed:", error);
                toast.error(error?.response?.data?.message || "Failed to update post.");
            }
        },
    });
}

export const useDeletePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ postId, auth }) => {
            if (!auth.token) {
                toast.info(
                    React.createElement('div', null,
                        'You must be logged in to delete a post. ',
                        React.createElement('a', { href: '/login', className: 'font-bold text-blue-600 hover:underline ml-1' }, 'Login here')
                    )
                );
                return Promise.reject(new Error("User not authenticated"));
            }

            const res = await api.delete(`/posts/${postId}`);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Post deleted successfully!");
            queryClient.invalidateQueries(['posts']);
        },
        onError: (error) => {
            if (error.message !== "User not authenticated") {
                console.error("Deleting post failed:", error);
                toast.error(error?.response?.data?.message || "Failed to delete post.");
            }
        },
    });
}
