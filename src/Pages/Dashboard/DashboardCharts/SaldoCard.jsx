// Arquivo: SaldoCard.jsx
import React from 'react';
import { Wallet } from 'lucide-react'; // Importando um ícone para o saldo
import './SaldoCard.css';

// A função getBalanceStatus continua a mesma
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
        // A classe base 'card' e a específica 'saldo-card' continuam as mesmas
        <div className="card saldo-card">
            {/* NOVO: Cabeçalho padronizado com ícone e título */}
            <div className="saldo-header">
                <Wallet className="saldo-icon" size={20} />
                <span className="saldo-title">Saldo do Período</span>
            </div>
            {/* NOVO: Corpo padronizado */}
            <div className="saldo-body">
                <div className={`saldo-final ${balanceClass}`}>
                    {formatCurrency(finalBalance)}
                </div>
                <div className="saldo-details">
                    <span>Receitas: {formatCurrency(revenues)}</span>
                    <span>Despesas: {formatCurrency(expenses)}</span>
                </div>
            </div>
        </div>
    );
};

export default SaldoCard;