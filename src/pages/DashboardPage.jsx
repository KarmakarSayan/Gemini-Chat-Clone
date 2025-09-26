import React, { useState, useMemo } from 'react';
import styles from './DashboardPage.module.css';
import useAppStore from '../store/appStore';
import useDebounce from '../hooks/useDebounce';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import ChatroomList from '../components/dashboard/ChatroomList';
import CreateChatroomModal from '../components/dashboard/CreateChatroomModal';

const DashboardPage = () => {
  const chatrooms = useAppStore((state) => state.chatrooms);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300); // 300ms delay

  const filteredChatrooms = useMemo(() => {
    return chatrooms.filter((room) =>
      room.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [chatrooms, debouncedSearchTerm]);

  return (
    <div className={styles.container}>
      <DashboardHeader
        onSearchChange={setSearchTerm}
        onNewChatClick={() => setIsModalOpen(true)}
      />
      <ChatroomList chatrooms={filteredChatrooms} />
      <CreateChatroomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default DashboardPage;