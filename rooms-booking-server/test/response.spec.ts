import {ResponseService} from "../src/responseService";

describe('responseService test', () => {
    test(`done function test with room item info, should return json`, () => {
        const info = [
            {
                id: 1,
                name: "Cheap room",
                pricePerNightNet: 56,
                priceTaxPercentage: 0.09,
                image: "https://via.placeholder.com/400x200.png?text=Cheap%20room",
                price: "617.16",
                discount: "32.48",
                daysNumber: 4
            }
        ]
        const expected = '{"status":"ok","data":[{"id":1,"name":"Cheap room","pricePerNightNet":56,' +
            '"priceTaxPercentage":0.09,"image":"https://via.placeholder.com/400x200.png?text=Cheap%20room",' +
            '"price":"617.16","discount":"32.48","daysNumber":4}]}'

        expect(ResponseService.data(info)).toStrictEqual(expected);
    })

    test(`done function test with booking price info, should return json`, () => {
        const info = "88.29"
        const expected = '{"status":"ok","data":"88.29"}'

        expect(ResponseService.data(info)).toStrictEqual(expected);
    })

    test(`error function test, should return json`, () => {
        const error = new Error("test")
        const expected = '{"status":"error","info":"test"}'

        expect(ResponseService.error(error.message)).toStrictEqual(expected);
    })

    test(`validationError function test, should return json`, () => {
        const errorMessage = "Invalid query parameter";
        const expected = '{"status":"validation error","info":"Invalid query parameter"}';

        expect(ResponseService.validationError(errorMessage)).toStrictEqual(expected);
    })
});