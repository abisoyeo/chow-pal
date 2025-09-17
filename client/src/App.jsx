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

    <div className="flex flex-col h-screen bg-[#f5efec]">
      {/* Sticky header */}
      <Header />

      {/* Chat area (messages + input) */}
      <div className="flex flex-col flex-1 overflow-hidden pt-16">
        {/* Messages should scroll */}
        <div className="flex-1 overflow-y-auto">
          <ChatbotComponent />
        </div>

        {/* Fixed input */}
        <div className="border-t border-gray-200 bg-gray-50">
          {/* you can move the input code from ChatWindow here if you prefer */}
        </div>
      </div>
    </div>
  );
};

export default App;
