import React from "react";
import {useParams} from "react-router-dom";
import PostCard from "../components/post/PostCard.jsx";
import {useQuery} from "@tanstack/react-query";
import {getPostById} from "../services/PostService.js";
import {useAuth} from "../hooks/useAuth.js";
import CommentList from "../components/comments/CommentList.jsx";
import CommentForm from "../components/comments/CommentForm.jsx";

const PostPage = () => {
    const { auth } = useAuth();
    const { postId } = useParams();

    const {
        data: post,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['post', postId],
        queryFn: getPostById,
        enabled: !!postId,
        refetchOnWindowFocus: false,
        retry: false,
        onError: (error) => {
            console.error("Error fetching post:", error);
        },
    });

    if (!postId) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <div className="text-center text-red-500 text-lg font-medium">Post ID is missing.</div>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                        <span className="text-gray-700 font-medium">Loading post...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <div className="text-center text-red-500 text-lg font-medium">Error fetching post.</div>
                </div>
            </div>
        );
    }

    const isOwnProfile = auth?.user?.id === post?.user?.id;

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-10">
                <div className="max-w-4xl mx-auto space-y-8">

                    {/* Post Card Section */}
                    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <PostCard isOwnProfile={isOwnProfile} post={post} />
                    </div>

                    {/* Comments Section */}
                    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">

                        {/* Header */}
                        <div className="border-b border-gray-100 px-6 py-4 bg-gray-50">
                            <h3 className="text-lg font-semibold text-gray-900">💬 Comments</h3>
                            <p className="text-sm text-gray-500">Share your thoughts below</p>
                        </div>

                        {/* Comment Form */}
                        <div className="p-6 bg-white">
                            <CommentForm postId={postId} />
                        </div>

                        {/* Comment List */}
                        <div className="border-t border-gray-100 bg-gray-50 p-6">
                            <CommentList postId={postId} currentUserId={auth?.user?.id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default PostPage;