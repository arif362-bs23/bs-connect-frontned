import api from '../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {toast} from "react-toastify";

// React to a post
export const useReactToPost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ postId, reactionType }) => {
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
            console.error("Reacting to post failed:", err);
        },
    });
};

export const useSharePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (postId) => {
            const res = await api.post(`/posts/${postId}/share`);
            return res.data;
        },
        onSuccess: (_, postId) => {
            toast.success("Post shared successfully!");
            queryClient.invalidateQueries(['post', postId]);
        },
        onError: (error) => {
            console.error("Sharing failed:", error);
            alert(error?.response?.data?.message || "Failed to share post.");
        },
    });
};
