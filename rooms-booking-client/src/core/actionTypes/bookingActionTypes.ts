import {ProductItem, RoomItem} from "../interfaces";
import {Page} from "../../web/PageRouting";

export const SET_DATE_TIMES = "bookingActionTypes/SET_DATE_TIMES";

export interface SetDatesAction {
    type: typeof SET_DATE_TIMES;
    startDate: Date;
    endDate: Date;
    checkIn: string;
    checkOut: string;
}

export const SET_NEW_OPEN_SCREEN = "bookingActionTypes/SET_NEW_OPEN_SCREEN";

export interface SetNewOpenScreenAction {
    type: typeof SET_NEW_OPEN_SCREEN;
    newScreen: Page;
}

export const SET_ROOM_ID = "bookingActionTypes/SET_ROOM_ID";

export interface SetRoomIdAction {
    type: typeof SET_ROOM_ID;
    selectedRoomId: number;
}

export const SET_PRODUCTS = "bookingActionTypes/SET_PRODUCTS";

export interface SetProductsAction {
    type: typeof SET_PRODUCTS;
    selectedProducts: number[];
}

export const GET_EMPTY_ROOMS = "bookingActionTypes/GET_EMPTY_ROOMS";

export interface GetEmptyRoomsAction {
    type: typeof GET_EMPTY_ROOMS;
    startDate: Date;
    endDate: Date;
}

export const GET_EMPTY_ROOMS_REQUEST = "bookingActionTypes/GET_EMPTY_ROOMS_REQUEST";

export interface GetEmptyRoomsRequestAction {
    type: typeof GET_EMPTY_ROOMS_REQUEST;
}

export const GET_EMPTY_ROOMS_SUCCESS = "bookingActionTypes/GET_EMPTY_ROOMS_SUCCESS";

export interface GetEmptyRoomsSuccessAction {
    type: typeof GET_EMPTY_ROOMS_SUCCESS;
    emptyRooms: RoomItem[];
}

export const GET_EMPTY_ROOMS_FAILURE = "bookingActionTypes/GET_EMPTY_ROOMS_FAILURE";

export interface GetEmptyRoomsFailureAction {
    type: typeof GET_EMPTY_ROOMS_FAILURE;
    error: string;
}

export const GET_BOOKING_PRICE = "bookingActionTypes/GET_BOOKING_PRICE";

export interface GetBookingPriceAction {
    type: typeof GET_BOOKING_PRICE;
    selectedRoomId: number;
    startDate: Date;
    endDate: Date;
    selectedProducts: number[];
}

export const GET_BOOKING_PRICE_REQUEST = "bookingActionTypes/GET_BOOKING_PRICE_REQUEST";

export interface GetBookingPriceRequestAction {
    type: typeof GET_BOOKING_PRICE_REQUEST;
}

export const GET_BOOKING_PRICE_SUCCESS = "bookingActionTypes/GET_BOOKING_PRICE_SUCCESS";

export interface GetBookingPriceSuccessAction {
    type: typeof GET_BOOKING_PRICE_SUCCESS;
    price: number;
    discount: number;
}

export const GET_BOOKING_PRICE_FAILURE = "bookingActionTypes/GET_BOOKING_PRICE_FAILURE";

export interface GetBookingPriceFailureAction {
    type: typeof GET_BOOKING_PRICE_FAILURE;
    error: string;
}

export const GET_ALL_PRODUCTS = "bookingActionTypes/GET_ALL_PRODUCTS";

export interface GetAllProductsAction {
    type: typeof GET_ALL_PRODUCTS;
    bookingDuration: number;
}

export const GET_ALL_PRODUCTS_REQUEST = "bookingActionTypes/GET_ALL_PRODUCTS_REQUEST";

export interface GetAllProductRequestAction {
    type: typeof GET_ALL_PRODUCTS_REQUEST;
}

export const GET_ALL_PRODUCTS_SUCCESS = "bookingActionTypes/GET_ALL_PRODUCTS_SUCCESS";

export interface GetAllProductSuccessAction {
    type: typeof GET_ALL_PRODUCTS_SUCCESS;
    products: ProductItem[];
}

export const GET_ALL_PRODUCTS_FAILURE = "bookingActionTypes/GET_ALL_PRODUCTS_FAILURE";

export interface GetAllProductFailureAction {
    type: typeof GET_ALL_PRODUCTS_FAILURE;
    error: string;
}

export const SAVE_BOOKING = "bookingActionTypes/SAVE_BOOKING";

export interface SaveBookingAction {
    type: typeof SAVE_BOOKING;
    selectedRoomId: number;
    startDate: Date;
    endDate: Date;
    selectedProducts: number[];
}

export const SAVE_BOOKING_REQUEST = "bookingActionTypes/SAVE_BOOKING_REQUEST";

export interface SaveBookingRequestAction {
    type: typeof SAVE_BOOKING_REQUEST;
}

export const SAVE_BOOKING_SUCCESS = "bookingActionTypes/SAVE_BOOKING_SUCCESS";

export interface SaveBookingSuccessAction {
    type: typeof SAVE_BOOKING_SUCCESS;
    bookingId: string;
}

export const SAVE_BOOKING_FAILURE = "bookingActionTypes/SAVE_BOOKING_FAILURE";

export interface SaveBookingFailureAction {
    type: typeof SAVE_BOOKING_FAILURE;
    error: string;
}

export const RESET_STORE = "bookingActionTypes/RESET_STORE";

export interface ResetStoreAction {
    type: typeof RESET_STORE;
}

export type BookingAction =
    | SetDatesAction
    | SetNewOpenScreenAction
    | SetRoomIdAction
    | SetProductsAction
    | GetEmptyRoomsAction
    | GetEmptyRoomsRequestAction
    | GetEmptyRoomsSuccessAction
    | GetEmptyRoomsFailureAction
    | GetBookingPriceAction
    | GetBookingPriceRequestAction
    | GetBookingPriceSuccessAction
    | GetBookingPriceFailureAction
    | GetAllProductsAction
    | GetAllProductRequestAction
    | GetAllProductSuccessAction
    | GetAllProductFailureAction
    | SaveBookingAction
    | SaveBookingRequestAction
    | SaveBookingSuccessAction
    | SaveBookingFailureAction
    | ResetStoreAction;
