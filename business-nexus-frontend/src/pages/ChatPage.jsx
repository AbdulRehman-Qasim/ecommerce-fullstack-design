import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ChatPage.css';

const ChatPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello!', sender: 'you' },
    { id: 2, text: 'Hi there! How can I help?', sender: 'them' },
    { id: 3, text: 'I’m interested in your project.', sender: 'you' },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'you',
    };

    setMessages((prev) => [...prev, newMsg]);
    setNewMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="chat-page">
      <div className="chat-card">
        <div className="chat-header">
          <h2>Chat with User #{userId}</h2>
          <button onClick={() => navigate(-1)}>← Back</button>
        </div>

        <div className="chat-messages">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-bubble ${msg.sender === 'you' ? 'sent' : 'received'}`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="chat-input-section">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
