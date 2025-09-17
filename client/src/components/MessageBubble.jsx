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
      className={`flex items-end w-full animate-messageSlide ${
        message.isBot ? "justify-start" : "justify-end"
      }`}
    >
      {message.isBot ? (
        <div 
          className="w-7 h-7 rounded-xl flex items-center justify-center mr-2 text-sm shadow-sm" 
          style={{ 
            backgroundColor: 'var(--color-primary-light)',
            color: 'var(--color-primary)'
          }}
        >
          🤖
        </div>
      ) : (
        <div 
          className="w-7 h-7 rounded-xl flex items-center justify-center ml-2 text-sm order-2 shadow-sm" 
          style={{ 
            backgroundColor: 'var(--color-primary)',
            color: 'white'
          }}
        >
          👤
        </div>
      )}
      <div
        className={`max-w-xs min-w-0 px-4 py-3 text-sm relative break-words whitespace-pre-wrap transition-all duration-200 hover:scale-[1.02] ${
          message.isBot
            ? "rounded-2xl rounded-bl-md shadow-sm"
            : "rounded-2xl rounded-br-md shadow-md"
        }`}
        style={{
          backgroundColor: message.isBot ? 'var(--color-bot-bg)' : 'var(--color-user-bg)',
          color: message.isBot ? 'var(--color-bot-text)' : 'var(--color-user-text)',
          boxShadow: message.isBot ? 'var(--shadow-sm)' : 'var(--shadow-md)'
        }}
      >
        {message.isHtml ? (
          <div
            className="prose prose-sm max-w-none text-secondary"
            dangerouslySetInnerHTML={{ __html: message.text }}
            style={{ color: message.isBot ? 'var(--color-bot-text)' : 'var(--color-user-text)' }}
          />
        ) : (
          <div className="text-secondary" style={{ color: message.isBot ? 'var(--color-bot-text)' : 'var(--color-user-text)' }}>
            {linkifyText(message.text)}
          </div>
        )}
        <div 
          className="text-[10px] text-right mt-1 opacity-70" 
          style={{ color: message.isBot ? 'var(--color-text-muted)' : 'rgba(255,255,255,0.8)' }}
        >
          {new Date(message.time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}
