import React from "react";
import ReactionButton from "./ReactionButton";
import ShareButton from "./ShareButton.jsx";

const ActionButtons = ({ post }) => {
  return (
    <>

    <ReactionButton postId={post.id} reacted_type={post.reaction_type} />
    <button className="flex-1 flex items-center justify-center p-2 hover:bg-gray-100">
        {/* Placeholder */}
        💬 Comment
    </button>
   <ShareButton postId={post.id} />
    </>
)
};
export default ActionButtons;
