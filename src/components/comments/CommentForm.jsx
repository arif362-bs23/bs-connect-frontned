import React, { useState } from "react";
import { useCreateComment } from "../../services/CommentService";

const CommentForm = ({ postId, parentId = null, onSuccess }) => {
    const [content, setContent] = useState("");
    const createCommentMutation = useCreateComment();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        createCommentMutation.mutate(
            { postId, parentId, content },
            {
                onSuccess: () => {
                    setContent("");
                    if (onSuccess) onSuccess();
                },
            }
        );
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
            <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={parentId ? "Write a reply..." : "Write a comment..."}
                className="flex-1 border rounded-lg px-3 py-2 text-sm"
            />
            <button
                type="submit"
                disabled={createCommentMutation.isLoading}
                className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm"
            >
                {createCommentMutation.isLoading ? "Commenting..." : "Comment"}
            </button>
        </form>
    );
};

export default CommentForm;
