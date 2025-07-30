import React from 'react';
import { useParams } from 'react-router-dom';
import CoverImage from '../components/profile/CoverImage';
import ProfileImage from '../components/profile/ProfileImage';
import FollowButton from '../components/profile/FollowButton';
import ProfileNav from '../components/profile/ProfileNav';
import { useAuth } from '../hooks/useAuth';

const ProfilePage = () => {
  const { username } = useParams();
  const { user: authUser } = useAuth();

  const user = {
    id: 2,
    name: 'John Doe',
    profileImage: '/profile.jpg',
    coverImage: '/cover.jpg',
    followersCount: 123,
    followingCount: 456,
  };

  const isOwnProfile = user.id === authUser?.id;
  const isFollowing = false; // Replace with real check from backend

  const toggleFollow = () => {
    // Call API and update state
  };

  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto">
        <div className="relative w-full">
          <CoverImage src={user.coverImage} isOwner={isOwnProfile} />

          <div className="relative px-4 md:px-8 pb-4 flex flex-col md:flex-row items-center md:items-end">
            <ProfileImage src={user.profileImage} isOwner={isOwnProfile} />

            <div className="mt-20 md:mt-0 md:ml-44 text-center md:text-left flex-1">
              <h1 className="text-2xl md:text-3xl font-bold">{user.name}</h1>
              <p className="text-gray-600 text-sm md:text-base">
                {user.followersCount} Followers | {user.followingCount} Following
              </p>
            </div>

            <div className="flex mt-4 md:mt-0 space-x-2">
              <FollowButton
                isFollowing={isFollowing}
                isOwnProfile={isOwnProfile}
                onToggleFollow={toggleFollow}
              />
            </div>
          </div>
        </div>

        <div className="px-4 md:px-8 pt-4 mt-4">
          <ProfileNav baseUrl={`/profile/${username}`} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
