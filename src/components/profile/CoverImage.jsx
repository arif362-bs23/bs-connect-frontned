import React from 'react';

const CoverImage = ({ src, isOwner }) => {
  return (
    <div className="w-full h-60 bg-gray-200 relative">
      {src ? (
        <img src={src} alt="Cover" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-500">No Cover</div>
      )}
      {isOwner && (
        <button className="absolute bottom-2 right-2 px-3 py-1 text-sm bg-black bg-opacity-60 text-white rounded">
          Change Cover
        </button>
      )}
    </div>
  );
};

export default CoverImage;
