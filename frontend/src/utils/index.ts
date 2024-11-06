export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  const optionsDate: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };
  const formattedDate = date.toLocaleDateString("fr-FR", optionsDate);
  const formattedTime = date.toLocaleTimeString("fr-FR", optionsTime);
  return { formattedDate, formattedTime };
};
