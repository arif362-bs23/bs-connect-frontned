import React from "react";
import { getRelativeTime } from "../../utility/getDiffTime.js";
import PostMedia from "./PostMedia.jsx";
import { useState } from "react";
import SharedPostWrapper from "./SharedPostWrapper.jsx";

const PostCard = ({ post,  isOwnProfile }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!post) return <div></div>;
  const user = post.user;
  const isOwner = isOwnProfile || (user && user.id === post.user_id);
  const isShared = !!post.original_post;
  const hasMedia = post.tagged_media?.length > 0;

  const maxLength = 200; // Adjust this value as needed
  const shouldTruncate = post.content && post.content.length > maxLength;

  const displayContent = shouldTruncate && !isExpanded
      ? post.content.substring(0, maxLength) + "..."
      : post.content;

  return (
    <div className="bg-white rounded-lg border shadow-sm mb-4 overflow-hidden">
      <div className="p-4">
        {/* Header: Profile image + name + date + dropdown */}
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                  src={`${import.meta.env.VITE_API_BASE_URL}/static/user/${user.profile_image}`}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
            <a href={`/user/${user.id}`} className="cursor-pointer">
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-xs text-gray-500">
                {getRelativeTime(post.created_at)}
              </p>
            </a>
          </div>

          {/* Dropdown trigger (show only if owned) */}
          {/* Replace isOwner with auth check */}
          {isOwner && (
            <div className="relative">
              <button className="text-gray-500 hover:bg-gray-100 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                </svg>
              </button>
              {/* Optional dropdown */}
              {/* You'll need to handle dropdown visibility in future */}
            </div>
          )}
        </div>

        {/* Post content */}
        {post.content && (
            <div className="mt-2 text-gray-800">
              <div className="whitespace-pre-wrap">{displayContent}</div>
              {shouldTruncate && (
                  <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-1"
                  >
                    {isExpanded ? "See less" : "Read more"}
                  </button>
              )}
            </div>
        )}
      </div>

      {/* Media */}
      {hasMedia && (
        <div className="px-4 py-2">
          <PostMedia media={post.tagged_media} />
        </div>
      )}

      {/* Shared Post */}
      {isShared && (
        <div className="px-4 py-2 border-t border-gray-100">
          <SharedPostWrapper post={post.original_post} />
        </div>
      )}

      {/* Reaction, comment, share counts */}
      {/* <div className="px-4 py-2 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <ReactionCount count={post.reaction_count} type={post.reaction_type} />
          <div className="flex gap-3">
            <a href={`/post/${post.id}`} className="hover:underline">
              {post.comment_count} comments
            </a>
            <div>{post.share_count} shares</div>
          </div>
        </div>
      </div> */}

      {/* Like + Comment + Share Buttons */}
      {/* <div className="flex border-t border-gray-100">
        <ActionButtons post={post} />
      </div> */}
    </div>
  );
};

export default PostCard;
