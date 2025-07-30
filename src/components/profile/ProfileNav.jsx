import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const ProfileNav = ({ baseUrl }) => {
  const { search } = useLocation();
  const currentTab = new URLSearchParams(search).get('tab') || 'posts';

  const tabs = [
    { name: 'Posts', key: 'posts' },
    { name: 'Followers', key: 'followers' },
    { name: 'Following', key: 'following' },
  ];

  return (
    <div className="border-b border-gray-300 mb-4">
      <div className="flex overflow-x-auto scrollbar-none">
        {tabs.map(tab => (
          <Link
            key={tab.key}
            to={`${baseUrl}${tab.key === 'posts' ? '' : `?tab=${tab.key}`}`}
            className={`px-4 py-3 font-medium whitespace-nowrap border-b-2 ${
              currentTab === tab.key
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProfileNav;
