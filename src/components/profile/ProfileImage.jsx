import React from 'react';

const ProfileImage = ({ src, isOwner }) => {
  return (
    <div className="absolute -bottom-16 md:-bottom-10 left-4 md:left-8">
      <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white shadow-lg">
        <img src={src || '/default-avatar.png'} alt="Profile" className="w-full h-full object-cover" />
      </div>
      {isOwner && (
        <button className="mt-2 text-xs bg-black bg-opacity-50 text-white px-2 py-1 rounded">
          Edit
        </button>
      )}
    </div>
  );
};

export default ProfileImage;
