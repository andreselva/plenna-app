import './ReversePaymentModal.css';
import React, { useState, useEffect, useCallback } from 'react';
import { usePaymentManager } from '../../Hooks/PaymentManager/usePaymentManager';
import { BanknoteXIcon } from 'lucide-react';
import GenericModal from '../../Components/GenericModal/GenericModal';


const entityConfig = {
    expense: { title: 'Estornar Pagamentos da Despesa' },
    income: { title: 'Estornar Pagamentos da Receita' },
    invoice: { title: 'Estornar Pagamentos da Fatura' },
    default: { title: 'Estornar Pagamentos' },
};

export const ReversePaymentModal = ({ isOpen, onClose, entityType, entityData }) => {
    const [payments, setPayments] = useState([]);
    const { loading, getPaymentsByEntity, reversePayment } = usePaymentManager();

    const fetchPayments = useCallback(async () => {
        if (entityData?.id && entityType) {
            const fetchedPayments = await getPaymentsByEntity(entityType, entityData.id);
            setPayments(fetchedPayments);
        }
    }, [entityData, entityType, getPaymentsByEntity]);

    useEffect(() => {
        if (isOpen) {
            fetchPayments();
        }
    }, [isOpen, fetchPayments]);

    const handleReversePayment = async (paymentId) => {
        const reversePaymentData = {
            paymentId,
            entityType,
            entityId: entityData.id,
        }   
        const success = await reversePayment(reversePaymentData);
        if (success) {
            fetchPayments();
        }
    };

    const config = entityConfig[entityType] || entityConfig.default;
    const entityName = entityData?.name || entityData?.descricao || '';
    const modalTitle = `${config.title}: ${entityName}`;

    return (
        <GenericModal
            isOpen={isOpen}
            title={modalTitle}
            onCancel={onClose}
            hideSubmitButton={true}
            cancelButtonText="Fechar"
            width="600px"
        >
            <>
                {(loading || (!loading && payments.length === 0)) && (
                    <div className="payment-status-container">
                        {loading ? <p>Carregando pagamentos...</p> 
                                 : <p>Nenhum pagamento encontrado para esta entidade.</p>}
                    </div>
                )}

                {!loading && payments.length > 0 && (
                    <ul className="payment-list">
                        {payments.map((payment) => (
                            <li key={payment.id} className="payment-item">
                                <div className="payment-info">
                                    <span className="payment-date">
                                        {new Date(payment.paymentDate).toLocaleDateString('pt-BR')}
                                    </span>
                                    <strong className="payment-value">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(payment.value)}
                                    </strong>
                                </div>
                                <button
                                    className="reverse-payment-button"
                                    onClick={() => handleReversePayment(payment.id)}
                                    title="Estornar este pagamento"
                                >
                                    <BanknoteXIcon size={25} />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </>
        </GenericModal>
    );
};