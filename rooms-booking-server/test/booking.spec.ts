import {BookingItem, Interval} from "../src/interfaces";
import {BookingService, getDaysDiff, hasNoIntervalOverlap} from "../src/bookingService";

interface MyInterval {
    start: number;
    end: number
}

const date: MyInterval = {start: 5, end: 10}
describe('hasNoIntervalOverlap function test', () => {

    const cases: [MyInterval, MyInterval, boolean][] = [
        [date, {start: 1, end: 2}, true],
        [date, {start: 1, end: 7}, false],
        [date, {start: 1, end: 12}, false],
        [date, {start: 6, end: 7}, false],
        [date, {start: 7, end: 12}, false],
        [date, {start: 11, end: 12}, true],
        [date, {start: 10, end: 12}, true],
    ]

    test.each(cases)(`comparing %s and %s should return %s`, (a, b, expected) => {
        const createInterval = (myInterval: MyInterval): Interval => ({
            start: new Date(myInterval.start),
            end: new Date(myInterval.end)
        });
        expect(hasNoIntervalOverlap(createInterval(a), createInterval(b))).toBe(expected);
    })
});

describe('getDaysDiff function test', () => {

    const cases: [Date, Date, number][] = [
        [new Date("2022-06-29T23:00:00.000Z"), new Date("2022-06-30T09:00:00.000Z"), 1],
        [new Date("2022-07-01T13:00:00.000Z"), new Date("2022-07-04T10:00:00.000Z"), 3],
        [new Date("2022-06-29T14:00:00.000Z"), new Date("2022-07-06T11:00:00.000Z"), 7],
        [new Date("2022-06-29T15:00:00.000Z"), new Date("2022-07-13T12:00:00.000Z"), 14],
        [new Date("2022-07-01T16:00:00.000Z"), new Date("2022-07-31T13:00:00.000Z"), 30],
        [new Date("2022-12-05T17:00:00.000Z"), new Date("2023-01-23T14:00:00.000Z"), 49],
    ]

    test.each(cases)(`comparing %s and %s should return %s number`, (a, b, expected) => {
        expect(getDaysDiff(a, b)).toBe(expected);
    })
});
describe('BookingService test', () => {
    const bookingsDataTest = [
        {
            "id": 1,
            "roomId": 2,
            "startDateUtc": "2021-01-19T09:00:00.000Z",
            "endDateUtc": "2021-01-22T13:00:00.000Z"
        },
        {
            "id": 2,
            "roomId": 1,
            "startDateUtc": "2021-11-05T09:00:00.000Z",
            "endDateUtc": "2021-11-09T13:00:00.000Z"
        }
    ];
    const bookingService = new BookingService(bookingsDataTest)

    describe('getBookingsByDates function test', () => {
        test(`Long time period, should return 2 records`, () => {
            const startDateLong = new Date("2021-01-19T00:00:00.000Z")
            const endDateLong = new Date("2021-11-09T00:00:00.000Z")
            const expectedLong = [
                {
                    "id": 1,
                    "roomId": 2,
                    "startDateUtc": "2021-01-19T09:00:00.000Z",
                    "endDateUtc": "2021-01-22T13:00:00.000Z"
                },
                {
                    "id": 2,
                    "roomId": 1,
                    "startDateUtc": "2021-11-05T09:00:00.000Z",
                    "endDateUtc": "2021-11-09T13:00:00.000Z"
                }]

            expect(bookingService.getBookingsByDates(startDateLong, endDateLong)).toStrictEqual(expectedLong);
        })

        test(`Short time period, should return 1 records`, () => {
            const startDateShort = new Date("2021-11-04T00:00:00.000Z")
            const endDateShort = new Date("2021-11-10T00:00:00.000Z")
            const expectedShort = [
                {
                    "id": 2,
                    "roomId": 1,
                    "startDateUtc": "2021-11-05T09:00:00.000Z",
                    "endDateUtc": "2021-11-09T13:00:00.000Z"
                }]

            expect(bookingService.getBookingsByDates(startDateShort, endDateShort)).toStrictEqual(expectedShort);
        })

        test(`No booking in period, should return 0 records`, () => {
            const startDateEmpty = new Date("2022-06-29T00:00:00.000Z")
            const endDateEmpty = new Date("2022-06-30T00:00:00.000Z")
            const expectedEmpty: BookingItem[] = []

            expect(bookingService.getBookingsByDates(startDateEmpty, endDateEmpty)).toStrictEqual(expectedEmpty);
        })
    });

    describe('hasBookingOverlap function test', () => {
        test(`Dates interval dont have overlap, should return false`, () => {
            const roomId = 1
            const startDate = new Date("2022-07-01T00:00:00.000Z")
            const endDate = new Date("2022-07-31T00:00:00.000Z")

            expect(bookingService.hasBookingOverlap(roomId, startDate, endDate)).toStrictEqual(false);
        })

        test(`Dates interval have overlap, should return true`, () => {
            const roomId = 1
            const startDate = new Date("2021-11-04T00:00:00.000Z")
            const endDate = new Date("2021-11-10T00:00:00.000Z")

            expect(bookingService.hasBookingOverlap(roomId, startDate, endDate)).toStrictEqual(true);
        })
    });

    describe('createNewBooking function test', () => {
        test(`A new element should be added to bookingsDataTest`, () => {
            const roomId = 2
            const startDate = "2022-07-01T14:00:00.000Z"
            const endDate = "2022-07-02T11:00:00.000Z"
            const productIds = JSON.stringify([1,3])
            const expectedData = [
                {
                    "id": 1,
                    "roomId": 2,
                    "startDateUtc": "2021-01-19T09:00:00.000Z",
                    "endDateUtc": "2021-01-22T13:00:00.000Z"
                },
                {
                    "id": 2,
                    "roomId": 1,
                    "startDateUtc": "2021-11-05T09:00:00.000Z",
                    "endDateUtc": "2021-11-09T13:00:00.000Z"
                },
                {
                    "id": 3,
                    "roomId": 2,
                    "startDateUtc": "2022-07-01T14:00:00.000Z",
                    "endDateUtc": "2022-07-02T11:00:00.000Z",
                    "products": "[1,3]"
                }]

            bookingService.createNewBooking(roomId, startDate, endDate, productIds);

            expect(bookingsDataTest).toStrictEqual(expectedData);
        })
    });
})



