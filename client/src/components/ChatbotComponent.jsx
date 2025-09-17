import { useState } from "react";
import { useChat } from "../hooks/useChat";
import ChatWindow from "./ChatWindow";
import ChatIcon from "./ChatIcon";

export default function ChatbotComponent() {
  const defaultBotMessage = {
    id: 1,
    text: `
      <h1 class="text-2xl font-bold text-gray-900 mb-4">👋 Welcome to our Restaurant!</h1>
      <p class="text-gray-600 mb-4">This is a demo of our Restaurant Chatbot. You can place your food orders directly here.</p>
  
      <h3 class="font-semibold ">⚙️ How it works</h3>
      <ul class="list-disc list-inside">
        <li>✔ ChatBot interface works like a normal chat app</li>
        <li>✔ No authentication — sessions stored by device</li>
        <li>✔ Clean, responsive design with Tailwind CSS</li>
      </ul>
  
      <h3 class="font-semibold mt-4">📝 Available Options</h3>
      <ul class="list-disc list-inside">
        <li>1 - Place an order</li>
        <li>99 - Checkout order</li>
        <li>98 - See order history</li>
        <li>97 - See current order</li>
        <li>0 - Cancel order</li>
      </ul>
  
      <h3 class="font-semibold mt-4">🍽 Ordering Flow</h3>
      <ul class="list-disc list-inside">
        <li>Choosing 1 shows available meals</li>   
        <li>Select meals using the number-based system</li>
        <li>99 places order (or says “No order to place”)</li>
        <li>98 displays all past orders</li>
        <li>97 shows current order</li>
        <li>0 cancels current order</li>
      </ul>
  
      <h3 class="font-semibold mt-4">💳 Payment</h3>
      <p class="text-gray-600">When your order is ready, you’ll be prompted to pay using our <strong>Paystack test account</strong>. After successful payment, you’ll be redirected back here and notified of your payment status.</p>
    `,
    isBot: true,
    isHtml: true, // 👈 important
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
