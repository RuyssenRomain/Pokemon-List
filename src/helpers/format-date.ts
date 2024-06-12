const formatDate = (date: Date = new Date()): string => {
    return `attrapé le : 
    ${date.getDate()}/
    ${date.getMonth() + 1}/
    ${date.getFullYear()}`;
};

export default formatDate;