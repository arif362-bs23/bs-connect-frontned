import React, { useState } from "react";
import CommentForm from "./CommentForm";
import { useDeleteComment } from "../../services/CommentService";

const CommentItem = ({ comment, currentUserId, postId }) => {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const deleteCommentMutation = useDeleteComment();

    const handleDelete = (commentId) => {
        if (window.confirm("Delete this comment?")) {
            deleteCommentMutation.mutate({ commentId, postId });
        }
    };

    return (
        <div className="mb-4">
            {/* Parent Comment */}
            <div className="flex items-start gap-3">
                <img
                    src={`${import.meta.env.VITE_API_BASE_URL}/static/user/${comment.user.profile_image}`}
                    alt={comment.user.name}
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div className="bg-gray-100 p-3 rounded-lg flex-1">
                    <div className="flex justify-between">
                        <span className="font-semibold">{comment.user.name}</span>
                        {comment.user.id === currentUserId && (
                            <button
                                onClick={() => handleDelete(comment.id)}
                                className="text-red-500 text-sm"
                                disabled={deleteCommentMutation.isLoading}
                            >
                                {deleteCommentMutation.isLoading ? "Deleting..." : "Delete"}
                            </button>
                        )}
                    </div>
                    <p>{comment.content}</p>
                    <div className="text-xs text-gray-500 mt-1">
                        {new Date(comment.created_at).toLocaleString()}
                    </div>
                    <button
                        onClick={() => setShowReplyForm((prev) => !prev)}
                        className="text-blue-500 text-sm mt-1"
                    >
                        Reply
                    </button>
                </div>
            </div>

            {/* Reply Form */}
            {showReplyForm && (
                <div className="ml-14 mt-2">
                    <CommentForm
                        postId={postId}
                        parentId={comment.id}
                        onSuccess={() => {
                            setShowReplyForm(false);
                        }}
                    />
                </div>
            )}

            {/* Replies */}
            {comment.replies?.length > 0 && (
                <div className="ml-14 mt-2 space-y-3">
                    {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex gap-3">
                            <img
                                src={reply.user.profile_image}
                                alt={reply.user.name}
                                className="w-8 h-8 rounded-full object-cover"
                            />
                            <div className="bg-gray-50 p-2 rounded-lg flex-1">
                                <div className="flex justify-between">
                                    <span className="font-semibold">{reply.user.name}</span>
                                    {reply.user.id === currentUserId && (
                                        <button
                                            onClick={() => handleDelete(reply.id)}
                                            className="text-red-500 text-xs"
                                            disabled={deleteCommentMutation.isLoading}
                                        >
                                            {deleteCommentMutation.isLoading ? "Deleting..." : "Delete"}
                                        </button>
                                    )}
                                </div>
                                <p>{reply.content}</p>
                                <div className="text-xs text-gray-500 mt-1">
                                    {new Date(reply.created_at).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentItem;
