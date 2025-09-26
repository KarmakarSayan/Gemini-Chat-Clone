import React, { useRef, useEffect } from 'react';
import styles from './MessageList.module.css';
import MessageItem from './MessageItem';

const MessageList = ({ messages, isTyping }) => {
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className={styles.messageList}>
      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} />
      ))}
      {isTyping && (
        <div className={styles.typingIndicator}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default MessageList;