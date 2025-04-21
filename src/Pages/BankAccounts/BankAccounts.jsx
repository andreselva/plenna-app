import { BotaoGlobal } from "../../Components/Buttons/ButtonGlobal.tsx";
import { BankAccountsTable } from "../../Tables/BankAccounts/BankAccountsTable.jsx";
import styles from './BankAccounts.module.css';

export const BankAccounts = () => {
    const accounts = [{ 'nome': 'Sicredi' }, { 'nome': 'Bradesco' }, { 'nome': 'Itaú' }, { 'nome': 'Santander' }, { 'nome': 'Caixa Econômica Federal' }, { 'nome': 'Banco do Brasil' }, { 'nome': 'Banrisul' }, { 'nome': 'Sicoob' }, { 'nome': 'Banco Inter' }, { 'nome': 'Nubank' }];

    return (
        <div className={styles.BankAccounts}>
            <div className={styles['BankAccounts-content']}>
                <BotaoGlobal className={styles['show-btn']}>
                    Incluir
                </BotaoGlobal>

                <div className={styles['card-bank-accounts']}>
                    <h3>Contas bancárias</h3>
                    <BankAccountsTable accounts={accounts} />
                </div>
            </div>
        </div>
    );
}