import React, { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadCoverImage } from '../../api';
import { toast } from 'react-toastify';

const CoverImage = ({ src, isOwner, userId }) => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);
  console.log(src);

  const mutation = useMutation({
    mutationFn: uploadCoverImage,
    onSuccess: () => {
      toast.success('Cover image updated successfully!');
      queryClient.invalidateQueries(['profile', userId]);
    },
    onError: () => {
      toast.error('Failed to update cover image.');
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

  return (
    <div className="w-full h-60 bg-gray-200 relative">
      {src ? (
        <img src={`${import.meta.env.VITE_API_BASE_URL}/static/user/${src}`} alt="Cover" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-500">No Cover</div>
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
            className="absolute bottom-2 right-2 px-3 py-1 text-sm bg-black bg-opacity-60 text-white rounded"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? 'Uploading...' : 'Change Cover'}
          </button>
        </>
      )}
    </div>
  );
};

export default CoverImage;
