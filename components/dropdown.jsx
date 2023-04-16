import React, { useState } from 'react';
import styles from './dropdown.module.css';

const Dropdown = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdownButton} onClick={handleClick}>
        <span className={`${styles.dropdownIcon} ${isOpen ? styles.open : ''}`}>
            {/* A right facing triangle */}
            <svg viewBox="0 0 100 100">
                <polygon points="10,0 90,50 10,100" />
            </svg>
        </span>
      </div>
      {isOpen && (
        <div className={styles.dropdownContent}>
            {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
