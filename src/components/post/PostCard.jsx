import React from "react";
import { getRelativeTime } from "../../utility/getDiffTime.js";
import PostMedia from "./PostMedia.jsx";
import { useState } from "react";
import SharedPostWrapper from "./SharedPostWrapper.jsx";
import ReactionCount from "./ReactionCount.jsx";
import ActionButtons from "./ActionButtons.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import { useDeletePost } from "../../services/PostService.js";
import { useUpdatePost } from "../../services/PostService.js";

const PostCard = ({ post,  isOwnProfile=false}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editContent, setEditContent] = useState(post?.content || "");
  const [editPrivacy, setEditPrivacy] = useState(post?.privacy || "public");

  const { auth } = useAuth();
  const deletePostMutation = useDeletePost();
  const updatePostMutation = useUpdatePost();

  if (!post) return <div></div>;
  const user = post.user;
  const isOwner = isOwnProfile || (auth.user && auth.user.id === post.user.id);
  const isShared = !!post.original_post;
  const hasMedia = post.tagged_media?.length > 0;

  const maxLength = 200; // Adjust this value as needed
  const shouldTruncate = post.content && post.content.length > maxLength;

  const displayContent = shouldTruncate && !isExpanded
      ? post.content.substring(0, maxLength) + "..."
      : post.content;
  // Handle delete post
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePostMutation.mutate({ postId: post.id, auth });
    }
    setIsDropdownOpen(false);
  };
  // Handle edit post
  const handleEdit = () => {
    setEditContent(post.content || "");
    setEditPrivacy(post.privacy || "public");
    setIsEditModalOpen(true);
    setIsDropdownOpen(false);
  };

  // Handle save edit
  const handleSaveEdit = () => {
    const postData = {
      content: editContent,
      privacy: editPrivacy
    };

    updatePostMutation.mutate(
        { postId: post.id, postData, auth },
        {
          onSuccess: () => {
            setIsEditModalOpen(false);
          }
        }
    );
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditContent(post.content || "");
    setEditPrivacy(post.privacy || "public");
    setIsEditModalOpen(false);
  };

  // Close dropdown when clicking outside
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
      <>
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
          {isOwner && (
              <div className="relative">
                <button
                    onClick={handleDropdownToggle}
                    className="text-gray-500 hover:bg-gray-100 rounded-full p-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                       fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                      <div className="py-1">
                        <button
                            onClick={handleEdit}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            disabled={updatePostMutation.isPending}
                        >
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                            disabled={deletePostMutation.isPending}
                        >
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          {deletePostMutation.isPending ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </div>
                )}
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
      <div className="px-4 py-2 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <ReactionCount count={post.reaction_count} type={post.reaction_type} />
          <div className="flex gap-3">
            <a href={`/post/${post.id}`} className="hover:underline">
              {post.comment_count} comments
            </a>
          </div>
        </div>
      </div>

      {/* Like + Comment + Share Buttons */}
      <div className="flex border-t border-gray-100">
        <ActionButtons post={post} />
      </div>
    </div>

        {/* Edit Modal */}
        {isEditModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 sm:p-8 animate-fade-in">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Post</h2>

                {/* Content textarea */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                  </label>
                  <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 p-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      rows="5"
                      placeholder="What's on your mind?"
                  />
                </div>

                {/* Privacy selector */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Privacy
                  </label>
                  <select
                      value={editPrivacy}
                      onChange={(e) => setEditPrivacy(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 p-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="public">Public</option>
                    <option value="follower">Friends Only</option>
                    <option value="only_me">Private</option>
                  </select>
                </div>

                {/* Action buttons */}
                <div className="flex justify-end gap-3">
                  <button
                      onClick={handleCancelEdit}
                      className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                      disabled={updatePostMutation.isPending}
                  >
                    Cancel
                  </button>
                  <button
                      onClick={handleSaveEdit}
                      className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={updatePostMutation.isPending}
                  >
                    {updatePostMutation.isPending ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            </div>
        )}

      </>


  );
};

export default PostCard;
