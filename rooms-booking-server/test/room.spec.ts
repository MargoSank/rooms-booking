import {RoomService} from "../src/roomService";
import {BookingService} from "../src/bookingService";
import {RoomItem} from "../src/interfaces";

describe('RoomService test', () => {
    const bookingsDataTest = [
        {
            "id": 1,
            "roomId": 1,
            "startDateUtc": "2021-11-05T00:00:00.000Z",
            "endDateUtc": "2021-11-09T00:00:00.000Z"
        },
        {
            "id": 2,
            "roomId": 2,
            "startDateUtc": "2021-11-08T00:00:00.000Z",
            "endDateUtc": "2021-11-10T00:00:00.000Z"
        }
    ];
    const roomsDataTest = [
        {
            "id": 1,
            "name": "Cheap room",
            "pricePerNightNet": 56,
            "priceTaxPercentage": 0.09,
            "image": "https://via.placeholder.com/400x200.png?text=Cheap%20room"
        },
        {
            "id": 2,
            "name": "Not so cheap room",
            "pricePerNightNet": 84,
            "priceTaxPercentage": 0.09,
            "image": "https://via.placeholder.com/400x200.png?text=Not%20so%20cheap%20room"
        },
    ];
    const bookingService = new BookingService(bookingsDataTest)
    const roomService = new RoomService(roomsDataTest, bookingService)

    describe('isExistingRoomId function test', () => {
        test(`Test non-existent room id, should return false`, () => {
            const roomId = 123;

            expect(roomService.isExistingRoomId(roomId)).toStrictEqual(false);
        })

        test(`Test existing room id, should return true`, () => {
            const roomId = 1;

            expect(roomService.isExistingRoomId(roomId)).toStrictEqual(true);
        })
    });

    describe('getAvailableRooms function test', () => {
        test(`Find free rooms when everything is full, should return empty obj`, () => {
            const startDate = new Date("2021-11-07T00:00:00.000Z")
            const endDate = new Date("2021-11-10T00:00:00.000Z")
            const expectedRooms: RoomItem[] = [];

            expect(roomService.getAvailableRooms(startDate, endDate)).toStrictEqual(expectedRooms);
        })

        test(`Find free rooms when the first room is free, should return first room`, () => {
            const startDate = new Date("2021-11-09T00:00:00.000Z")
            const endDate = new Date("2021-11-11T00:00:00.000Z")
            const expectedRooms: RoomItem[] = [{
                "id": 1,
                "name": "Cheap room",
                "pricePerNightNet": 56,
                "priceTaxPercentage": 0.09,
                "image": "https://via.placeholder.com/400x200.png?text=Cheap%20room"
            }];

            expect(roomService.getAvailableRooms(startDate, endDate)).toStrictEqual(expectedRooms);
        })

        test(`Find free rooms when the second room is free, should return second room`, () => {
            const startDate = new Date("2021-11-05T00:00:00.000Z")
            const endDate = new Date("2021-11-08T00:00:00.000Z")
            const expectedRooms: RoomItem[] = [{
                "id": 2,
                "name": "Not so cheap room",
                "pricePerNightNet": 84,
                "priceTaxPercentage": 0.09,
                "image": "https://via.placeholder.com/400x200.png?text=Not%20so%20cheap%20room"
            }];

            expect(roomService.getAvailableRooms(startDate, endDate)).toStrictEqual(expectedRooms);
        })

        test(`Find free rooms when all the room is free, should return all rooms`, () => {
            const startDate = new Date("2021-11-12T00:00:00.000Z")
            const endDate = new Date("2021-11-15T00:00:00.000Z")
            const expectedRooms = roomsDataTest;

            expect(roomService.getAvailableRooms(startDate, endDate)).toStrictEqual(expectedRooms);
        })
    });

    describe('getRoomPrice function test', () => {
        test(`Test room price for 1 day, should return empty roomDiscount and roomPrice`, () => {
            const roomId = 1;
            const days = 1;
            const roomDiscount = 0;
            const roomPrice = 61.04;

            expect(roomService.getRoomPrice(roomId, days)).toStrictEqual({roomDiscount, roomPrice });
        })

        test(`Test room price for 3 day with discount,should return 5% roomDiscount and roomPrice`, () => {
            const roomId = 1;
            const days = 3;
            const roomDiscount = 9.156;
            const roomPrice = 173.964;

            expect(roomService.getRoomPrice(roomId, days)).toStrictEqual({roomDiscount, roomPrice });
        })


        test(`Test room price for 31 day with discount, should return 5% roomDiscount and roomPrice`, () => {
            const roomId = 1;
            const days = 10;
            const roomDiscount = 30.52;
            const roomPrice = 579.88;

            expect(roomService.getRoomPrice(roomId, days)).toStrictEqual({roomDiscount, roomPrice });
        })
    });

})