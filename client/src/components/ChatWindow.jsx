import { useEffect, useState } from "react";
import MessageBubble from "./MessageBubble";
import { useRef } from "react";
import { createPortal } from "react-dom";

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
  textareaRef,
}) {
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const chatRef = useRef(null);

  // Handle click outside to close (mobile only)
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     // Only on mobile/tablet screens
  //     if (window.innerWidth <= 768) {
  //       if (chatRef.current && !chatRef.current.contains(event.target)) {
  //         onClose();
  //       }
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, [onClose]);

  const [inputContainer, setInputContainer] = useState(null);

  useEffect(() => {
    const container = document.getElementById("chat-input-container");
    setInputContainer(container);
  }, []);

  return (
    <>
      {/* Messages - keep original width and scrolling */}
      <div ref={chatRef} className="max-w-4xl mx-auto p-4 space-y-3">
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
        {isTyping && (
          <div className="flex items-end justify-start animate-fadeIn">
            <div
              className="w-7 h-7 rounded-xl flex items-center justify-center mr-2 text-sm shadow-sm"
              style={{
                backgroundColor: "var(--color-primary-light)",
                color: "var(--color-primary)",
              }}
            >
              🤖
            </div>
            <div
              className="px-4 py-3 rounded-2xl rounded-bl-md text-sm flex gap-1 shadow-sm"
              style={{
                backgroundColor: "var(--color-bot-bg)",
                color: "var(--color-text-muted)",
              }}
            >
              <span className="animate-bounce">.</span>
              <span className="animate-bounce delay-150">.</span>
              <span className="animate-bounce delay-300">.</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input - render in fixed position via portal */}
      {inputContainer &&
        createPortal(
          <div className="flex gap-3 p-4 max-w-4xl mx-auto w-full animate-slideUp">
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              rows={1}
              className="flex-1 resize-none leading-relaxed text-primary focus:outline-none transition-all duration-200 focus:ring-2 focus:ring-offset-2"
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1.5px solid var(--color-border)",
                borderRadius: "var(--radius-xl)",
                padding: "12px 16px",
                fontSize: "14px",
                color: "var(--color-text-primary)",
                focusRingColor: "var(--color-primary)",
                boxShadow: "var(--shadow-sm)",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--color-primary)";
                e.target.style.boxShadow =
                  "0 0 0 3px var(--color-primary-light)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--color-border)";
                e.target.style.boxShadow = "var(--shadow-sm)";
              }}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="px-6 py-3 text-white font-medium cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 text-sm"
              style={{
                backgroundColor: "var(--color-primary)",
                borderRadius: "var(--radius-xl)",
                boxShadow: "var(--shadow-md)",
                border: "none",
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = "var(--shadow-lg)";
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = "var(--shadow-md)";
              }}
            >
              Send
            </button>
          </div>,
          inputContainer
        )}
    </>
  );
}
