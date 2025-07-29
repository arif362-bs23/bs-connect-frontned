import React from 'react';

const SubmitButton = ({ isPending, text, pendingText }) => {
  return (
    <button
      type="submit"
      disabled={isPending}
      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-bold hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isPending ? pendingText : text}
    </button>
  );
};

export default SubmitButton;
