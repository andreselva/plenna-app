export const darkenHexColor = (hex, percent) => {
    let color = hex.startsWith('#') ? hex.slice(1) : hex;

    // Converte para decimal
    let r = parseInt(color.substring(0, 2), 16);
    let g = parseInt(color.substring(2, 4), 16);
    let b = parseInt(color.substring(4, 6), 16);

    // Calcula a porcentagem de escurecimento
    // (1 - percent / 100) é o fator de redução.
    const factor = 1 - percent / 100;
    
    // Multiplica cada componente e garante que o valor não passe de 255 ou seja menor que 0
    r = Math.floor(Math.max(0, r * factor));
    g = Math.floor(Math.max(0, g * factor));
    b = Math.floor(Math.max(0, b * factor));

    // Converte de volta para hexadecimal e garante 2 dígitos (ex: 'A' vira '0A')
    const rHex = r.toString(16).padStart(2, '0');
    const gHex = g.toString(16).padStart(2, '0');
    const bHex = b.toString(16).padStart(2, '0');

    // Retorna a cor completa
    return `#${rHex}${gHex}${bHex}`;
};