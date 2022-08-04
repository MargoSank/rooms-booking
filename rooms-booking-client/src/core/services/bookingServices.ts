import {
    GetAllProductsResponse,
    GetBookingIdResponse,
    GetBookingPriceResponse,
    GetEmptyRoomsResponse,
    ServerResponse
} from "../interfaces";

const parseResponse = (response: ServerResponse) => {
    if (response.status === 'ok') {
        return response.data;
    } else {
        throw new Error(response.info);
    }
}

export async function getEmptyRooms(startDate: Date, endDate: Date): Promise<GetEmptyRoomsResponse> {
    return fetch(`/rooms?start=${startDate.toISOString()}&end=${endDate.toISOString()}`)
        .then(res => res.json())
        .then(res => parseResponse(res))

}

export async function getBookingPrice(selectedRoomId: number, startDate: Date, endDate: Date, selectedProducts: number[]): Promise<GetBookingPriceResponse> {
    return fetch(`/price?roomId=${selectedRoomId}&start=${startDate.toISOString()}&end=${endDate.toISOString()}&products=${selectedProducts}`)
        .then(res => res.json())
        .then(res => parseResponse(res))
}

export async function getAllProducts(bookingDuration: number): Promise<GetAllProductsResponse> {
    return fetch(`/products?days=${bookingDuration}`)
        .then(res => res.json())
        .then(res => parseResponse(res));
}

export async function saveBooking(selectedRoomId: number, startDate: Date, endDate: Date, selectedProducts: number[]): Promise<GetBookingIdResponse> {
    return fetch(`/booking?roomId=${selectedRoomId}&start=${startDate.toISOString()}&end=${endDate.toISOString()}&products=${selectedProducts}`, {method: "POST"})
        .then(res => res.json())
        .then(res => parseResponse(res));
}