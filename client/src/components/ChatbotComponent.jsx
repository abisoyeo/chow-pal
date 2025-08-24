import { useState } from "react";
import { useChat } from "../hooks/useChat";
import ChatWindow from "./ChatWindow";
import ChatIcon from "./ChatIcon";

export default function ChatbotComponent() {
  const defaultBotMessage = {
    id: 1,
    text: `Hi! Welcome to our Restaurant!
    
Select an option below:
1 - Place an order
97 - See current order
98 - See order history
99 - Checkout
0 - Cancel order
M - Show menu anytime`,
    isBot: true,
    time: new Date(),
  };

  const [isOpen, setIsOpen] = useState(false);
  const {
    messages,
    inputText,
    setInputText,
    isTyping,
    handleSendMessage,
    messagesEndRef,
    scrollToBottom,
  } = useChat(defaultBotMessage);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-10 right-6 md:right-25 ${
          !isOpen ? "animate-pulse" : ""
        }`}
      >
        {isOpen ? (
          <div className="hidden md:flex text-white rounded-full items-center justify-center bg-red-400 w-10 h-10">
            X
          </div>
        ) : (
          <ChatIcon size={70} />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <ChatWindow
          messages={messages}
          isTyping={isTyping}
          inputText={inputText}
          setInputText={setInputText}
          handleSendMessage={handleSendMessage}
          handleKeyPress={handleKeyPress}
          messagesEndRef={messagesEndRef}
          scrollToBottom={scrollToBottom}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
