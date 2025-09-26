import React from 'react';
import styles from './DashboardHeader.module.css';
import { Search, Plus } from 'lucide-react';
import Button from '../common/Button';

const DashboardHeader = ({ onSearchChange, onNewChatClick }) => {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Your Chats</h1>
      <div className={styles.actions}>
        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} size={20} />
          <input
            type="text"
            placeholder="Search chats..."
            className={styles.searchInput}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Button onClick={onNewChatClick}>
          <Plus size={20} /> New Chat
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;