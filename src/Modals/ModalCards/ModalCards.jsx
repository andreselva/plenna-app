import { CardsTable } from '../../Tables/CardsTable/CardsTable';

import './ModalCards.css';

export const ModalCards = ({
    setIsModalCardOpen,
    cards
}) => {
    const handleCancel = () => {
        setIsModalCardOpen(false);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-card-content">
                <h2>Cadastrar cartão</h2>
                <div className='content-card'>
                    <CardsTable cards={cards} />
                </div>
                <div className="modal-buttons">
                    <button>
                        Salvar
                    </button>
                    <button onClick={handleCancel}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};