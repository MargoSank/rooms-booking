import {PricingService} from "../src/pricingService";
import {BookingService} from "../src/bookingService";
import {RoomService} from "../src/roomService";
import {ProductService} from "../src/productService";
import {BookingPrices} from "../src/interfaces";


describe('pricingService  test', () => {
    const bookingsDataTest = [
        {
            "id": 1,
            "roomId": 1,
            "startDateUtc": "2021-11-05T00:00:00.000Z",
            "endDateUtc": "2021-11-09T00:00:00.000Z"
        }
    ];
    const roomsDataTest = [
        {
            "id": 1,
            "name": "Cheap room",
            "pricePerNightNet": 56,
            "priceTaxPercentage": 0.09,
            "image": "https://via.placeholder.com/400x200.png?text=Cheap%20room"
        }
    ];
    const productServiceDataTest = [
        {
            "id": 1,
            "name": "Breakfast",
            "priceNet": 6,
            "priceTaxPercentage": 0.09,
            "chargeMethod": "nightly",
            "image": "https://via.placeholder.com/400x200.png?text=Breakfast"
        },
        {
            "id": 2,
            "name": "SaunaKit",
            "priceNet": 19,
            "priceTaxPercentage": 0.09,
            "chargeMethod": "once-per-booking",
            "image": "https://via.placeholder.com/400x200.png?text=Sauna%20Kit"
        }
    ];
    const productDataTest = [1,2];
    const bookingService = new BookingService(bookingsDataTest)
    const roomService = new RoomService(roomsDataTest, bookingService)
    const productService = new ProductService(productServiceDataTest)
    const priceService = new PricingService(roomService, productService)

    const cases: [Date, Date, BookingPrices][] = [
        [new Date("2022-07-01T00:00:00.000Z"), new Date("2022-07-02T00:00:00.000Z"), {"price": "88.29", "discount": "0.00"}],
        [new Date("2022-07-01T00:00:00.000Z"), new Date("2022-07-04T00:00:00.000Z"), {"price": "214.29", "discount": "9.16"}],
        [new Date("2022-07-01T00:00:00.000Z"), new Date("2022-07-27T00:00:00.000Z"), {"price": "1698.44", "discount": "79.35"}],
        [new Date("2022-07-01T00:00:00.000Z"), new Date("2022-07-31T00:00:00.000Z"), {"price": "1760.35", "discount": "287.76"}],
    ]

    test.each(cases)(`calculate booking price from %s and date %s (with / without discounts), should return %s`, (a, b, expected) => {
        expect(priceService.getBookingPrice(1, a, b, productDataTest)).toStrictEqual(expected);
    })
});