import React from 'react';
import { CalendarClock } from 'lucide-react'; // Ícone perfeito para a tarefa
import './UpcomingBillsCard.css';

const UpcomingBillsCard = ({ billsData }) => {
    const { count = 0, total = 0 } = billsData || {};

    const formatCurrency = (val) => {
        return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    return (
        <div className="card upcoming-bills-card">
            <div className="upcoming-bills-header">
                <CalendarClock className="upcoming-bills-icon" size={20} />
                <span className="upcoming-bills-title">Próximos Vencimentos - 15 dias</span>
            </div>
            <div className="upcoming-bills-body">
                {count > 0 ? (
                    <>
                        <div className="upcoming-bills-count">
                            <span>{count}</span> conta{count > 1 ? 's' : ''}
                        </div>
                        <span className="upcoming-bills-total">
                            Totalizando {formatCurrency(total)}
                        </span>
                    </>
                ) : (
                    <div className="no-bills-message">
                        Nenhuma conta a vencer nos próximos dias.
                    </div>
                )}
            </div>
        </div>
    );
};

export default UpcomingBillsCard;