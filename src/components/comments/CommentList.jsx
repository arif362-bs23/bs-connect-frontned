import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllCommentsByPostId } from "../../services/CommentService";
import CommentItem from "./CommentItem";

const CommentList = ({ postId, currentUserId }) => {
    const { data: comments, isLoading, isError } = useQuery({
        queryKey: ["comments", postId],
        queryFn: getAllCommentsByPostId,
        refetchOnWindowFocus: false
    });

    if (isLoading) return <p className="text-gray-500">Loading comments...</p>;
    if (isError) return <p className="text-red-500">No comments found</p>;

    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Comments</h3>
            {comments.length === 0 ? (
                <p className="text-gray-500">No comments yet.</p>
            ) : (
                comments.map((comment) => (
                    <CommentItem
                        key={comment.id}
                        comment={comment}
                        currentUserId={currentUserId}
                        postId={postId}
                    />
                ))
            )}
        </div>
    );
};

export default CommentList;
