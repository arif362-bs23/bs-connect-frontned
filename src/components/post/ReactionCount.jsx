import React from "react";

const ReactionCount = ({ count, type }) => {
    const reactionIcons = {
        like: "👍",
        love: "❤️",
        laugh: "😂",
        wow: "😮",
        sad: "😢",
        angry: "😡"
    };

    const icon = reactionIcons[type] || "👍";

    return (
        <div className="flex items-center gap-1">
        <span className="text-gray-600">{icon}</span>
        <span className="text-gray-800 font-medium">{count}</span>
        </div>
    );
}

export default ReactionCount;