const ChatIcon = ({ size = 56, className = "" }) => {
  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Shadow/Background Circle */}
      <div
        className="absolute inset-0 rounded-full bg-emerald-500"
        style={{
          boxShadow: "0 8px 24px rgba(76, 161, 240, 0.3)",
          transform: "translateY(2px)",
        }}
      />

      {/* Main Circle */}
      <div
        className="absolute inset-0 rounded-full flex items-center justify-center"
        style={{ backgroundColor: "#155dfc" }}
      >
        {/* Square Chat Bubble - Blank */}
        <svg
          width={size * 0.7}
          height={size * 0.9}
          viewBox="0 0 20 20"
          fill="none"
        >
          {/* Square chat bubble */}
          <path d="M4 4h13v10H8l-4 4V4z" fill="white" />
        </svg>
      </div>
    </div>
  );
};

export default ChatIcon;
