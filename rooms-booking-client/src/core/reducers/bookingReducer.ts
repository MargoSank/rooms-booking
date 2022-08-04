import * as actions from "../actionTypes/bookingActionTypes";
import {ReservationStateInterface} from "../interfaces";
import {Page} from "../../web/PageRouting";

const initialState = (): ReservationStateInterface => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    return {
        startDate: today,
        endDate: tomorrow,
        checkIn: "15:00",
        checkOut: "12:00",
        emptyRooms: [],
        selectedRoomId: 0,
        selectedRoom: {
            id: 0,
            name: "",
            pricePerNightNet: 0,
            priceTaxPercentage: 0,
            image: "",
            price: "",
            discount: "",
            bookingDuration: 0,
        },
        products: [],
        selectedProducts: [],
        price: 0,
        discount: 0,
        bookingId: "",
        availableScreens: [Page.DATE],
    }
}

export default function bookingReducer(
    state = initialState(),
    action: actions.BookingAction
): ReservationStateInterface {
    switch (action.type) {
        case actions.SET_DATE_TIMES:
            return {
                ...state,
                startDate: action.startDate,
                endDate: action.endDate,
                checkIn: action.checkIn,
                checkOut: action.checkOut,
            };
        case actions.SET_NEW_OPEN_SCREEN:
            const screens = action.newScreen === Page.SUCCESS
                ? [Page.SUCCESS]
                : [...state.availableScreens, action.newScreen];
            return {
                ...state,
                availableScreens: screens
            };
        case actions.SET_ROOM_ID:
            const room = state.emptyRooms.find(room => room.id === action.selectedRoomId);
            if (room === undefined) {
                throw new Error("No description found for the selected room")
            }
            return {
                ...state,
                selectedRoomId: action.selectedRoomId,
                selectedRoom: room,
            };
        case actions.SET_PRODUCTS:
            return {
                ...state,
                selectedProducts: action.selectedProducts
            };
        case actions.GET_EMPTY_ROOMS_SUCCESS:
            return {
                ...state,
                emptyRooms: action.emptyRooms
            };
        case actions.GET_BOOKING_PRICE_SUCCESS:
            return {
                ...state,
                price: action.price,
                discount: action.discount
            };
        case actions.GET_ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.products
            };
        case actions.SAVE_BOOKING_SUCCESS:
            return {
                ...state,
                bookingId: action.bookingId
            };
        case actions.RESET_STORE:
            return initialState();
        default:
            return state;
    }
}



