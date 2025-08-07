import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {friendService} from "../../services/FriendService.js";
import {toast} from "react-toastify";
import { useAuth } from '../../hooks/useAuth.js';

const UserCard = ({ user, isFollowing: initialIsFollowing}) => {
    const { auth } = useAuth();
    const isCurrentUser = auth?.user?.id === user.id;
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

    const handleFollowToggle = async () => {
        if (!auth.token) {
            toast.error("You must be logged in to follow users.");
            return;
        }

        try {
            await friendService.toggleFollow(user.id);
            setIsFollowing(!isFollowing);
            toast.success(isFollowing ? `Unfollowed ${user.name}` : `Followed ${user.name}`);
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        }
    };


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
          onClick={handleFollowToggle}
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