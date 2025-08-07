import React, { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadProfileImage } from '../../services/ProfileService';
import { toast } from 'react-toastify';

const ProfileImage = ({
                        src,
                        image, // alternative prop name for consistency
                        isOwner = false,
                        userId,
                        lastUpdated,
                        className = "",
                        size = "large" // "small", "medium", "large"
                      }) => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);

  // Use either src or image prop
  const imageSrc = src || image;

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

  // Size configurations
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-16 h-16",
    large: "w-32 h-32 md:w-36 md:h-36"
  };

  const editButtonSizes = {
    small: "w-4 h-4",
    medium: "w-6 h-6",
    large: "w-8 h-8"
  };

  const iconSizes = {
    small: "w-2 h-2",
    medium: "w-3 h-3",
    large: "w-4 h-4"
  };

  const imageUrl = imageSrc
      ? `${import.meta.env.VITE_API_BASE_URL}/static/user/${imageSrc.replace(/^\//, '')}${lastUpdated ? `?t=${new Date(lastUpdated).getTime()}` : ''}`
      : null;

  // For small size (header), use simpler layout
  if (size === "small") {
    return (
        <div className={`${sizeClasses[size]} rounded-full overflow-hidden ${className}`}>
          {imageUrl ? (
              <img
                  src={imageUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
              />
          ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 text-xs">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
          )}
        </div>
    );
  }

  // For larger sizes, use the original layout with upload functionality
  const containerClass = size === "large"
      ? "absolute -bottom-16 md:-bottom-10 left-4 md:left-8"
      : "relative";

  return (
      <div className={containerClass}>
        <div className={`${sizeClasses[size]} rounded-full overflow-hidden border-4 border-white shadow-lg relative ${className}`}>
          {imageUrl ? (
              <img
                  src={imageUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
              />
          ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                {size === "medium" ? (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                ) : (
                    "No Profile Image"
                )}
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
                    className={`absolute bottom-1 right-1 ${editButtonSizes[size]} bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition duration-200`}
                    disabled={mutation.isLoading}
                >
                  {mutation.isLoading ? (
                      <div className={`${iconSizes[size]} border border-white border-t-transparent rounded-full animate-spin`}></div>
                  ) : (
                      <svg className={iconSizes[size]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0118.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
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