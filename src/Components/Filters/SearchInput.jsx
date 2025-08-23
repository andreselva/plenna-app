import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import './SearchInput.css';

/**
 * Componente de input de pesquisa com debouncing.
 * @param {string} placeholder - O texto de placeholder do input.
 * @param {Function} onSearchChange - Função chamada com o termo da pesquisa após o debounce.
 */
const SearchInput = ({ placeholder, onSearchChange }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Efeito de Debounce: só chama onSearchChange 300ms após o utilizador parar de digitar
    useEffect(() => {
        const handler = setTimeout(() => {
            onSearchChange(searchTerm);
        }, 300);

        // Limpa o timeout se o utilizador digitar novamente
        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm, onSearchChange]);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="search-input-container">
            <Search className="search-input-icon" size={18} />
            <input
                id="search-input"
                type="text"
                className="search-input"
                placeholder={placeholder || 'Procurar...'}
                value={searchTerm}
                onChange={handleChange}
            />
        </div>
    );
};

export default SearchInput;