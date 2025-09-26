import React from 'react';
import useAppStore from '../../store/appStore';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import { Sun, Moon, LogOut } from 'lucide-react';

const Navbar = () => {
  // Correct way to select multiple items to prevent re-renders
  const { logout, theme, toggleTheme } = useAppStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand} onClick={() => navigate('/')}>
        Gemini Clone
      </div>
      <div className={styles.menu}>
        <button onClick={toggleTheme} className={styles.iconButton} aria-label="Toggle theme">
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <button onClick={handleLogout} className={styles.iconButton} aria-label="Logout">
          <LogOut size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;