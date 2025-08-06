import api from '../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "react-toastify";

export const useCreateComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ postId, parentId, content }) => {
            const url = parentId
                ? `/posts/${postId}/comment/${parentId}`
                : `/posts/${postId}/comment`;

            const formData = new FormData();
            formData.append('content', content);

            const res = await api.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return res.data;
        },
        onSuccess: (_, { postId }) => {
            toast.success("Comment posted successfully!");
            queryClient.invalidateQueries(['post', postId]);
            queryClient.invalidateQueries(['posts']);
        },
        onError: (error) => {
            console.error("Commenting failed:", error);
            toast.error(error?.response?.data?.error || "Failed to post comment.");
        },
    });
};

export const useDeleteComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ commentId }) => {
            return api.delete(`/posts/comment/${commentId}/delete`);
        },
        onSuccess: (data, variables) => {
            toast.success("Comment deleted successfully!");
            queryClient.invalidateQueries(['post', variables.postId]);
            queryClient.invalidateQueries(['posts']);
        },
        onError: (error) => {
            console.error("Deleting comment failed:", error);
            toast.error(error?.response?.data?.error || "Failed to delete comment.");
        },
    });
};

export const getAllCommentsByPostId = async (postId) => {
    const response = await api.get(`/posts/${postId.queryKey[1]}/comments`);
    return response.data;
};
