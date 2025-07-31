import React from 'react';
import { Link } from 'react-router-dom';

const UserCard = ({ user, isFollowing, onFollowToggle }) => {
  const isCurrentUser = user?.is_current_user;

  return (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
      {/* Left: Profile image and info */}
      <div className="flex items-center space-x-3">
        <Link to={`/user/${user.id}`}>
          <img
            src={user.profile_image 
              ? `${import.meta.env.VITE_API_BASE_URL}/static/user/${user.profile_image}` 
              : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3B82F6&color=fff&size=48`
            }
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3B82F6&color=fff&size=48`;
            }}
          />
        </Link>
        <div>
          <h3 className="font-medium text-gray-900">
            <Link to={`/user/${user.id}`} className="hover:underline">
              {user.name}
            </Link>
          </h3>
          {user.email && (
            <p className="text-sm text-gray-500">{user.email}</p>
          )}
        </div>
      </div>

      {/* Right: Follow button */}
      {!isCurrentUser && (
        <button
          onClick={onFollowToggle}
          className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${
            isFollowing
              ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </button>
      )}
    </div>
  );
};

export default UserCard;