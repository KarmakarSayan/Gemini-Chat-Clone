import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import styles from './ChatroomPage.module.css';
import useAppStore from '../store/appStore';
import ChatHeader from '../components/chat/ChatHeader';
import MessageList from '../components/chat/MessageList';
import MessageInput from '../components/chat/MessageInput';

const ChatroomPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { chatrooms, addMessage } = useAppStore();
  const [isTyping, setIsTyping] = useState(false);

  const chatroom = chatrooms.find((room) => room.id === id);

  useEffect(() => {
    // If chatroom doesn't exist, redirect to dashboard
    if (!chatroom) {
      navigate('/');
    }
  }, [chatroom, navigate]);

  const handleSendMessage = (text, imageUrl) => {
    const userMessage = {
      id: uuidv4(),
      text,
      imageUrl,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };
    addMessage(id, userMessage);

    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const aiMessage = {
        id: uuidv4(),
        text: 'This is a simulated AI response. The feature is working!',
        sender: 'ai',
        timestamp: new Date().toISOString(),
      };
      addMessage(id, aiMessage);
    }, 2000 + Math.random() * 1000); // Simulate "thinking" time
  };

  // Render nothing or a loader if the chatroom is not found yet
  if (!chatroom) {
    return <div>Loading chat...</div>;
  }

  return (
    <div className={styles.page}>
      <ChatHeader title={chatroom.title} />
      <MessageList messages={chatroom.messages} isTyping={isTyping} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatroomPage;