import { BotaoGlobal } from "../../Components/Buttons/ButtonGlobal.tsx";
import styles from './BankAccounts.module.css';

export const BankAccounts = () => {
    return (
        <div className={styles.BankAccounts}>
            <div className={styles['BankAccounts-content']}>
                <BotaoGlobal className={styles['show-btn']}>
                    Incluir
                </BotaoGlobal>

                <div className={styles['card-bank-accounts']}>
                    <h3>Contas bancárias</h3>
                        
                </div>
            </div>
        </div>
    );
}