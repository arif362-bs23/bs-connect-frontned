import React from 'react';

const Header = () => {
    return (
        <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
            <div className="flex items-center">
                <h1 className="text-xl font-bold text-gray-900">My Application</h1>
            </div>
            <div className="flex items-center space-x-4">
                {/* Add navigation links or buttons here */}
            </div>
            </div>
        </div>
        </header>
    );
};

export default Header;