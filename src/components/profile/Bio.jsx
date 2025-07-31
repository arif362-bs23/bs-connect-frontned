import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBio } from '../../services/ProfileService';

const Bio = ({ user, userId }) => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    bio: user?.bio || '',
    birthdate: user?.birthdate || '',
    gender: user?.gender || '',
  });

  // Add mutation for updating bio
  const updateBioMutation = useMutation({
    mutationFn: updateBio,
    onSuccess: (data) => {
      setIsEditing(false);
      toast.success('Profile updated successfully');
      queryClient.invalidateQueries(['profile', userId]);

      queryClient.setQueryData(['profile', userId], (oldData) => ({
        ...oldData,
        bio: formData.bio,
        birthdate: formData.birthdate,
        gender: formData.gender,
      }));
    },
    onError: (error) => {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateBioMutation.mutate(formData);
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm mb-4">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Bio</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-gray-500 hover:bg-gray-100 p-2 rounded-full transition duration-200"
              disabled={updateBioMutation.isPending}
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
        </div>

        {isEditing ? (
          <div className="mb-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  id="bio"
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell us about yourself..."
                  value={formData.bio}
                  onChange={handleInputChange}
                  disabled={updateBioMutation.isPending}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="birthdate"
                  id="birthdate"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.birthdate}
                  onChange={handleInputChange}
                  disabled={updateBioMutation.isPending}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  id="gender"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.gender}
                  onChange={handleInputChange}
                  disabled={updateBioMutation.isPending}
                >
                  <option value="">Choose a Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={updateBioMutation.isPending}
                  className="bg-blue-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {updateBioMutation.isPending ? 'Saving...' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      bio: user?.bio || '',
                      birthdate: user?.birthdate || '',
                      gender: user?.gender || '',
                    });
                  }}
                  disabled={updateBioMutation.isPending}
                  className="border border-gray-300 text-gray-700 py-2 px-6 rounded-lg font-medium hover:bg-gray-50 transition duration-200 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <p className="text-gray-700 leading-relaxed">
                {user?.bio || 'No bio added yet.'}
              </p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-gray-600">
                <span className="font-medium mr-2">Gender:</span>
                <span>{user?.gender || 'Not specified'}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="font-medium mr-2">Birthday:</span>
                <span>{user?.birthdate || 'Not specified'}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bio;