import { ReactNode } from 'react';
import Styles from '../../Styles/GlobalStyles.module.css';

interface BotaoGlobalProps {
  children: ReactNode;
  cor?: 'primaria' | 'secundaria' | 'vermelho' | 'nenhuma';
  onClick?: () => void;
  icone?: ReactNode;
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
  hover?: string;
}

export function BotaoGlobal({
  children,
  cor = 'primaria',
  onClick,
  icone,
  width,
  height,
  padding,
  margin,
  hover
}: BotaoGlobalProps) {
  const hoverClass = hover ? `botao-hover-${hover}` : '';

  return (
    <button
      className={`${Styles.botao} ${Styles[cor]} ${Styles[hoverClass]}`}
      onClick={onClick}
      style={{ width, height, padding, margin }}
    >
      {icone && <span className={Styles.icone}>{icone}</span>}
      {children}
    </button>
  );
}
