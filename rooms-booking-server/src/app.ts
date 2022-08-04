import express from 'express';
import {BookingItem, ProductItem, RoomItem, RoomItemWithPrice} from "./interfaces";
import {BookingService, getDaysDiff} from "./bookingService";
import {RoomService} from "./roomService";
import {ProductService} from "./productService";
import {PricingService} from "./pricingService";
import {ResponseService} from "./responseService";

const roomsData = require('./data/rooms.json').data as RoomItem[];
const bookingsData = require('./data/bookings.json').data as BookingItem[];
const productsData = require('./data/products.json').data as ProductItem[];

const bookingService = new BookingService(bookingsData)
const roomService = new RoomService(roomsData, bookingService)
const productService = new ProductService(productsData)
const priceService = new PricingService(roomService, productService)

export const app = express();

app.get('/', (req, res) => {
    res.sendStatus(200);
})

app.get('/rooms', (req, res) => {
    try {
        const {start, end} = req.query;
        if (!isString(start) || !isString(end)) {
            res.send(ResponseService.validationError("Invalid query parameter"))
            return;
        }

        const startDate = new Date(start);
        const endDate = new Date(end);
        if (!isCorrectDateInterval(startDate, endDate)) {
            res.send(ResponseService.validationError("Invalid timeslots, startDate is bigger then endDate"))
            return;
        }

        const availableRooms: RoomItem[] = roomService.getAvailableRooms(startDate, endDate);
        const bookingDuration = getDaysDiff(startDate, endDate);
        const availableRoomsWithPrice: RoomItemWithPrice[] = availableRooms.map(room => {
            const {price, discount} = priceService.getBookingPrice(room.id, startDate, endDate, [])
            return {...room, price, discount, bookingDuration};
        });
        res.send(ResponseService.data(availableRoomsWithPrice));
    } catch (e) {
        res.send(ResponseService.error(e.text))
    }
})

app.get('/products', (req, res) => {
    try {
        const {days} = req.query;
        if (!isString(days)) {
            res.send(ResponseService.validationError("Invalid query parameter"))
            return;
        }
        const bookingDuration = parseInt(days, 10);

        res.send(ResponseService.data(productService.getProducts(bookingDuration)));
    } catch (e) {
        res.send(ResponseService.error(e.text))
    }
})

app.get('/price', (req, res) => {
    try {
        const {roomId, start, end, products} = req.query;
        if (!isString(start) || !isString(end) || !isString(roomId) || !isString(products)) {
            res.send(ResponseService.validationError("Invalid query parameter"))
            return;
        }
        const startDate = new Date(start);
        const endDate = new Date(end);
        const roomIdNumber = parseInt(roomId, 10);
        const productIds = products !== '' ? products.split(',').map(id => parseInt(id, 10)) : [];

        if (!isCorrectDateInterval(startDate, endDate)) {
            res.send(ResponseService.validationError("Invalid timeslots, startDate is bigger then endDate"))
            return;
        }
        if (!roomService.isExistingRoomId(roomIdNumber)) {
            res.send(ResponseService.validationError("Invalid room id"))
            return;
        }

        const bookingPrices = priceService.getBookingPrice(roomIdNumber, startDate, endDate, productIds);
        res.send(ResponseService.data(bookingPrices));
    } catch (e) {
        res.send(ResponseService.error(e.text))
    }
})

app.post('/booking', (req, res) => {
    try {
        const {roomId, start, end, products} = req.query;
        if (!isString(roomId) || !isString(start) || !isString(end) || !isString(products)) {
            res.send(ResponseService.validationError("Invalid query parameter"))
            return;
        }
        const startDate = new Date(start);
        const endDate = new Date(end);
        const roomIdNumber = parseInt(roomId, 10);

        if (!isCorrectDateInterval(startDate, endDate)) {
            res.send(ResponseService.validationError("Invalid timeslots, startDate is bigger then endDate"))
            return;
        }
        if (!roomService.isExistingRoomId(roomIdNumber)) {
            res.send(ResponseService.validationError("Invalid room id"))
            return;
        }
        if (bookingService.hasBookingOverlap(roomIdNumber, startDate, endDate)) {
            res.send(ResponseService.validationError("The new booking timeslot overlaps with the existing booking."))
            return;
        }

        const newBookingId = bookingService.createNewBooking(roomIdNumber, start, end, products);
        res.send(ResponseService.data(newBookingId));
    } catch (e) {
        res.send(ResponseService.error(e.text))
    }
})

app.listen(3001, () => {
    // console.log('The application is listening on port 3001!');
})

const isString = (a: any): a is string => {
    return typeof a === "string"
}

const isCorrectDateInterval = (start: Date, end: Date): boolean => {
    return end > start;
}