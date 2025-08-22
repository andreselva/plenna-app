import React from 'react';
import { Receipt } from 'lucide-react';
import './HighestBillCard.css';

const HighestBillCard = ({ billData }) => {
    const { nome = 'N/D', valor = 0, vencimento = '-' } = billData || {};

    const formatCurrency = (val) => {
        const numericValue = parseFloat(String(val).replace(',', '.'));
        if (isNaN(numericValue)) return 'R$ 0,00';
        return numericValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const formatDate = (dateStr) => {
        if (!dateStr || dateStr === '-') return '-';
        const [year, month, day] = dateStr.split('-');
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="card highest-bill-card">
            <div className="highest-bill-header">
                <Receipt className="highest-bill-icon" size={20} />
                <span className="highest-bill-title">Maior Fatura</span>
            </div>
            <div className="highest-bill-body">
                <span className="bill-name">{nome}</span>
                <span className="bill-value">{formatCurrency(valor)}</span>
                <span className="bill-due-date">
                    Vencimento: {formatDate(vencimento)}
                </span>
            </div>
        </div>
    );
};

export default HighestBillCard;