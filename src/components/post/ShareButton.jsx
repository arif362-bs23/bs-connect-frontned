import React from "react";
import { useSharePost } from "../../services/PostService.js";
import { useAuth } from "../../hooks/useAuth.js";

const ShareButton = ({ postId }) => {
    const { mutate: sharePost, isPending } = useSharePost();
    const { auth } = useAuth();

    const handleShare = () => {
        if (isPending) return;
        sharePost({postId, auth});
    };

    return (
        <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center p-2 hover:bg-gray-100 transition-all"
            disabled={isPending}
        >
            🔄 {isPending ? "Sharing..." : "Share"}
        </button>
    );
};

export default ShareButton;
