import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { friendService } from '../../services/FriendService.js';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth.js';

const UserCard = ({ user, isFollowing: initialIsFollowing }) => {
    const { auth } = useAuth();
    const isCurrentUser = auth?.user?.id === user.id;
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleFollowToggle = async () => {
        if (!auth.token) {
            toast.error('Authentication required to follow users.');
            return;
        }

        if (isProcessing) return;

        setIsProcessing(true);

        try {
            await friendService.toggleFollow(user.id);
            setIsFollowing(prevState => !prevState);

            const action = isFollowing ? 'Unfollowed' : 'Now following';
            toast.success(`${action} ${user.name}`);
        } catch (error) {
            console.error('Follow toggle error:', error);
            toast.error('Unable to process request. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    const getAvatarUrl = (profileImage, userName) => {
        if (profileImage) {
            return `${import.meta.env.VITE_API_BASE_URL}/static/user/${profileImage}`;
        }

        const encodedName = encodeURIComponent(userName || 'User');
        return `https://ui-avatars.com/api/?name=${encodedName}&background=0F172A&color=F8FAFC&size=56&bold=true`;
    };

    const handleImageError = (event) => {
        const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=0F172A&color=F8FAFC&size=56&bold=true`;
        event.target.src = fallbackUrl;
    };

    return (
        <article className="group relative bg-white border border-slate-200 rounded-xl p-5 transition-all duration-200 hover:border-slate-300 hover:shadow-lg hover:-translate-y-0.5">
            <div className="flex items-center justify-between">
                {/* User Information Section */}
                <div className="flex items-center space-x-4 flex-1 min-w-0">
                    <Link
                        to={`/user/${user.id}`}
                        className="relative flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full"
                        aria-label={`View ${user.name}'s profile`}
                    >
                        <div className="relative">
                            <img
                                src={getAvatarUrl(user.profile_image, user.name)}
                                alt=""
                                className="w-14 h-14 rounded-full object-cover ring-2 ring-slate-100 transition-all duration-200 group-hover:ring-slate-200"
                                onError={handleImageError}
                                loading="lazy"
                            />
                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent to-white/10 pointer-events-none" />
                        </div>
                    </Link>

                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col space-y-1">
                            <Link
                                to={`/user/${user.id}`}
                                className="text-slate-900 font-semibold text-lg leading-tight hover:text-blue-600 transition-colors duration-150 focus:outline-none focus:text-blue-600 block"
                                title={user.name}
                            >
                                <span className="truncate max-w-full inline-block">{user.name}</span>
                            </Link>
                            {user.email && (
                                <p className="text-slate-500 text-sm truncate font-medium">
                                    {user.email}
                                </p>
                            )}
                            {user.follower_count !== undefined && (
                                <p className="text-slate-400 text-xs font-medium">
                                    {user.follower_count} {user.follower_count === 1 ? 'follower' : 'followers'}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Action Section */}
                {!isCurrentUser && (
                    <div className="flex-shrink-0 ml-4">
                        <button
                            onClick={handleFollowToggle}
                            disabled={isProcessing}
                            className={`
                relative px-5 py-2.5 text-sm font-semibold rounded-lg 
                transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
                disabled:opacity-75 disabled:cursor-not-allowed
                ${isFollowing
                                ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-slate-400 border border-slate-300'
                                : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm hover:shadow-md'
                            }
              `}
                            aria-label={`${isFollowing ? 'Unfollow' : 'Follow'} ${user.name}`}
                        >
                            {isProcessing ? (
                                <span className="flex items-center space-x-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Processing...</span>
                </span>
                            ) : (
                                <>
                                    {isFollowing ? (
                                        <span className="flex items-center space-x-1.5">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Following</span>
                    </span>
                                    ) : (
                                        <span className="flex items-center space-x-1.5">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                      <span>Follow</span>
                    </span>
                                    )}
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>

            {/* Subtle gradient overlay for premium feel */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-transparent to-slate-50/20 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </article>
    );
};

export default UserCard;