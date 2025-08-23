import { useState, useEffect } from 'react';

/**
 * Hook customizado para verificar se uma media query CSS corresponde ao estado atual da janela.
 * @param {string} query - A string da media query (ex: '(max-width: 768px)').
 * @returns {boolean} - Retorna 'true' se a query corresponder, 'false' caso contrário.
 */
export const useMediaQuery = (query) => {
    // Estado para armazenar se a media query corresponde (true) ou não (false).
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        // 'window.matchMedia' é a API do navegador para avaliar media queries.
        const media = window.matchMedia(query);

        // Se o estado atual da media query for diferente do nosso estado, atualizamos.
        if (media.matches !== matches) {
            setMatches(media.matches);
        }

        // Criamos um 'listener' que será chamado sempre que o resultado da query mudar (ex: ao redimensionar a janela).
        const listener = () => setMatches(media.matches);
        
        // Adicionamos o listener.
        window.addEventListener('resize', listener);

        // A função de limpeza (cleanup) é muito importante! Ela remove o listener quando o componente
        // que usa o hook for "desmontado", evitando perdas de memória (memory leaks).
        return () => window.removeEventListener('resize', listener);
    }, [matches, query]); // O efeito será re-executado se 'matches' ou 'query' mudarem.

    return matches;
};