export const getStartAndEndOfMonth = (date = new Date()) => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

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
