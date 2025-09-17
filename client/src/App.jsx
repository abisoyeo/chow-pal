import ChatbotComponent from "./components/ChatbotComponent";
import DineChat from "./components/Dine";
import Header from "./components/Header";

const App = () => {
  return (
    // <div className="h-screen">
    //   <Header />

    //   <div className="bg-[#f5efec] pt-16">
    //     <ChatbotComponent />

    //     {/* <DineChat /> */}
    //   </div>
    // </div>

    <div className="flex flex-col h-screen text-primary" style={{ backgroundColor: 'var(--color-background)' }}>
      {/* Sticky header */}
      <Header />

      {/* Chat messages - scrollable */}
      <div className="flex-1 overflow-y-auto pt-16 scrollbar-custom-width">
        <ChatbotComponent />
      </div>

      {/* Fixed input - spans full width like header */}
      <div className="w-full glass-effect min-h-[72px] flex items-center">
        {/* Input will be rendered by ChatbotComponent but positioned here */}
        <div id="chat-input-container" className="w-full"></div>
      </div>
    </div>
  );
};

export default App;
