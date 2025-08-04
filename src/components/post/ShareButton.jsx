import React from "react";
import { useSharePost } from "../../services/PostService.js";

const ShareButton = ({ postId }) => {
    const { mutate: sharePost, isLoading } = useSharePost();

    const handleShare = () => {
        if (isLoading) return;
        sharePost(postId);
    };

    return (
        <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center p-2 hover:bg-gray-100 transition-all"
            disabled={isLoading}
        >
            🔄 {isLoading ? "Sharing..." : "Share"}
        </button>
    );
};

export default ShareButton;
