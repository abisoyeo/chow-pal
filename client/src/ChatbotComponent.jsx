import { useEffect, useRef, useState } from "react";

export default function ChatbotComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your assistant. How can I help you today?",
      isBot: true,
      time: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const botResponses = [
    "That's interesting! Tell me more.",
    "I understand. How can I assist you with that?",
    "Thanks for sharing! Is there anything specific you'd like to know?",
    "I'm here to help! What would you like to discuss?",
    "That's a great question! Let me think about that.",
    "I appreciate you reaching out. How else can I support you?",
  ];

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      isBot: false,
      time: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    const botMessage = {
      id: messages.length + 2,
      text: botResponses[Math.floor(Math.random() * botResponses.length)],
      isBot: true,
      time: new Date(),
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  function linkifyText(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white-500 underline break-words"
          >
            ({part})
          </a>
        );
      }
      return part;
    });
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="Chat with us"
        className={`fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 
          text-white rounded-full shadow-lg transition-all duration-200 
          flex items-center justify-center z-50 focus:outline-none 
          focus:ring-4 focus:ring-blue-300 ${!isOpen ? "animate-pulse" : ""}`}
      >
        {isOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 
              0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 
              3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-4 max-w-85 h-100 md:h-120 lg:max-w-100 bg-white rounded-xl shadow-2xl 
          border border-gray-200 flex flex-col z-40 animate-fadeIn"
        >
          {/* Header */}
          <div className="bg-blue-600 text-white p-5 rounded-t-xl">
            <h3 className="font-semibold">ChatBot</h3>
            <p className="text-sm text-blue-100">Make your orders!</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-custom-width">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-end ${
                  message.isBot ? "justify-start" : "justify-end"
                }`}
              >
                {message.isBot && (
                  <div className="w-8 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 mr-1 text-sm">
                    🤖
                  </div>
                )}
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm relative break-words whitespace-pre-wrap ${
                    message.isBot
                      ? "bg-gray-100 text-gray-800 rounded-tl-none"
                      : "bg-blue-600 text-white rounded-tr-none shadow-md"
                  }`}
                >
                  {linkifyText(message.text)}
                  <div className="text-[10px] text-gray-400 mt-1 text-right">
                    {new Date(message.time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}{" "}
            <div ref={messagesEndRef} /> {/* Auto scroll target */}
          </div>

          {/* Input */}
          <div className="flex gap-1 p-3 border-t border-gray-200 bg-gray-50 rounded-b-xl">
            <div className="flex-1 bg-white border border-gray-300 rounded-full">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                className="w-full px-3 py-2 text-sm focus:outline-none bg-transparent"
              />
            </div>
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-blue-600 text-white rounded-full 
                  hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
