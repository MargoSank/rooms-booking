export const geDateWithTime = (date: Date, time: string): Date => {
    const hour = parseInt(time, 10);
    return new Date(date.setHours(hour, 0, 0));
}

export const getPrice = (sum: number) => new Intl.NumberFormat('en-EE', {
    style: 'currency',
    currency: 'EUR'
}).format(sum);