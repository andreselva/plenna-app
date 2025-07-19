import GenericModal from '../../Components/GenericModal/GenericModal';
import {HelpCircle} from 'lucide-react';
import Tooltip from '../../Components/Tooltip/Tooltip';
import {useEffect} from 'react';

const ModalRevenues = ({
                           idRevenue,
                           setIdRevenue,
                           setIsModalOpen,
                           handleAddRevenue,
                           newRevenue,
                           setNewRevenue,
                           revenueValue,
                           setRevenueValue,
                           revenueInvoiceDueDate,
                           setRevenueInvoiceDueDate,
                           categories,
                           selectedCategory,
                           setSelectedCategory,
                           setEditingRevenue,
                           typeOfInstallment,
                           setTypeOfInstallment,
                           installments,
                           setInstallments,
                           setHasInstallments,
                           hasSourceAccountId,
                           setBooleanSourceAccountId
                       }) => {
    const handleCancel = () => {
        setNewRevenue('');
        setRevenueValue('');
        setRevenueInvoiceDueDate('');
        setSelectedCategory('');
        setEditingRevenue('');
        setIsModalOpen(false);
        setInstallments('');
        setTypeOfInstallment('U');
        setBooleanSourceAccountId(false);
        setIdRevenue(0);
    };

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

    const formFields = [
        {
            fields: [
                {
                    id: 'revenueName',
                    label: 'Nome',
                    type: 'text',
                    value: newRevenue,
                    onChange: setNewRevenue,
                    placeholder: 'Ex: Salário, Freelancer...',
                    required: true,
                    size: 'full-width', // Define o tamanho do input
                },
                {
                    id: 'invoiceDueDate',
                    label: 'Vencimento',
                    type: 'date',
                    value: revenueInvoiceDueDate,
                    onChange: setRevenueInvoiceDueDate,
                    required: true,
                    size: 'half-width', // Define o tamanho do input
                },
            ],
        },
        {
            fields: [
                {
                    id: 'revenueValue',
                    label: 'Valor (R$)',
                    type: 'number',
                    value: revenueValue,
                    onChange: setRevenueValue,
                    placeholder: '0,00',
                    step: '0.01',
                    required: true,
                    size: 'half-width', // Define o tamanho do input
                },
                {
                    id: 'category',
                    label: 'Categoria',
                    type: 'select',
                    value: selectedCategory,
                    onChange: setSelectedCategory,
                    placeholder: 'Selecione',
                    required: true,
                    options: categories
                        .filter((category) => category.type.toUpperCase() === 'RECEITA')
                        .map((category) => ({value: category.id, label: category.name})),
                    size: 'half-width-large', // Define o tamanho do input
                },
            ],
        },
        {
            fields: [
                {
                    id: 'typeOfExpense',
                    label: 'Tipo de parcelamento',
                    type: 'select',
                    value: typeOfInstallment,
                    onChange: setTypeOfInstallment,
                    required: false,
                    options: [
                        {value: 'U', label: 'Única'},
                        {value: 'P', label: 'Parcelada'},
                        {value: 'F', label: 'Fixa'}
                    ],
                    size: 'half-width-large',
                    disabled: hasSourceAccountId || idRevenue > 0
                },
                {
                    id: 'parcelas',
                    label: 'Parcelas',
                    type: 'number',
                    value: installments,
                    onChange: setInstallments,
                    placeholder: 0,
                    required: typeOfInstallment === 'P',
                    size: 'half-width-medium',
                    disabled: typeOfInstallment !== 'P' || hasSourceAccountId || idRevenue > 0
                },
            ],
        },
        {
            fields: [
                {
                    id: 'hasInstallments',
                    label: (
                        <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                            Conta parcelada
                            <Tooltip
                                text="Esta conta foi dividida em múltiplas parcelas. Não é possível alterar o tipo de parcelamento e a quantidade de parcelas.">
                                <HelpCircle size={15} strokeWidth={1} style={{cursor: 'help'}}/>
                            </Tooltip>
                        </span>
                    ),
                    type: 'toggle',
                    value: typeOfInstallment === 'F' || (typeOfInstallment === 'P' && parseInt(installments) > 0),
                    onChange: () => {
                    },
                    required: false,
                    size: 'half-width-medium',
                    disabled: true,
                },
                {
                    id: 'isInstallment',
                    label: (
                        <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                            Faz parte de parcelamento
                            <Tooltip
                                text="Esta conta faz parte de um parcelamento gerado a partir de outra conta. Não é possível editar o tipo de parcelamento e a quantidade de parcelas.">
                                <HelpCircle size={15} strokeWidth={1} style={{cursor: 'help'}}/>
                            </Tooltip>
                        </span>
                    ),
                    type: 'toggle',
                    value: hasSourceAccountId,
                    onChange: () => {
                    },
                    required: false,
                    size: 'half-width-large',
                    disabled: true,
                },

            ],
        },
    ];

    return (
        <GenericModal
            isOpen={true}
            title="Cadastrar Receita"
            formFields={formFields}
            onSubmit={handleAddRevenue}
            onCancel={handleCancel}
            submitButtonText="Adicionar"
            width="500px"
            height="580px"
        />
    );
};

export default ModalRevenues;