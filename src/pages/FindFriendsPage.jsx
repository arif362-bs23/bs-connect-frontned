import React, { useState, useEffect } from 'react';
import UserCard from '../components/profile/UserCard';
import { friendService } from '../services/FriendService';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';

const FindFriendsPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await friendService.findFriends();
        setUsers(response || []);
      } catch (err) {
        setError('Failed to fetch users. Please try again later.');
        toast.error('Failed to fetch users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  console.log(users);
  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Find Friends</h1>
      {users.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map((user) => (
            <UserCard key={user.id} user={user} isFollowing={user.is_following} />
          ))}
        </div>
      ) : (
        <div className="text-center mt-8 text-gray-500">
          <p>No users found.</p>
          <p className="mt-2">Check back later or try refining your search.</p>
        </div>
      )}
    </div>
  );
};

export default FindFriendsPage;
