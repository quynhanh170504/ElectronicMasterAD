const Tag = ({ text }) => {
  return (
    <div className="inline-flex items-center bg-blue-200 text-blue-600 font-bold text-sm py-1 px-3 rounded relative">
      {/* White circle on the left */}
      <span className="absolute left-1 w-2 h-2 bg-white rounded-full"></span>
      {/* Text */}
      <span className="ml-3 mr-2">{text}</span>
      {/* Arrow on the right */}
      <span className="absolute right-[-10px] border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[10px] border-l-blue-200"></span>
    </div>
  );
};

export default Tag;