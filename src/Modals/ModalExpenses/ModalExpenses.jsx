import { HelpCircle } from 'lucide-react';
import GenericModal from '../../Components/GenericModal/GenericModal';
import Tooltip from '../../Components/Tooltip/Tooltip';
import { useEffect, useState, useMemo } from 'react';
import { useInvoiceHandler } from '../../Handlers/useInvoiceHandler';

const ModalExpenses = ({
  idExpense,
  setIsModalOpen,
  handleAddExpense,
  newExpense,
  setNewExpense,
  expenseValue,
  setExpenseValue,
  expenseInvoiceDueDate,
  setExpenseInvoiceDueDate,
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
  setEditingExpense,
  creditCards,
  accounts,
  selectedCard,
  setSelectedCard,
  selectedBankAccount,
  setSelectedBankAccount,
  installments,
  setInstallments,
  typeOfInstallment,
  setTypeOfInstallment,
  setHasInstallments,
  hasSourceAccountId,
  setBooleanSourceAccountId,
  setIdExpense,
  linkToInvoice,
  setLinkToInvoice,
  idInvoice,
  setIdInvoice,
  status,
  setStatus,
  optionsStatus
}) => {
  const handleCancel = () => {
    setNewExpense('');
    setExpenseValue('');
    setExpenseInvoiceDueDate('');
    setSelectedCategory('');
    setSelectedSubcategory && setSelectedSubcategory('');
    setSelectedCard('');
    setSelectedBankAccount('');
    setEditingExpense('');
    setIsModalOpen(false);
    setInstallments('');
    setTypeOfInstallment('U');
    setBooleanSourceAccountId(false);
    setIdExpense(0);
    setIdInvoice('');
    setInvoices([]);
    setStatus('pending');
    setLinkToInvoice(false);
    setHasInstallments(false);
  };

  const { handleSearchRelatedInvoices } = useInvoiceHandler();
  const [invoices, setInvoices] = useState([]);
  const [loadingModal, setLoadingModal] = useState(false);

  const selectedCategoryObj = useMemo(
    () => categories.find((c) => String(c.id) === String(selectedCategory)),
    [categories, selectedCategory]
  );

  const subcategories = selectedCategoryObj?.subcategories || [];
  const hasSubcategories = subcategories.length > 0;

  useEffect(() => {
    if (!setSelectedSubcategory) return;
    if (!hasSubcategories) {
      setSelectedSubcategory('');
      return;
    }
    const exists = subcategories.some((sc) => String(sc.id) === String(selectedSubcategory));
    if (!exists) {
      setSelectedSubcategory('');
    }
  }, [hasSubcategories, subcategories, selectedSubcategory, setSelectedSubcategory, selectedCategory]);

  useEffect(() => {
    if (typeOfInstallment === 'F') {
      setInstallments('');
      setHasInstallments(true);
    } else if (typeOfInstallment === 'P') {
      setHasInstallments(true);
    } else {
      setInstallments('');
      setHasInstallments(false);
    }
  }, [typeOfInstallment, setInstallments, setHasInstallments]);

  const onSelectedCardChange = (newCardId) => {
    setSelectedCard(newCardId);
    setIdInvoice('');
  };

  useEffect(() => {
    const fetchAndSetInvoices = async (cardId) => {
      if (!cardId) {
        setInvoices([]);
        return;
      }
      try {
        setLoadingModal(true);
        const fetchedInvoices = await handleSearchRelatedInvoices(cardId);
        setInvoices(fetchedInvoices || []);
        if (idInvoice) {
          setIdInvoice(String(idInvoice));
        }
      } catch (error) {
        console.error('Erro ao buscar faturas relacionadas:', error);
        setInvoices([]);
      } finally {
        setLoadingModal(false);
      }
    };

    if (linkToInvoice) {
      fetchAndSetInvoices(selectedCard);
    } else {
      setInvoices([]);
      setIdInvoice('');
    }
  }, [linkToInvoice, selectedCard, handleSearchRelatedInvoices, idInvoice, setIdInvoice]);

  useEffect(() => {
    if (idInvoice && invoices.length > 0) {
      const selectedInvoice = invoices.find((invoice) => String(invoice.id) === String(idInvoice));
      if (selectedInvoice) {
        setExpenseInvoiceDueDate(selectedInvoice.dueDate);
      }
    }
  }, [idInvoice, invoices, setExpenseInvoiceDueDate]);

  let formFields = [
    {
      title: 'Geral',
      fields: [
        {
          id: 'expenseName',
          label: 'Nome',
          type: 'text',
          value: newExpense,
          onChange: setNewExpense,
          placeholder: 'Ex: Luz, Internet...',
          required: true,
          size: 'half-width-large',
        },
        {
          id: 'invoiceDueDate',
          label: 'Vencimento',
          type: 'date',
          value: expenseInvoiceDueDate,
          onChange: setExpenseInvoiceDueDate,
          required: true,
          size: 'half-width-medium',
        },
        {
          id: 'statusExpense',
          label: 'Situação',
          type: 'select',
          value: status,
          onChange: setStatus,
          required: true,
          disabled: idInvoice > 0,
          options: optionsStatus.map((option) => ({ value: option.id, label: option.name })),
          size: 'half-width-medium',
        },
      ],
    },
    {
      fields: [
        {
          id: 'expenseValue',
          label: 'Valor R$',
          type: 'number',
          value: expenseValue,
          onChange: setExpenseValue,
          placeholder: '0,00',
          required: true,
          size: 'half-width-middle-medium',
        },
        {
          id: 'category',
          label: 'Categoria',
          type: 'select',
          value: selectedCategory,
          onChange: (val) => {
            setSelectedCategory(val);
            if (setSelectedSubcategory) setSelectedSubcategory('');
          },
          placeholder: 'Selecione uma categoria',
          required: true,
          options: categories
            .filter((category) => String(category.type).toUpperCase() === 'DESPESA')
            .map((category) => ({ value: String(category.id), label: category.name })),
          size: 'half-width-large',
        },
      ],
    },
    {
      fields: [
        {
          id: 'bankAccount',
          label: 'Conta bancária',
          type: 'select',
          value: selectedBankAccount,
          onChange: setSelectedBankAccount,
          placeholder: 'Selecione a conta',
          required: false,
          options: accounts.map((account) => ({ value: String(account.id), label: account.name })),
          size: 'full-width',
        },
      ],
    },
  ];

  if (hasSubcategories) {
    formFields.push({
      fields: [
        {
          id: 'subcategory',
          label: 'Subcategoria',
          type: 'select',
          value: selectedSubcategory || '',
          onChange: setSelectedSubcategory,
          placeholder: 'Selecione a subcategoria',
          required: false,
          options: subcategories.map((sc) => ({ value: String(sc.id), label: sc.name })),
          size: 'half-width-large',
        },
      ],
    });
  }

  formFields.push(
    {
      title: 'Parcelamento',
      fields: [
        {
          id: 'typeOfExpense',
          label: 'Tipo de parcelamento',
          type: 'select',
          value: typeOfInstallment,
          onChange: setTypeOfInstallment,
          required: false,
          options: [
            { value: 'U', label: 'Única' },
            { value: 'P', label: 'Parcelada' },
            { value: 'F', label: 'Fixa' },
          ],
          size: 'half-width-large',
          disabled: hasSourceAccountId || idExpense > 0,
        },
        {
          id: 'parcelas',
          label: 'Parcelas',
          type: 'number',
          value: installments,
          onChange: setInstallments,
          placeholder: 0,
          required: typeOfInstallment === 'P',
          size: 'half-width-small',
          disabled: typeOfInstallment !== 'P' || hasSourceAccountId || idExpense > 0,
        },
      ],
    },
    {
      fields: [
        {
          id: 'hasInstallments',
          label: (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              Conta parcelada
              <Tooltip text="Esta conta foi dividida em múltiplas parcelas.">
                <HelpCircle size={15} strokeWidth={1} style={{ cursor: 'help' }} />
              </Tooltip>
            </span>
          ),
          type: 'toggle',
          value: typeOfInstallment === 'F' || (typeOfInstallment === 'P' && parseInt(installments) > 0),
          onChange: () => {},
          required: false,
          size: 'half-width-medium',
          disabled: true,
        },
        {
          id: 'isInstallment',
          label: (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              Faz parte de parcelamento
              <Tooltip text="Esta conta faz parte de um parcelamento gerado a partir de outra conta. Não é possível editar o tipo de parcelamento e a quantidade de parcelas.">
                <HelpCircle size={15} strokeWidth={1} style={{ cursor: 'help' }} />
              </Tooltip>
            </span>
          ),
          type: 'toggle',
          value: hasSourceAccountId,
          onChange: () => {},
          required: false,
          size: 'half-width-large',
          disabled: true,
        },
      ],
    },
    {
      title: 'Fatura',
      fields: [
        {
          id: 'linkToInvoice',
          label: 'Vincular a fatura?',
          type: 'toggle',
          value: linkToInvoice,
          onChange: (value) => setLinkToInvoice(value),
          required: false,
          size: 'half-width-small',
          disabled: false,
        },
      ],
    }
  );

  if (linkToInvoice) {
    formFields.push({
      fields: [
        {
          id: 'account',
          label: 'Conta bancária (Cartão)',
          type: 'select',
          value: selectedCard,
          onChange: onSelectedCardChange,
          placeholder: 'Selecione um cartão',
          required: true,
          options: creditCards
            .filter((account) => account.generateInvoice === true)
            .map((account) => ({ value: String(account.id), label: account.name })),
          size: 'half-width-middle-medium',
        },
        {
          id: 'invoices',
          label: 'Fatura',
          type: 'select',
          value: idInvoice,
          onChange: (value) => setIdInvoice(value),
          placeholder: !selectedCard ? 'Selecione um cartão' : invoices.length === 0 ? 'Nenhuma fatura encontrada' : 'Selecione a fatura',
          required: true,
          options: invoices.map((invoice) => ({
            value: String(invoice.id),
            label: invoice.name,
          })),
          disabled: !selectedCard || invoices.length === 0,
          size: 'half-width-large',
        },
      ],
    });
  }

  return (
    <GenericModal
      isOpen={true}
      title={idExpense > 0 ? 'Editar despesa' : 'Cadastrar despesa'}
      formFields={formFields}
      onSubmit={handleAddExpense}
      onCancel={handleCancel}
      submitButtonText="Salvar"
      width="700px"
      loading={loadingModal}
    />
  );
};

export default ModalExpenses;