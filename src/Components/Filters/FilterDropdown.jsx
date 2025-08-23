import React, { useState, useEffect } from 'react';
import './FilterDropdown.css';

/**
 * Dropdown genérico para opções de filtro avançadas.
 * @param {boolean} isOpen - Controla se o dropdown está visível.
 * @param {Function} onClose - Função para fechar o dropdown.
 * @param {Object} anchorEl - O elemento de referência para posicionar o dropdown.
 * @param {Array<Object>} filterConfig - Configuração para os campos do filtro.
 * @param {Function} onApplyFilters - Callback com os filtros aplicados.
 * @param {Function} onClearFilters - Callback para limpar os filtros.
 */
const FilterDropdown = ({ isOpen, onClose, anchorEl, filterConfig, onApplyFilters, onClearFilters, align = 'left' }) => {
    const [filters, setFilters] = useState({});

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);
        
    const style = {};
    if (anchorEl) {
        style.top = anchorEl.offsetTop + anchorEl.offsetHeight + 10;

        if (align === 'right') {
            style.left = anchorEl.offsetLeft - anchorEl.offsetWidth - 225;
        } else {
            style.left = anchorEl.offsetLeft;
        }
    }

    if (!isOpen) return null;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleApply = () => {
        onApplyFilters(filters);
        onClose();
    };
    
    const handleClear = () => {
        setFilters({});
        onClearFilters();
        onClose();
    };

    const renderFilterField = (field) => {
         switch (field.type) {
            case 'select':
                return (
                    <select name={field.name} value={filters[field.name] || ''} onChange={handleChange}>
                        <option value="">{field.placeholder || `Todos`}</option>
                        {field.options.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                );
            default:
                return null;
        }
    }

    return (
        <>
            <div className="filter-overlay-transparent" onClick={onClose}></div>
            <div className="filter-popup filter-dropdown" style={style} onClick={(e) => e.stopPropagation()}>
                <div className="filter-body">
                    {filterConfig.map(field => (
                        <div className="filter-field" key={field.name}>
                            <label>{field.label}</label>
                            {renderFilterField(field)}
                        </div>
                    ))}
                </div>
                <div className="filter-actions">
                    <button className="clear-button" onClick={handleClear}>Limpar</button>
                    <button className="apply-button" onClick={handleApply}>Aplicar</button>
                </div>
            </div>
        </>
    );
};

export default FilterDropdown;