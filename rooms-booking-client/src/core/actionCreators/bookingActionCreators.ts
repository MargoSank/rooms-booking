import * as actions from "../actionTypes/bookingActionTypes";
import {SaveBookingRequestAction, SetDatesAction, SetNewOpenScreenAction} from "../actionTypes/bookingActionTypes";
import {ProductItem, RoomItem} from "../interfaces";
import {Page} from "../../web/PageRouting";

export function setDateTimes(startDate: Date, endDate: Date, checkIn: string, checkOut: string): SetDatesAction {
    return {
        type: actions.SET_DATE_TIMES,
        startDate,
        endDate,
        checkIn,
        checkOut,
    };
}

export function setNewOpenScreen(newScreen: Page): SetNewOpenScreenAction {
    return {
        type: actions.SET_NEW_OPEN_SCREEN,
        newScreen
    };
}

export function setRoomId(selectedRoomId: number): actions.SetRoomIdAction {
    return {
        type: actions.SET_ROOM_ID,
        selectedRoomId
    };
}

export function setSelectedProducts(selectedProducts: number[]): actions.SetProductsAction {
    return {
        type: actions.SET_PRODUCTS,
        selectedProducts
    };
}

export function getEmptyRooms(startDate: Date, endDate: Date): actions.GetEmptyRoomsAction {
    return {
        type: actions.GET_EMPTY_ROOMS,
        startDate,
        endDate
    };
}

export function getEmptyRoomsRequest(): actions.GetEmptyRoomsRequestAction {
    return {
        type: actions.GET_EMPTY_ROOMS_REQUEST
    };
}

export function getEmptyRoomsSuccess(emptyRooms: RoomItem[]): actions.GetEmptyRoomsSuccessAction {
    return {
        type: actions.GET_EMPTY_ROOMS_SUCCESS,
        emptyRooms,
    };
}

export function getEmptyRoomsFailure(error: any): actions.GetEmptyRoomsFailureAction {
    return {
        type: actions.GET_EMPTY_ROOMS_FAILURE,
        error
    };
}

export function getBookingPrice(roomId: number, startDate: Date, endDate: Date, selectedProducts: number[]): actions.GetBookingPriceAction {
    return {
        type: actions.GET_BOOKING_PRICE,
        selectedRoomId: roomId,
        startDate,
        endDate,
        selectedProducts,
    };
}

export function getBookingPriceRequest(): actions.GetBookingPriceRequestAction {
    return {
        type: actions.GET_BOOKING_PRICE_REQUEST
    };
}

export function getBookingPriceSuccess(price: number, discount: number): actions.GetBookingPriceSuccessAction {
    return {
        type: actions.GET_BOOKING_PRICE_SUCCESS,
        price,
        discount,
    };
}

export function getBookingPriceFailure(error: any): actions.GetBookingPriceFailureAction {
    return {
        type: actions.GET_BOOKING_PRICE_FAILURE,
        error
    };
}

export function getAllProducts(bookingDuration: number): actions.GetAllProductsAction {
    return {
        type: actions.GET_ALL_PRODUCTS,
        bookingDuration
    };
}

export function getAllProductsRequest(): actions.GetAllProductRequestAction {
    return {
        type: actions.GET_ALL_PRODUCTS_REQUEST
    };
}

export function getAllProductsSuccess(products: ProductItem[]): actions.GetAllProductSuccessAction {
    return {
        type: actions.GET_ALL_PRODUCTS_SUCCESS,
        products
    };
}

export function getAllProductsFailure(error: any): actions.GetAllProductFailureAction {
    return {
        type: actions.GET_ALL_PRODUCTS_FAILURE,
        error
    };
}

export function saveBooking(roomId: number, startDate: Date, endDate: Date, selectedProducts: number[]): actions.SaveBookingAction {
    return {
        type: actions.SAVE_BOOKING,
        selectedRoomId: roomId,
        startDate,
        endDate,
        selectedProducts,
    };
}

export function saveBookingRequest(): SaveBookingRequestAction {
    return {
        type: actions.SAVE_BOOKING_REQUEST
    };
}

export function saveBookingSuccess(bookingId: string): actions.SaveBookingSuccessAction {
    return {
        type: actions.SAVE_BOOKING_SUCCESS,
        bookingId
    };
}

export function saveBookingFailure(error: any): actions.SaveBookingFailureAction {
    return {
        type: actions.SAVE_BOOKING_FAILURE,
        error
    };
}

export function resetStore(): actions.ResetStoreAction {
    return {
        type: actions.RESET_STORE
    };
}