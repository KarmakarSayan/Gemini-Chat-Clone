import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid'; // Run: npm install uuid

const appStore = (set, get) => ({
  user: null,
  isAuthenticated: false,
  theme: 'light',
  chatrooms: [],

  // --- AUTH ACTIONS ---
  login: (phoneNumber) => {
    const user = { id: uuidv4(), phone: phoneNumber };
    set({ user, isAuthenticated: true });
    
    // If user has no chatrooms, create a default one
    if (get().chatrooms.length === 0) {
      get().createChatroom('General Chat');
    }
  },
  logout: () => set({ user: null, isAuthenticated: false }),

  // --- THEME ACTIONS ---
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),

  // --- CHATROOM ACTIONS ---
  createChatroom: (title) => {
    const newChatroom = {
      id: uuidv4(),
      title,
      messages: [
        {
          id: uuidv4(),
          text: `Welcome to ${title}!`,
          sender: 'ai',
          timestamp: new Date().toISOString(),
        },
      ],
    };
    set((state) => ({ chatrooms: [...state.chatrooms, newChatroom] }));
  },
  deleteChatroom: (id) => {
    set((state) => ({
      chatrooms: state.chatrooms.filter((room) => room.id !== id),
    }));
  },

  // --- MESSAGE ACTIONS ---
  addMessage: (chatroomId, message) => {
    set((state) => ({
      chatrooms: state.chatrooms.map((room) =>
        room.id === chatroomId
          ? { ...room, messages: [...room.messages, message] }
          : room
      ),
    }));
  },
  
  // Dummy function for fetching older messages
  fetchOlderMessages: (chatroomId) => {
    const olderMessages = Array.from({ length: 10 }, (_, i) => ({
      id: uuidv4(),
      text: `This is an older message #${i + 1}`,
      sender: i % 2 === 0 ? 'user' : 'ai',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * (i + 1)).toISOString(),
    }));

    set(state => ({
      chatrooms: state.chatrooms.map(room => 
        room.id === chatroomId ? { ...room, messages: [...olderMessages, ...room.messages] } : room
      )
    }));
  },
});

const useAppStore = create(
  persist(appStore, {
    name: 'gemini-clone-storage', // Key for localStorage
  })
);

export default useAppStore;