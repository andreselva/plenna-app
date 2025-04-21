import { ReactNode } from 'react';
import Styles from '../../Styles/GlobalStyles.module.css';

interface BotaoGlobalProps {
  children: ReactNode;
  cor?: 'primaria' | 'secundaria' | 'vermelho';
  onClick?: () => void;
  icone?: ReactNode;
}

export function BotaoGlobal({ children, cor = 'primaria', onClick, icone }: BotaoGlobalProps) {
  return (
    <button
      className={`${Styles.botao} ${Styles[cor]}`}
      onClick={onClick}
    >
      {icone && <span className={Styles.icone}>{icone}</span>}
      {children}
    </button>
  );
}