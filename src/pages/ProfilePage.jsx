import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import CoverImage from "../components/profile/CoverImage";
import ProfileImage from "../components/profile/ProfileImage";
import FollowButton from "../components/profile/FollowButton";
import ProfileNav from "../components/profile/ProfileNav";
import { getUserProfile, getFollowers, getFollowing, getUserPosts} from "../services/ProfileService";
import Bio from "../components/profile/Bio";
import { useLocation } from "react-router-dom";
import UserCard from "../components/profile/UserCard";
import { useAuth } from "../hooks/useAuth";
import PostCard from "../components/post/PostCard";

const ProfilePage = () => {
  const { userId } = useParams();
  const { search } = useLocation();
  const { auth } = useAuth();
  const currentTab = new URLSearchParams(search).get("tab") || "posts";

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getUserProfile(userId),
  });

  const {
    data: followersData,
    isLoading: isFollowersLoading,
  } = useQuery({
    queryKey: ["followers", userId],
    queryFn: () => getFollowers(userId),
    enabled: currentTab === "followers",
  });

  const {
    data: followingData,
    isLoading: isFollowingLoading,
  } = useQuery({
    queryKey: ["following", userId],
    queryFn: () => getFollowing(userId),
    enabled: currentTab === "following",
  });

  const {
    data: userPosts,
    isLoading: isPostsLoading,
  } = useQuery({
    queryKey: ["userPosts", userId],
    queryFn: () => getUserPosts(userId),
    enabled: currentTab === "posts",
  });


  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">Error loading profile.</div>
      </div>
    );
  }


  const isOwnProfile = auth?.user?.id === user?.id;

  const renderTabContent = () => {
    switch (currentTab) {
      case 'followers':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Followers</h2>
            {isFollowersLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : followersData?.length > 0 ? (
              followersData.map((follower) => (
                <UserCard key={follower.id} user={follower} isFollowing={follower.is_followed} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No followers yet.
              </div>
            )}
          </div>
        );

      case 'following':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Following</h2>
            {isFollowingLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : followingData?.length > 0 ? (
              followingData.map((followingUser) => (
                <UserCard key={followingUser.id} user={followingUser} isFollowing={followingUser.is_followed} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                Not following anyone yet.
              </div>
            )}
          </div>
        );

      case 'posts': 
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Posts</h2>
            {isPostsLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : userPosts?.length > 0 ? (
              userPosts.map((post) => (
                <PostCard key={post.id} post={post} isOwnProfile={isOwnProfile} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No posts available.
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="text-center text-gray-500 py-12">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No content available
            </h3>
            <p className="text-gray-500">
              Please select a different tab to view content.
            </p>
          </div>
        );
    }
  };

  return (
    <>
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto">
          <div className="relative w-full">
            <CoverImage
              src={user.cover_image}
              isOwner={isOwnProfile}
              userId={userId}
              lastUpdated={user.updated_at}
            />

            <div className="relative px-4 md:px-8 pb-4 flex flex-col md:flex-row items-center md:items-end">
              <ProfileImage
                src={user.profile_image}
                isOwner={isOwnProfile}
                userId={userId}
                lastUpdated={user.updated_at}
              />

              <div className="mt-20 md:mt-0 md:ml-44 text-center md:text-left flex-1">
                <h1 className="text-2xl md:text-3xl font-bold">{user.name}</h1>
                <p className="text-gray-600 text-sm md:text-base">
                  {user.followers_count || 0} Followers |{" "}
                  {user.following_count || 0} Following
                </p>
              </div>

              <div className="flex mt-4 md:mt-0 space-x-2">
                <FollowButton
                  isFollowing={user.is_followed}
                  isOwnProfile={isOwnProfile}
                  userId={userId}
                />
              </div>
            </div>
          </div>

          <div className="px-4 md:px-8 pt-4 mt-4">
            <ProfileNav baseUrl={`/user/${userId}`} />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="hidden lg:block">
            <Bio user={user} isOwnProfile={isOwnProfile} />
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;