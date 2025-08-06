import React, { useState, useRef, useEffect } from "react";
import { useReactToPost } from "../../services/PostService.js";
import { useAuth } from "../../hooks/useAuth.js";

const reactions = {
    like: "👍",
    love: "❤️",
    haha: "😂",
    wow: "😮",
    angry: "😠",
};

const ReactionButton = ({ postId, reacted_type }) => {
    const [hovered, setHovered] = useState(false);
    const containerRef = useRef(null);
    const { mutate: reactToPost } = useReactToPost();
    const { auth } = useAuth();

    const handleReact = (type) => {
        reactToPost({ postId, reactionType: type, auth });
        setHovered(false);
    };

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = (e) => {
        // Check if mouse is moving to the popup or staying within container
        const rect = containerRef.current.getBoundingClientRect();
        const { clientX, clientY } = e;

        // Add small delay to allow mouse to reach popup
        setTimeout(() => {
            if (containerRef.current && !containerRef.current.matches(':hover')) {
                setHovered(false);
            }
        }, 100);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setHovered(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div
            ref={containerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative flex-1 flex items-center justify-center p-2 hover:bg-gray-100 transition-all"
        >
            <button className="text-sm font-medium flex items-center gap-1">
                {reacted_type ? (
                    <>
                        <span className="text-lg">{reactions[reacted_type] || "👍"}</span>
                        <span className="text-gray-800">{reacted_type}</span>
                    </>
                ) : (
                    <span className="text-gray-600">Like</span>
                )}
            </button>

            {hovered && (
                <div
                    className="absolute bottom-full mb-2 flex gap-2 bg-white p-2 rounded-xl shadow-xl z-10"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {Object.entries(reactions).map(([type, icon]) => (
                        <button
                            key={type}
                            onClick={() => handleReact(type)}
                            className="hover:scale-125 transition-transform text-lg"
                            title={type}
                        >
                            {icon}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReactionButton;