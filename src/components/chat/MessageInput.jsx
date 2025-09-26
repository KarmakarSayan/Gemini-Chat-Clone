import React, { useState, useRef } from 'react';
import styles from './MessageInput.module.css';
import { Send, Paperclip } from 'lucide-react';
import toast from 'react-hot-toast';

const MessageInput = ({ onSendMessage }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { 
        toast.error('Image is too large (max 2MB).');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage({ preview: reader.result, name: file.name });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() && !image) return;
    onSendMessage(text, image?.preview);
    setText('');
    setImage(null);
    fileInputRef.current.value = null; // Reset file input
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      {image && (
        <div className={styles.imagePreview}>
          <img src={image.preview} alt={image.name} />
          <button type="button" onClick={() => setImage(null)}>×</button>
        </div>
      )}
      <div className={styles.inputContainer}>
        <button type="button" className={styles.iconButton} onClick={() => fileInputRef.current.click()}>
          <Paperclip size={22} />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          style={{ display: 'none' }}
          accept="image/*"
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          className={styles.textarea}
          rows="1"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <button type="submit" className={styles.sendButton} aria-label="Send message">
          <Send size={22} />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;