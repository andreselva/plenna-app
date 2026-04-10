import GenericModal from '../../Components/GenericModal/GenericModal';
import { formatDateToPtBr } from '../../Utils/DateUtils';
import './ModalChargeHistory.css';

const STATUS_LABELS = {
  DRAFT: 'Rascunho',
  PROCESSING: 'Processando',
  AWAITING_PAYMENT: 'Aguardando pagamento',
  PAID: 'Paga',
  FAILED: 'Com erro',
  CANCELLED: 'Cancelada',
  EXPIRED: 'Expirada'
};

const GATEWAY_LABELS = {
  PAGAR_ME: 'Pagar.me',
  APPMAX: 'Appmax',
  ASAAS: 'Asaas',
  MERCADO_PAGO: 'Mercado Pago',
  STRIPE: 'Stripe',
};

const TIPO_ENTIDADE_LABELS = {
  REVENUE: 'Conta a receber',
  EXPENSE: 'Conta a pagar',
  INVOICE: 'Fatura'
}

const formatCurrency = (value) => {
  const numericValue = Number(value ?? 0);
  return numericValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const formatDateTime = (value) => {
  if (!value) return '-';

  if (typeof value === 'string') {
    const normalized = value.includes('T') ? value : value.replace(' ', 'T');
    const parsedDate = new Date(normalized);

    if (!Number.isNaN(parsedDate.getTime())) {
      return parsedDate.toLocaleString('pt-BR');
    }
  }

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) return '-';
  return parsedDate.toLocaleString('pt-BR');
};

const defineStatusLabel = (status) => STATUS_LABELS[status] || status || '-';
const defineGatewayLabel = (gateway) => GATEWAY_LABELS[gateway] || gateway || '-';
const defineStatusClassName = (status) => {
  const normalizedStatus = (status || '').toLowerCase();

  if (['paid'].includes(normalizedStatus)) return 'is-success';
  if (['failed', 'canceled', 'cancelled', 'expired'].includes(normalizedStatus)) return 'is-danger';
  if (['processing'].includes(normalizedStatus)) return 'is-warning';

  return 'is-neutral';
};

const defineEntityTypeLabel = (entityType) => TIPO_ENTIDADE_LABELS[entityType] || entityType || '-';

export const ModalChargeHistory = ({ isOpen, onClose, charge, history = [] }) => {
  if (!charge) return null;

  return (
    <GenericModal
      isOpen={isOpen}
      title="Histórico da cobrança"
      onCancel={onClose}
      hideSubmitButton={true}
      cancelButtonText="Fechar"
      width="720px"
    >
      <div className="charge-history-modal">
        <div className="charge-history-hero">
          <div>
            <span className="charge-history-eyebrow">Cobranca</span>
            <h3 className="charge-history-title">{charge.title || '-'}</h3>
            <p className="charge-history-subtitle">
              ID #{charge.id || '-'} {charge.externalId ? ` | Ref. ${charge.externalId}` : ''}
            </p>
          </div>
          <span className={`charge-history-status ${defineStatusClassName(charge.status)}`}>
            {defineStatusLabel(charge.status)}
          </span>
        </div>

        <div className="charge-history-summary">
          <div className="charge-history-summary-card is-highlight">
            <span className="charge-history-label">Valor da cobranca</span>
            <strong>{formatCurrency(charge.amount)}</strong>
          </div>
          <div className="charge-history-summary-card">
            <span className="charge-history-label">Gateway</span>
            <strong>{defineGatewayLabel(charge.gateway)}</strong>
          </div>
          <div className="charge-history-summary-card">
            <span className="charge-history-label">Tipo de entidade</span>
            <strong>{defineEntityTypeLabel(charge.entityType)}</strong>
          </div>
          <div className="charge-history-summary-card">
            <span className="charge-history-label">Gerada em</span>
            <strong>{formatDateTime(charge.paymentAt)}</strong>
          </div>
          <div className="charge-history-summary-card">
            <span className="charge-history-label">Vencimento</span>
            <strong>{formatDateToPtBr(charge.dueDate)}</strong>
          </div>
          <div className="charge-history-summary-card">
            <span className="charge-history-label">Cliente</span>
            <strong>{charge.customerId || '-'}</strong>
          </div>
        </div>

        {(charge.paymentLink || charge.qrcode) && (
          <div className="charge-history-links">
            {charge.paymentLink && (
              <a href={charge.paymentLink} target="_blank" rel="noreferrer">
                Abrir link de pagamento
              </a>
            )}
            {charge.qrcode && (
              <a href={charge.qrcode} target="_blank" rel="noreferrer">
                Abrir QR Code
              </a>
            )}
          </div>
        )}

        <div className="charge-history-timeline">
          <div className="charge-history-section-header">
            <h4>Eventos da cobranca</h4>
            <span>{history.length} registro(s)</span>
          </div>

          {history.length === 0 ? (
            <p className="charge-history-empty">Nenhum evento encontrado para esta cobrança.</p>
          ) : (
            history.map((item) => (
              <div key={item.id} className="charge-history-event">
                <div className="charge-history-dot" />
                <div className="charge-history-content">
                  <div className="charge-history-header">
                    <strong>{item.event || 'Evento'}</strong>
                    <span>{formatDateTime(item.createdAt)}</span>
                  </div>
                  <p>{item.description || 'Sem descrição adicional.'}</p>
                  <small>Responsável: {item.username || '-'}</small>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </GenericModal>
  );
};
