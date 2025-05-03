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
}

export function BotaoGlobal({
  children,
  cor = 'primaria',
  onClick,
  icone,
  width,
  height,
  padding,
  margin
}: BotaoGlobalProps) {
  return (
    <button
      className={`${Styles.botao} ${Styles[cor]}`}
      onClick={onClick}
      style={{ width, height, padding, margin }}
    >
      {icone && <span className={Styles.icone}>{icone}</span>}
      {children}
    </button>
  );
}
