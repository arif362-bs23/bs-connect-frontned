import React from 'react';

const FollowButton = ({ isFollowing, isOwnProfile, onToggleFollow }) => {
  
  if (isOwnProfile) return null; // Don't show follow button for own profile

  return (
    <button
      onClick={onToggleFollow}
      className={`px-4 py-2 font-medium rounded-md text-white ${
        isFollowing ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
      }`}
    >
      {isFollowing ? 'Unfollow' : '+ Follow'}
    </button>
  );
};

export default FollowButton;
