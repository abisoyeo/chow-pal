import { useEffect, useRef, useState } from "react";
import { sendMessage } from "../lib/api";

export function useChat(defaultMessage) {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatMessages");
    return saved ? JSON.parse(saved) : [defaultMessage];
  });
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentStatus = params.get("payment");

    if (paymentStatus === "success") {
      // Show bot message after successful payment
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: "✅ Payment successful! Your order has been confirmed. 🎉",
          isBot: true,
          time: new Date(),
        },
      ]);
    } else if (paymentStatus === "failed") {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: "❌ Payment failed. Please try again or choose another method.",
          isBot: true,
          time: new Date(),
        },
      ]);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessageToServer = async (message) => {
    try {
      const response = await sendMessage(message);
      return response.reply;
    } catch (error) {
      console.error(error);
      return "Sorry, something went wrong. Please try again.";
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      isBot: false,
      time: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    const replyText = await sendMessageToServer({ message: userMessage.text });
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), text: replyText, isBot: true, time: new Date() },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return {
    messages,
    inputText,
    setInputText,
    isTyping,
    handleSendMessage,
    messagesEndRef,
    scrollToBottom,
  };
}
