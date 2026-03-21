import './ReversePaymentModal.css';
import React, { useState, useEffect, useCallback } from 'react';
import { usePaymentManager } from '../../Hooks/PaymentManager/usePaymentManager';
import { BanknoteXIcon } from 'lucide-react';
import GenericModal from '../../Components/GenericModal/GenericModal';
import AlertConfirm from '../../Components/Alerts/AlertConfirm';
import Loader from '../../Components/Loader/Loader';

const entityConfig = {
    revenue: { title: 'Estornar recebimentos' },
    default: { title: 'Estornar pagamentos' },
};

export const ReversePaymentModal = ({ isOpen, onClose, entityType, entityData, refetch = () => {} }) => {
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

    const handleReversePayment = async (payment) => {
        const result = await AlertConfirm({
            title: 'Estornar pagamento',
            text: 'Esta ação não pode ser desfeita. Deseja continuar com o estorno do pagamento?',
            icon: 'warning',
            confirmButtonText: 'Estornar',
            cancelButtonText: 'Não'
        });

        if (!result.isConfirmed) return;
        
        const reversePaymentData = {
            accountId: entityData.idBankAccount ?? 0,
            amount: Number(payment.value),
            paymentId: payment.id,
            referenceType: entityType,
            entityId: entityData.id
        };

        const reverseResult = await reversePayment(reversePaymentData);
        if (reverseResult && reverseResult.isSuccess) {
            fetchPayments();
            refetch();
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
                        {loading ? <Loader />
                            : <p>Nenhum pagamento encontrado.</p>}
                    </div>
                )}

                {!loading && payments.length > 0 && (
                    <ul className="payment-list">
                        {payments.map((payment) => (
                            <li key={payment.id} className="payment-item">
                                <div className="payment-info">
                                    <span className="payment-date">
                                        {new Date(payment.payment_date).toLocaleDateString('pt-BR')}
                                    </span>
                                    <strong className="payment-value">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(payment.value)}
                                    </strong>
                                </div>
                                {payment.value < 0 ? (
                                    <span className="reversed-badge">Estorno</span>
                                ) : payment.reversed?.length > 0 ? (
                                    <span className="reversed-done-badge">Estornado</span>
                                ) : (
                                    <button
                                        className="reverse-payment-button"
                                        onClick={() => handleReversePayment(payment)}
                                        title="Estornar este pagamento"
                                    >
                                        <BanknoteXIcon size={25} />
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </>
        </GenericModal>
    );
};