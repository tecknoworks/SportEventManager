export function messageDateFormatter(date: string) {
  const messageDate = new Date(date);
  const today = new Date();

  const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
  const isCurrentYear = messageDate.getFullYear() === today.getFullYear();
  if (messageDate.toDateString() === today.toDateString()) {
    return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else {
    const dateOptions: Intl.DateTimeFormatOptions = isCurrentYear
      ? { day: 'numeric', month: 'short' }
      : { year: 'numeric', month: 'short', day: 'numeric' };

    return `${messageDate.toLocaleTimeString([], timeOptions)} ${messageDate.toLocaleDateString([], dateOptions)}`;
  }
}
