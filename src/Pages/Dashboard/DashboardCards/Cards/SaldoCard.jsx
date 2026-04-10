import React from 'react';
import { Wallet } from 'lucide-react';
import './SaldoCard.css';

const getBalanceStatus = (finalBalance, revenues) => {
    if (revenues <= 0) {
        return finalBalance < 0 ? 'status-critical' : 'status-neutral';
    }
    const percentage = (finalBalance / revenues) * 100;
    if (finalBalance < 0) return 'status-critical';
    if (percentage < 25) return 'status-warning';
    if (percentage < 50) return 'status-healthy';
    return 'status-excellent';
};

const SaldoCard = ({ saldoData }) => {
    const { revenues = 0, expenses = 0 } = saldoData || {};
    const finalBalance = revenues - expenses;
    const balanceClass = getBalanceStatus(finalBalance, revenues);

    const formatCurrency = (value) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    return (
        <div className="card saldo-card">
            <div className="saldo-header">
                <Wallet className="saldo-icon" size={20} />
                <span className="saldo-title">Saldo do Período</span>
            </div>
            <div className="saldo-body">
                <div className={`saldo-final ${balanceClass}`}>
                    {formatCurrency(finalBalance)}
                </div>
                <div className="saldo-details">
                    <span>Contas a receber: {formatCurrency(revenues)}</span>
                    <span>Contas a pagar: {formatCurrency(expenses)}</span>
                </div>
            </div>
        </div>
    );
};

export default SaldoCard;