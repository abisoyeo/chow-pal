function linkifyText(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, i) =>
    urlRegex.test(part) ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-900 underline break-words"
      >
        ({part})
      </a>
    ) : (
      part
    )
  );
}

export default function MessageBubble({ message }) {
  return (
    <div
      className={`flex items-end w-full ${
        message.isBot ? "justify-start" : "justify-end"
      }`}
    >
      {message.isBot ? (
        <div className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 mr-1 text-sm">
          🤖
        </div>
      ) : (
        <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 ml-1 text-sm order-2">
          👤
        </div>
      )}
      <div
        className={`max-w-xs min-w-0 px-3 py-2 rounded-2xl text-sm relative break-words whitespace-pre-wrap ${
          message.isBot
            ? "bg-gray-200 text-gray-800 rounded-bl-none"
            : "bg-[#ee7c2b] text-white rounded-br-none shadow-md"
        }`}
      >
        {message.isHtml ? (
          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: message.text }}
          />
        ) : (
          linkifyText(message.text)
        )}
        <div className="text-[10px] text-right">
          {new Date(message.time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}
