import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserProfile } from '../../services/ProfileService';

const Bio = ({ user }) => {
  const { auth, updateUser } = useAuth();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    bio: '',
    birthdate: '',
    gender: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        bio: user.bio || '',
        birthdate: user.birthdate || '',
        gender: user.gender || '',
      });
    }
  }, [user]);

  const isOwnProfile = auth?.user?.id === user?.id;

  const mutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (updatedProfile) => {
      updateUser(updatedProfile);
      queryClient.invalidateQueries(['profile', user.id]);
      setIsEditing(false);
    },
    onError: (error) => {
      console.error('Failed to update profile:', error);
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm mb-4">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Bio</h2>
          {isOwnProfile && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-gray-500 hover:bg-gray-100 p-2 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
            </div>
          )}
        </div>

        {isEditing && isOwnProfile ? (
          <div className="mb-6">
            <form onSubmit={handleSubmit}>
              <textarea
                name="bio"
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Enter your bio here..."
                value={formData.bio}
                onChange={handleInputChange}
              ></textarea>

              <div className="mt-4">
                <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="birthdate"
                  id="birthdate"
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={formData.birthdate}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mt-4">
                <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900">
                  Gender
                </label>
                <select
                  name="gender"
                  id="gender"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Choose a Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <button
                type="submit"
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                disabled={mutation.isLoading}
              >
                {mutation.isLoading ? 'Saving...' : 'Save'}
              </button>
            </form>
          </div>
        ) : (
          <div>
            <p className="text-center mb-4 text-gray-700">{user?.bio || 'No bio yet.'}</p>
            <div className="text-sm text-gray-800 mb-1">Gender: {user?.gender || 'Not specified'}</div>
            <div className="text-sm text-gray-800">Birthday: {user?.birthdate || 'Not specified'}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bio;