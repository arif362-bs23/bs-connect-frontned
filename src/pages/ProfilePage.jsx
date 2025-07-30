import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import CoverImage from '../components/profile/CoverImage';
import ProfileImage from '../components/profile/ProfileImage';
import FollowButton from '../components/profile/FollowButton';
import ProfileNav from '../components/profile/ProfileNav';
import { getUserProfile } from '../services/ProfileService';
import { authService } from '../services/AuthService';

const ProfilePage = () => {
  const { userId } = useParams();

  const { data: user, isLoading, isError } = useQuery({
    queryKey: ['profile', userId],
    queryFn: () => getUserProfile(userId),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading profile.</div>;
  }

  const isOwnProfile = authService.isAuthenticated();

  const toggleFollow = () => {
    // Call API and update state
  };

  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto">
        <div className="relative w-full">
          <CoverImage src={user.cover_image} isOwner={isOwnProfile} userId={userId} lastUpdated={user.updated_at} />

          <div className="relative px-4 md:px-8 pb-4 flex flex-col md:flex-row items-center md:items-end">
            <ProfileImage src={user.profile_image} isOwner={isOwnProfile} userId={userId} lastUpdated={user.updated_at} />

            <div className="mt-20 md:mt-0 md:ml-44 text-center md:text-left flex-1">
              <h1 className="text-2xl md:text-3xl font-bold">{user.name}</h1>
              <p className="text-gray-600 text-sm md:text-base">
                {user.follower_count ? user.follower_count : 0} Followers | {user.following_count ? user.following_count : 0} Following
              </p>
            </div>

            <div className="flex mt-4 md:mt-0 space-x-2">
              <FollowButton
                isFollowing={user.is_followed}
                isOwnProfile={isOwnProfile}
                onToggleFollow={toggleFollow}
              />
            </div>
          </div>
        </div>

        <div className="px-4 md:px-8 pt-4 mt-4">
          <ProfileNav baseUrl={`/user/${userId}`} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
