import {Page} from "../web/PageRouting";

export interface RoomItem {
    id: number;
    name: string;
    pricePerNightNet: number;
    priceTaxPercentage: number;
    image: string;
    price: string;
    discount: string;
    bookingDuration: number;
}

export interface ProductItem {
    id: number;
    name: string;
    priceNet: number;
    priceTaxPercentage: number;
    chargeMethod: string;
    image: string;
    isComplimentary: boolean;
}

export interface ReservationStateInterface {
    startDate: Date;
    endDate: Date;
    checkIn: string;
    checkOut: string;
    emptyRooms: RoomItem[];
    selectedRoomId: number;
    selectedRoom: RoomItem;
    products: ProductItem[];
    selectedProducts: number[];
    price: number;
    discount: number;
    bookingId: string;
    availableScreens: Page[];
}

export interface ServerResponse {
    status: string;
    data: any;
    info: string;
}

export interface GetEmptyRoomsResponse {
    emptyRooms: RoomItem[];
}

export interface GetBookingPriceResponse {
    price: string;
    discount: string;
}

export interface GetAllProductsResponse {
    products: ProductItem[];
}

export interface GetBookingIdResponse {
    bookingId: string;
}