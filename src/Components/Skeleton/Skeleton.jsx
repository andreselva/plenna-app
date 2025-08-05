import React from 'react';
import styles from './Skeleton.module.css';

/**
 * @param {string} width - Largura do elemento (ex: '100px', '80%')
 * @param {string} height - Altura do elemento (ex: '20px')
 * @param {string} variant - 'text', 'rect', 'circle' para diferentes formas
 * @param {string} className - Classes CSS adicionais para customização
 */
const Skeleton = ({ width, height, variant = 'text', className }) => {
  const style = {
    width,
    height,
  };

  // Combina a classe base, a variante e quaisquer classes personalizadas
  const classes = `${styles.skeleton} ${styles[variant]} ${className || ''}`;

  return (
    <div className={classes} style={style}></div>
  );
};

export default Skeleton;