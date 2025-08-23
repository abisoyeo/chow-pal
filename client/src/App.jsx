import ChatbotComponent from "./ChatbotComponent";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-300 p-6">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
          🍴 Restaurant Chatbot Widget
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            👋 Welcome to our Restaurant!
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            This is a demo of our Restaurant Chatbot. The chat button appears in
            the bottom-right corner — click it to start chatting and place your
            food orders directly.
          </p>

          {/* Section: How it works */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              ⚙️ How it works
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-green-600">✔</span> ChatBot interface
                works like a normal chat app
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✔</span> No authentication —
                sessions stored by device
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✔</span> Clean, responsive
                design with Tailwind CSS
              </li>
            </ul>
          </div>

          {/* Section: Options */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              📝 Available Options
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: "1", text: "Place an order" },
                { key: "99", text: "Checkout order" },
                { key: "98", text: "See order history" },
                { key: "97", text: "See current order" },
                { key: "0", text: "Cancel order" },
              ].map((opt) => (
                <div
                  key={opt.key}
                  className="p-4 rounded-lg bg-gray-50 border border-gray-200 shadow-sm flex items-center gap-3 hover:bg-gray-100 transition"
                >
                  <span className="text-gray-900 font-bold text-lg">
                    {opt.key}
                  </span>
                  <span className="text-gray-700">{opt.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Ordering Flow */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              🍽 Ordering Flow
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                Choosing <strong>1</strong> shows available meals
              </li>
              <li>Select meals using the number-based system</li>
              <li>
                <strong>99</strong> places order (or says “No order to place”)
              </li>
              <li>
                <strong>98</strong> displays all past orders
              </li>
              <li>
                <strong>97</strong> shows current order
              </li>
              <li>
                <strong>0</strong> cancels current order
              </li>
            </ul>
          </div>

          {/* Section: Payment */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              💳 Payment
            </h3>
            <p className="text-gray-700 leading-relaxed">
              When your order is ready, you’ll be prompted to pay using our
              integrated{" "}
              <span className="font-semibold">Paystack test account</span>.
              After successful payment, you’ll be redirected back to the chatbot
              and notified of your payment status.
            </p>
          </div>
        </div>
      </div>

      {/* Chatbot */}
      <ChatbotComponent />
    </div>
  );
};

export default App;
