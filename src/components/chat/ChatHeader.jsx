import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ChatHeader.module.css';
import { ArrowLeft } from 'lucide-react';

const ChatHeader = ({ title }) => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <button onClick={() => navigate('/')} className={styles.backButton} aria-label="Back to dashboard">
        <ArrowLeft size={24} />
      </button>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
};

export default ChatHeader;