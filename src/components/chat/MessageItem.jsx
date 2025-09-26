import React from 'react';
import styles from './MessageItem.module.css';
import { Copy } from 'lucide-react';
import toast from 'react-hot-toast';

const MessageItem = ({ message }) => {
  const isUser = message.sender === 'user';

  const handleCopy = () => {
    if (message.text) {
      navigator.clipboard.writeText(message.text);
      toast.success('Message copied!');
    }
  };

  return (
    <div className={`${styles.messageWrapper} ${isUser ? styles.user : styles.ai}`}>
      <div className={styles.messageBubble}>
        {message.text && <p>{message.text}</p>}
        {message.imageUrl && (
          <img src={message.imageUrl} alt="Uploaded content" className={styles.image} />
        )}
        <span className={styles.timestamp}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
        <button className={styles.copyButton} onClick={handleCopy} aria-label="Copy message">
          <Copy size={14} />
        </button>
      </div>
    </div>
  );
};

export default MessageItem;