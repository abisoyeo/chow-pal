import ChatbotComponent from "./components/ChatbotComponent";
import Header from "./components/Header";

const App = () => {
  return (
    <div
      className="flex flex-col h-screen text-primary"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <Header />
      <div className="flex-1 overflow-y-auto pt-16 scrollbar-custom-width">
        <ChatbotComponent />
      </div>
      <div className="w-full glass-effect min-h-[72px] flex items-center">
        <div id="chat-input-container" className="w-full"></div>
      </div>
    </div>
  );
};

export default App;
