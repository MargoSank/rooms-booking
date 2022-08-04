import {app} from "../src/app";
import {ResponseService} from "../src/responseService";

const request = require('supertest');

describe('GET requests', function () {

    test(`Test get/rooms requests with valid data, should return array with rooms`, (done) => {
        const expectedResponse = ResponseService.data([
            {
                "id": 2,
                "name": "Not so cheap room",
                "pricePerNightNet": 80,
                "priceTaxPercentage": 0.07,
                "image": "https://via.placeholder.com/400x200.png?text=Not%20so%20cheap%20room",
                "price": "325.28",
                "discount": "17.12",
                "bookingDuration": 4
            },
            {
                "id": 3,
                "name": "Expensive room",
                "pricePerNightNet": 150,
                "priceTaxPercentage": 0.07,
                "image": "https://via.placeholder.com/400x200.png?text=Expensive%20room",
                "price": "609.90",
                "discount": "32.10",
                "bookingDuration": 4
            }])
        const startDate = '2022-11-05T15:00:00.000Z';
        const endDate = '2022-11-09T13:00:00.000Z';

        request(app)
            .get(`/rooms?start=${startDate}&end=${endDate}`)
            .set('Accept', 'application/json')
            .expect(response => {
                expect(response.text).toEqual(expectedResponse)
            })
            .end(done);

    })

    test(`Test get/rooms requests with non-valid data, should return error`, (done) => {
        const expectedResponse = ResponseService.validationError("Invalid query parameter");
        const startDate = '2022-07-01T12:00:00.000Z';

        request(app)
            .get(`/rooms?start=${startDate}`)
            .set('Accept', 'application/json')
            .expect(200)
            .expect(response => {
                expect(response.text).toEqual(expectedResponse)
                return
            })
            .end(done);
    })

    test(`Test get/price requests with valid data, should return price and discount`, (done) => {
        const expectedResponse = ResponseService.data({"price":"2533.73","discount":"124.12"});
        const roomId = 2;
        const startDate = '2022-07-01T12:00:00.000Z';
        const endDate = '2022-07-30T09:00:00.000Z';
        const products = 2;

        request(app)
            .get(`/price?roomId=${roomId}&start=${startDate}&end=${endDate}&products=${products}`)
            .set('Accept', 'application/json')
            .expect(200)
            .expect(response => {
                expect(response.text).toEqual(expectedResponse)
                return
            })
            .end(done);
    })

    test(`Test get/price requests with non-valid data, should return error`, (done) => {
        const expectedResponse = ResponseService.validationError("Invalid room id");
        const roomId = 999;
        const startDate = '2022-07-01T17:00:00.000Z';
        const endDate = '2022-11-09T13:00:00.000Z';
        const products = 2;

        request(app)
            .get(`/price?roomId=${roomId}&start=${startDate}&end=${endDate}&products=${products}`)
            .set('Accept', 'application/json')
            .expect(200)
            .expect(response => {
                expect(response.text).toEqual(expectedResponse)
                return
            })
            .end(done);
    })

    test(`Test post/booking requests with valid data, should return data`, (done) => {
        const expectedResponse = ResponseService.data(4);
        const roomId = 2;
        const startDate = '2022-06-29T11:00:00.000Z';
        const endDate = '2022-07-09T11:00:00.000Z';
        const products = 2;

        request(app)
            .post(`/booking?roomId=${roomId}&start=${startDate}&end=${endDate}&products=${products}`)
            .set('Accept', 'application/json')
            .expect(200)
            .expect(response => {
                expect(response.text).toEqual(expectedResponse)
                return
            })
            .end(done);
    })

    test(`Test post/booking requests with non-valid data, should return error`, (done) => {
        const expectedResponse = ResponseService.validationError("Invalid timeslots, startDate is bigger then endDate");
        const roomId = 2;
        const endDate = '2022-06-29T13:00:00.000Z';
        const startDate = '2022-07-09T10:00:00.000Z';
        const products = '';

        request(app)
            .post(`/booking?roomId=${roomId}&start=${startDate}&end=${endDate}&products=${products}`)
            .set('Accept', 'application/json')
            .expect(200)
            .expect(response => {
                expect(response.text).toEqual(expectedResponse)
                return
            })
            .end(done);
    })
});