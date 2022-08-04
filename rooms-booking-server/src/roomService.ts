import {RoomItem} from "./interfaces";
import {BookingService} from "./bookingService";

export class RoomService {
    constructor(private readonly roomsData: RoomItem[], private readonly bookingService: BookingService) {}

    public isExistingRoomId = (id: number): boolean => {
        return !!this.roomsData.find(room => room.id === id)
    }

    private getRoomById = (id: number): RoomItem => {
        const room = this.roomsData.find(room => room.id === id)
        if (room === undefined) {
            throw new Error(`Invalid room id - ${id}`)
        }
        return room;
    }

    private getReservedRoomIds = (startDate: Date, endDate: Date): number[] => {
        return this.bookingService.getBookingsByDates(startDate, endDate).map(res => res.roomId);
    }

    public getAvailableRooms = (startDate: Date, endDate: Date): RoomItem[] => {
        const reservedRooms = this.getReservedRoomIds(startDate, endDate);
        return this.roomsData.filter((room) => !reservedRooms.includes(room.id));
    }

    public getRoomPrice = (roomId: number, bookingDuration: number): { roomPrice: number; roomDiscount: number; } => {
        const room: RoomItem = this.getRoomById(roomId);

        const priceNet = room.pricePerNightNet * bookingDuration;
        const tax = priceNet * room.priceTaxPercentage
        const roomPriceWithoutDiscount = priceNet + tax;
        const roomDiscount = bookingDuration >= 3 ? 0.05 * roomPriceWithoutDiscount : 0;
        const roomPrice = roomPriceWithoutDiscount - roomDiscount;
        return {roomPrice, roomDiscount};
    }
}



