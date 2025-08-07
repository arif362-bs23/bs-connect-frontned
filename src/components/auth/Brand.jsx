import React from 'react';

const Brand = ({ size = 'large' }) => {
  const isLarge = size === 'large';

  return (
    <div className={`flex items-center gap-6 ${isLarge ? '' : 'justify-center'}`}>
      <div>
        <div
          className={`bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg ${
            isLarge ? 'w-20 h-20' : 'w-16 h-16'
          }`}
        >
          <span className={`text-white font-bold ${isLarge ? 'text-2xl' : 'text-xl'}`}>
            BS
          </span>
        </div>
      </div>
      {isLarge && (
        <div>
          <h1 className="text-blue-600 text-6xl font-bold mb-4">bs-connect</h1>
          <p className="text-2xl text-gray-600">Connect with your colleagues at BS-23</p>
        </div>
      )}
    </div>
  );
};

export default Brand;
