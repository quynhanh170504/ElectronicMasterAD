import React, { useState } from 'react'

const CustomButton = ({ loading, title, loadingtitle, todo_function }) => {
  return (
    <button
      onClick={todo_function}
      disabled={loading}
      className="group relative w-full flex justify-center py-3 px-4 border-2 border-black text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black rounded-md font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          {loadingtitle}
        </div>
      ) : (
        { title }
      )}
    </button>
  )
}

export default CustomButton