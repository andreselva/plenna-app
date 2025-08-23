import { useMediaQuery } from "./useMediaQuery";

/**
 * Hook customizado que retorna um objeto com o status de múltiplos breakpoints.
 * Facilita o uso de responsividade de forma declarativa nos componentes.
 * @returns {{isMobile: boolean, isTablet: boolean}}
 */
export const useBreakpoints = () => {
    // Tela pequena (ex: telemóveis)
    const isMobile = useMediaQuery('(max-width: 768px)');
    
    // Tela média (ex: tablets)
    const isTablet = useMediaQuery('(max-width: 992px)');

    return {
        isMobile,
        isTablet,
    };
};