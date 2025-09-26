import React from 'react';
import styles from './ChatroomList.module.css';
import { useNavigate } from 'react-router-dom';
import { Trash2, MessageSquare } from 'lucide-react';
import useAppStore from '../../store/appStore';
import toast from 'react-hot-toast';

const ChatroomList = ({ chatrooms }) => {
  const navigate = useNavigate();
  const deleteChatroom = useAppStore((state) => state.deleteChatroom);

  const handleDelete = (id, event) => {
    event.stopPropagation(); // Prevent navigation when clicking delete
    const confirmed = window.confirm('Are you sure you want to delete this chat?');
    if (confirmed) {
      deleteChatroom(id);
      toast.success('Chatroom deleted!');
    }
  };

  if (chatrooms.length === 0) {
    return <p className={styles.noChats}>No chatrooms found. Create a new one to get started!</p>;
  }

  return (
    <div className={styles.grid}>
      {chatrooms.map((room) => (
        <div key={room.id} className={styles.card} onClick={() => navigate(`/chatroom/${room.id}`)}>
          <div className={styles.cardHeader}>
            <MessageSquare size={24} className={styles.cardIcon} />
            <button
              className={styles.deleteButton}
              onClick={(e) => handleDelete(room.id, e)}
              aria-label="Delete chatroom"
            >
              <Trash2 size={18} />
            </button>
          </div>
          <h3 className={styles.cardTitle}>{room.title}</h3>
          <p className={styles.cardSubtitle}>
            {room.messages.length} message{room.messages.length !== 1 ? 's' : ''}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ChatroomList;