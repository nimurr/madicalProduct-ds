import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const SocketIoChat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const socketRef = useRef(null);

  // Connect to the Socket.IO server
  useEffect(() => {
    // Initialize the socket connection
    socketRef.current = io('http://localhost:5001'); // Ensure this matches the backend server URL

    // Log connection status
    socketRef.current.on('connect', () => {
      console.log('Connected to the socket server');
    });

    // Listen for incoming messages from the server
    socketRef.current.on('receive_message', (data) => {
      console.log('Received message:', data);
      setMessages((prevMessages) => [
        ...prevMessages,
        { from: data.from, message: data.message }
      ]);
    });

    // Clean up on component unmount
    return () => {
      socketRef.current.disconnect();
    };
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  const sendMessage = () => {
    if (message.trim()) {
      // Emit message to all clients
      socketRef.current.emit('send_message', {
        message: message
      });
      setMessage(''); // Clear the input after sending
    }
  };

  return (
    <div className="chat-container mt-20">
      <h1>Socket.IO Broadcast Chat</h1>

      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.from}: </strong>{msg.message}
          </div>
        ))}
      </div>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default SocketIoChat;
