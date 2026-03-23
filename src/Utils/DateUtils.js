export const getStartAndEndOfMonth = (date = '') => {
    let startOfMonth;
    let endOfMonth;
    if (date === '') {
        date = new Date();
        startOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
        endOfMonth = new Date(date.getFullYear(), date.getMonth() + 2, 0);
    } else {
        startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    }
    
    return {
        start: formatDate(startOfMonth),
        end: formatDate(endOfMonth),
    };
};

export const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const getFormattedDateRange = (startDate, endDate) => {
    const adjustedStartDate = new Date(startDate);
    adjustedStartDate.setHours(0, 0, 0, 0);

    const adjustedEndDate = new Date(endDate);
    adjustedEndDate.setHours(23, 59, 59, 999);

    return {
        start: formatDate(adjustedStartDate),
        end: formatDate(adjustedEndDate),
    };
};

export const validateDate = (date) => {
    if (!date) {
        return false;
    }
    // Valida o formato YYYY-MM-DD
    const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

    if (!regex.test(date)) {
        return false;
    }
    return true;
};

export const formatDateToPtBr = (dateValue) => {
    if (!dateValue) return '-';

    if (typeof dateValue === 'string') {
        const dateOnly = dateValue.includes('T') ? dateValue.split('T')[0] : dateValue.split(' ')[0];

        if (/^\d{4}-\d{2}-\d{2}$/.test(dateOnly)) {
            const [year, month, day] = dateOnly.split('-');
            return `${day}/${month}/${year}`;
        }
    }

    const fallbackDate = new Date(dateValue);
    if (Number.isNaN(fallbackDate.getTime())) return '-';
    return fallbackDate.toLocaleDateString('pt-BR');
};

export const getLocalISODate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};