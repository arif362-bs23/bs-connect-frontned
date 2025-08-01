import React from "react";

const ActionButtons = ({ post }) => {
  return (
    <>
    {/* demo buttons */}
        <button className="flex-1 flex items-center justify-center p-2 hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 21l-8-8 8-8"></path>
            </svg>
        </button>
        <button className="flex-1 flex items-center justify-center p-2 hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 21l-8-8 8-8"></path>
            </svg>
        </button>
        <button className="flex-1 flex items-center justify-center p-2 hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 21l-8-8 8-8"></path>
            </svg>
        </button>
    </>
)
};
export default ActionButtons;
