import React from "react";

const Header = () => {
  return (
    <div>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-sm border-b border-[#e6e0db] px-6 md:px-10 py-4">
        <div className="flex items-center gap-3 text-[var(--text-primary)]">
          <h1 className="text-[#ee7c2b] text-xl font-bold tracking-tight">
            🥡 ChowPal
          </h1>
        </div>
      </header>
    </div>
  );
};

export default Header;
