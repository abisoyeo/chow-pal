import React from "react";
// import "@fontsource/noto-sans"; // optional: you can also keep using Google Fonts link
// import "@fontsource/plus-jakarta-sans";
// import "@fontsource/material-symbols-outlined";

const DineChat = () => {
  return (
    <div
      className="bg-[var(--bg-color)] h-screen w-full flex flex-col overflow-hidden"
      style={{
        fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif',
      }}>

      {/* Chat Section */}
      <div className="flex-1 overflow-y-auto px-4 md:px-0">
        <div className="max-w-2xl mx-auto py-8 space-y-8">
          {/* Bot Message */}
          <div className="flex items-start gap-3 p-2">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0 shadow-sm"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCmtKH_-H1pPQ5Oz0OXQSzz6w8PFwvjdFWahonZKcEXEZ1_RzR6ZxDOfd9V4u0_emXiDdN7zhGnDJSA7H7wGTo4FAAFF3j-QGKDWIi63bMUWbKdZIHzUMJ4_EMGM6RjIXhpggKaF7PcFiR0A7A_kcon4mjPlo-f-Si0RR8nmhxixyH8kEoqtKIamLMLPjRRFZVryfCHGUD0fYw6CfGuEMqQ-7c0f65In43QAG_qWwlWLqFI1DyDsC3TGZUEX9_KlLVnJhH59wSSWRj8")',
              }}
            />
            <div className="flex flex-col gap-1 items-start">
              <p className="text-[var(--text-secondary)] text-xs font-medium px-3">
                Bot
              </p>
              <div className="chat-bubble-bot px-4 py-3 text-base font-normal leading-relaxed">
                Hi there! I'm your friendly ordering assistant. What can I get
                for you today? 🍕
              </div>
            </div>
          </div>

          {/* User Message */}
          <div className="flex items-start gap-3 justify-end p-2">
            <div className="flex flex-col gap-1 items-end">
              <p className="text-[var(--text-secondary)] text-xs font-medium px-3">
                You
              </p>
              <div className="chat-bubble-user px-4 py-3 text-base font-normal leading-relaxed">
                I'd like to see the menu, please.
              </div>
            </div>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0 shadow-sm"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCb1z1Ztlja9ZztE6nxdCRDcb01ycFi8kokFuQBBTQkAWFTRVXyfeOUE7z3MefoyRni1L7R7iAKR4y8IAUovI8VpVRJMYsYjm6wYGfX6gZQzZw0HJB5o1XyVHceLatqX7xWW51M1C1FfoBcg5nJ6rBirGiaxeJ6tczmw0yzLIWi1a0fLctt0wI66ps1-M4DsTDrXfKDfundv56wntpkaBCvmmcroRcDSsxPB4jNhoIww1EdygHHTz2nJQEJ3384SL6txn2Q2WweoRlG")',
              }}
            />
          </div>

          {/* Bot Menu Message */}
          <div className="flex items-start gap-3 p-2">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0 shadow-sm"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDmKlHrwRRVxzhYjUMBsJOUvUdAcbWvSchj_JMw2NC5L2j0PCGpN9IbDa2Ij-CJXozjHiLeLa3-q0ftJtRhoGDn9Mzmpbr4o46u3lqvTa8FiBN-uH_gMr_qcZOH6SAC6BaKpKqVM2-zzpKtJesAOdxi7kuoj4eYIAgQE3wovrP63Qn9OKVoKdtWwh7n1t1iOLUF6niVOrBYC-MyHoH4tVnTpNlNzwhGATQ8wSw4Rj36sgvDBdV8lkTMuzvRTWSmoaHLHJcROGyApGdY")',
              }}
            />
            <div className="flex flex-col gap-2 items-start max-w-full">
              <p className="text-[var(--text-secondary)] text-xs font-medium px-3">
                Bot
              </p>
              <div className="chat-bubble-bot px-4 py-3 text-base font-normal leading-relaxed">
                Of course! Here are our menu categories. Just type the number of
                the one you'd like to explore.
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 w-full pl-4 sm:pl-0">
                {[
                  { id: 1, text: "🥗 Appetizers", color: "orange" },
                  { id: 2, text: "🍝 Main Courses", color: "red" },
                  { id: 3, text: "🍰 Desserts", color: "pink" },
                  { id: 4, text: "🍹 Drinks", color: "blue" },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="menu-card flex items-center gap-4 p-4 rounded-2xl cursor-pointer"
                  >
                    <div
                      className={`flex items-center justify-center rounded-full bg-${item.color}-100 text-${item.color}-500 shrink-0 size-10`}
                    >
                      <span className="text-xl">{item.id}</span>
                    </div>
                    <p className="text-[var(--text-primary)] text-base font-semibold">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="px-4 md:px-0 bg-[var(--bg-color)]/80 backdrop-blur-sm border-t border-solid border-[#e6e0db]">
        <div className="max-w-2xl mx-auto py-3">
          <div className="flex items-center gap-2">
            <input
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-full text-[var(--text-primary)] focus:outline-0 focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-50 border-2 border-transparent bg-white h-12 placeholder:text-[var(--text-secondary)] px-5 text-base font-normal leading-normal shadow-sm"
              placeholder="Type a number or message..."
            />
            <button className="flex min-w-[48px] max-w-[48px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 bg-[var(--primary-color)] text-white text-lg font-bold leading-normal tracking-[0.015em] shadow-lg hover:bg-opacity-90 transition-all duration-300">
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DineChat;
