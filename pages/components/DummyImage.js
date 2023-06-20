import React from 'react';
import styles from '@/styles/Navbar.module.css';

const DummyImage = ({ logoName, textColor, backgroundColor, width, height, textSize }) => {
  return (
    <div
      className={styles['dummy-image-container']}
      style={{
        width: width,
        height: height,
        backgroundColor: backgroundColor,
      }}
    >
      <span
        className={styles['logo-text']}
        style={{
          color: textColor,
          fontSize: textSize,
        }}
      >
        {logoName}
      </span>
    </div>
  );
};

export default DummyImage;
