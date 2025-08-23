import { useState } from "react";
import { useChat } from "../hooks/useChat";
import ChatWindow from "./ChatWindow";

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
        title="Chat with us"
        className={`fixed bottom-10 right-25 w-20 h-20 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-200 flex items-center justify-center z-50 focus:outline-none focus:ring-4 focus:ring-blue-300 ${
          !isOpen ? "animate-pulse" : ""
        }`}
      >
        {isOpen ? "✖" : "🤖"}
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
        />
      )}
    </>
  );
}
