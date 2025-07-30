import React, { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadProfileImage } from '../../services/ProfileService';
import { toast } from 'react-toastify';

const ProfileImage = ({ src, isOwner, userId, lastUpdated }) => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);

  const mutation = useMutation({
    mutationFn: uploadProfileImage,
    onSuccess: () => {
      toast.success('Profile image updated successfully!');
      queryClient.invalidateQueries(['profile', userId]);
    },
    onError: () => {
      toast.error('Failed to update profile image.');
    },
  });

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      mutation.mutate(file);
    }
  };

  const imageUrl = src
    ? `${import.meta.env.VITE_API_BASE_URL}/static/user/${src.replace(/^\//, '')}?t=${new Date(lastUpdated).getTime()}`
    : null;

  return (
    <div className="absolute -bottom-16 md:-bottom-10 left-4 md:left-8">
      <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white shadow-lg relative">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
            No Profile Image
          </div>
        )}
        {isOwner && (
          <>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
            <button
              onClick={handleButtonClick}
              className="absolute bottom-2 right-2 w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition duration-200"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileImage;