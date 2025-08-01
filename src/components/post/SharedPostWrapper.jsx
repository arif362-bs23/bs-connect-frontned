import React from "react";
import PostMedia from "./PostMedia";
import {getRelativeTime} from "../../utility/getDiffTime.js";

const SharedPostWrapper = ({ post }) => {
    if (!post) return null;



    const user = post.user;

    return (
        <div className="border rounded-md bg-gray-50 p-4 mt-2">
            {/* Header: Shared post owner info */}
            <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img
                        src={`${import.meta.env.VITE_API_BASE_URL}/static/${user.profile_image}`}
                        alt={user.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <h4 className="text-sm font-semibold text-gray-800">{user.name}</h4>
                    <p className="text-xs text-gray-500">{getRelativeTime(post.created_at)}</p>
                </div>
            </div>

            {/* Content */}
            {post.content && (
                <div className="text-sm text-gray-700 whitespace-pre-line mb-3">
                    {post.content.length > 500 ? (
                        <p>
                            {post.content.slice(0, 500)}...
                            <span className="text-blue-600 cursor-pointer hover:underline ml-1">
                See more
              </span>
                        </p>
                    ) : (
                        post.content
                    )}
                </div>
            )}

            {/* Media */}
            {post.tagged_media?.length > 0 && (
                <PostMedia media={post.tagged_media} />
            )}
        </div>
    );
};

export default SharedPostWrapper;
