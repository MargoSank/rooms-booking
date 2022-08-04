import {BookingItem, Interval} from "./interfaces";

export class BookingService {
    constructor(public readonly bookingsData: BookingItem[]) {}

    public getBookingsByDates = (startDate: Date, endDate: Date): BookingItem[] => {
        return this.bookingsData.filter(roomReservation => {
            const reservationStart = new Date(roomReservation.startDateUtc);
            const reservationEnd = new Date(roomReservation.endDateUtc);
            return !hasNoIntervalOverlap({start: reservationStart, end: reservationEnd}, {
                start: startDate,
                end: endDate
            });
        });
    }

    public hasBookingOverlap = (roomId: number, startDate: Date, endDate: Date): boolean => {
        const reservations = this.getBookingsByDates(startDate, endDate).filter(reservation => reservation.roomId === roomId)
        return reservations.length > 0;
    }

    public createNewBooking = (roomId: number, startDate: string, endDate: string, productIds: string): number => {
        const newBooking = {
            id: this.getNewBookingId(),
            roomId: roomId,
            startDateUtc: startDate,
            endDateUtc: endDate,
        }
        const newBookingWithProducts =  productIds.length > 0 ? Object.assign(newBooking, {products: productIds}) : newBooking;
        this.bookingsData.push(newBookingWithProducts);
        return newBooking.id;
    }

    private getNewBookingId = (): number => this.bookingsData.at(-1).id + 1;
}

export const hasNoIntervalOverlap = (a: Interval, b: Interval): boolean => {
    return a.start >= b.end || b.start >= a.end
}

export const getDaysDiff = (day1: Date, day2: Date) => {
    const diffTime = Math.abs(day1.getTime() - day2.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

