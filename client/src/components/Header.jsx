import React from "react";

const Header = () => {
  return (
    <div>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-10 glass-effect px-6 md:px-10 py-4 animate-slideUp" style={{ borderBottom: '1px solid var(--color-border-light)' }}>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: 'var(--color-secondary)', color: 'white' }}>
              🥡
            </div>
            <h1 className="text-xl font-bold tracking-tight text-primary" style={{ color: 'var(--color-text-primary)' }}>
              ChowPal
            </h1>
          </div>
          <div className="ml-auto flex items-center gap-4 text-sm">
            {/* Clear chat button */}
            <button 
              onClick={() => {
                if (window.confirm('Clear chat history? This will start a fresh conversation.')) {
                  sessionStorage.removeItem('chatMessages');
                  window.location.reload();
                }
              }}
              className="text-xs px-3 py-1 rounded transition-all duration-200 hover:scale-105" 
              style={{ 
                backgroundColor: 'var(--color-primary)', 
                color: 'white',
                border: 'none'
              }}
              title="Clear chat and start fresh"
            >
              🗑️ Clear
            </button>
            <div className="hidden md:flex items-center gap-2" style={{ color: 'var(--color-text-secondary)' }}>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }}></div>
              <span>Online</span>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
