import { useEffect } from "react";
import MessageBubble from "./MessageBubble";
import { useRef } from "react";

export default function ChatWindow({
  messages,
  isTyping,
  inputText,
  setInputText,
  handleSendMessage,
  handleKeyPress,
  messagesEndRef,
  scrollToBottom,
  onClose,
}) {
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const chatRef = useRef(null);

  // Handle click outside to close (mobile only)
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Only on mobile/tablet screens
      if (window.innerWidth <= 768) {
        if (chatRef.current && !chatRef.current.contains(event.target)) {
          onClose();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={chatRef}
      className="
      fixed 
      
      /* Mobile positioning - aligned with keyboard */
      bottom-2 right-2 left-2 
      h-96 max-h-[90vh]
      
      /* Desktop positioning - original behavior */
      md:bottom-24 md:right-20 md:left-auto
      md:w-120 md:h-120 
      
      bg-white rounded-xl shadow-2xl border border-gray-200 
      flex flex-col z-40 animate-fadeIn
    "
    >
      {/* Header */}
      <div className="bg-blue-600 text-white p-5 rounded-t-xl">
        <h3 className="font-semibold">🥡 ChowPal</h3>
        <p className="text-sm text-blue-100">Make your orders!</p>
        <button
          onClick={onClose}
          className="
            absolute top-4 right-4
            
            /* Mobile: Small X inside header */
            w-6 h-6 md:hidden
            bg-red-500 hover:bg-red-600
            text-white text-xs font-bold
            rounded-full flex items-center justify-center
            transition-colors
          "
        >
          ×
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-custom-width">
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
        {isTyping && (
          <div className="flex items-end justify-start">
            <div className="w-8 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 mr-1 text-sm">
              🤖
            </div>
            <div className="bg-gray-100 text-gray-500 px-3 py-2 rounded-lg rounded-tl-none text-sm flex gap-1">
              <span className="animate-bounce">.</span>
              <span className="animate-bounce delay-150">.</span>
              <span className="animate-bounce delay-300">.</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex gap-1 p-3 border-t border-gray-200 bg-gray-50 rounded-b-xl">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          rows={1}
          className="flex-1 bg-white border border-gray-300 rounded-full px-3 py-1 text-sm focus:outline-none resize-none leading-loose"
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Send
        </button>
      </div>
    </div>
  );
}
