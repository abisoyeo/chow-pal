import { useState } from "react";
import { useChat } from "../hooks/useChat";
import ChatWindow from "./ChatWindow";
import ChatIcon from "./ChatIcon";

export default function ChatbotComponent() {
  const defaultBotMessage = {
    id: 1,
    text: `👋 Welcome to ChowPal!

Order meals right in chat. No sign-up needed.

📝 Quick commands:
1 - Place an order
99 - Checkout order  
98 - Order history
97 - Current order
0 - Cancel order

💳 Payment via Paystack (test mode)

Just type a number to get started!`,
    isBot: true,
    isHtml: false,
    time: new Date(),
  };

  const [isOpen, setIsOpen] = useState(false);
  const {
    messages,
    setMessages,
    inputText,
    setInputText,
    isTyping,
    handleSendMessage,
    textareaRef,
    messagesEndRef,
    scrollToBottom,
  } = useChat(defaultBotMessage);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      // Clear intro message after first user interaction
      if (messages.some((m) => m.isHtml)) {
        setMessages((prev) => prev.filter((m) => !m.isHtml));
      }
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      {/* <button
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
      </button> */}

      {/* Chat Window */}
      {/* {isOpen && (
      )} */}

      <ChatWindow
        messages={messages}
        isTyping={isTyping}
        inputText={inputText}
        setInputText={setInputText}
        handleSendMessage={handleSendMessage}
        handleKeyPress={handleKeyPress}
        messagesEndRef={messagesEndRef}
        textareaRef={textareaRef}
        scrollToBottom={scrollToBottom}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
