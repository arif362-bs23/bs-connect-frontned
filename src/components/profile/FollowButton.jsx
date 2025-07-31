import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { friendService } from '../../services/FriendService';
import { paths } from '../../routes/path';

const FollowButton = ({ isFollowing, isOwnProfile, userId }) => {
  const { auth } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => friendService.toggleFollow(userId),
    onSuccess: () => {
      // Invalidate and refetch the profile data to update the follow status
      queryClient.invalidateQueries({ queryKey: ['profile', userId] });
      toast.success(isFollowing ? 'Unfollowed successfully!' : 'Followed successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.detail || 'An error occurred. Please try again.');
    },
  });

  const handleFollowClick = () => {
    if (!auth.token) {
      toast.info(
        <div>
          You must be logged in to interact.
          <Link to={paths.LOGIN} className="font-bold text-blue-600 hover:underline ml-1">
            Login here
          </Link>
        </div>
      );
      return;
    }
    mutation.mutate();
  };

  if (isOwnProfile) {
    return null; // Don't show follow button on your own profile
  }

  return (
    <button
      onClick={handleFollowClick}
      disabled={mutation.isPending}
      className={`px-4 py-2 font-medium rounded-md text-white transition-colors duration-200 ${
        isFollowing
          ? 'bg-red-600 hover:bg-red-700'
          : 'bg-blue-600 hover:bg-blue-700'
      } disabled:bg-gray-400 disabled:cursor-not-allowed`}
    >
      {mutation.isPending
        ? 'Loading...'
        : isFollowing
        ? 'Unfollow'
        : '+ Follow'}
    </button>
  );
};

export default FollowButton;