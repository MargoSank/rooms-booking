import {all, call, fork, put, takeEvery, takeLatest} from "redux-saga/effects";
import {getAllProducts, getBookingPrice, getEmptyRooms, saveBooking} from "../services/bookingServices";
import * as actionCreators from "../actionCreators/bookingActionCreators";
import * as actionTypes from "../actionTypes/bookingActionTypes";
import {ProductItem, RoomItem} from "../interfaces";


export function* onGetEmptyRooms({startDate, endDate}: actionTypes.GetEmptyRoomsAction) {
    try {
        yield put(actionCreators.getEmptyRoomsRequest());
        const emptyRooms: RoomItem[] = yield call(getEmptyRooms, startDate, endDate);
        yield put(actionCreators.getEmptyRoomsSuccess(emptyRooms));
    } catch (error) {
        yield put(actionCreators.getEmptyRoomsFailure(error));
    }
}

export function* onGetBookingPrice({selectedRoomId, startDate, endDate, selectedProducts}: actionTypes.GetBookingPriceAction) {
    try {
        yield put(actionCreators.getBookingPriceRequest());
        const {price, discount} = yield call(getBookingPrice, selectedRoomId, startDate, endDate, selectedProducts);
        yield put(actionCreators.getBookingPriceSuccess(parseFloat(price), parseFloat(discount)));
    } catch (error) {
        yield put(actionCreators.getBookingPriceFailure(error));
    }
}

export function* onGetAllProducts({bookingDuration}: actionTypes.GetAllProductsAction) {
    try {
        yield put(actionCreators.getAllProductsRequest());
        const products: ProductItem[] = yield call(getAllProducts, bookingDuration);
        yield put(actionCreators.getAllProductsSuccess(products));
    } catch (error) {
        yield put(actionCreators.getAllProductsFailure(error));
    }
}


export function* onSaveBooking({selectedRoomId, startDate, endDate, selectedProducts}: actionTypes.SaveBookingAction) {
    try {
        yield put(actionCreators.saveBookingRequest());
        const bookingId: string = yield call(saveBooking, selectedRoomId, startDate, endDate, selectedProducts);
        yield put(actionCreators.saveBookingSuccess(bookingId));
    } catch (error) {
        yield put(actionCreators.saveBookingFailure(error));
    }
}

function* watchOnBooking() {
    yield takeEvery(actionTypes.GET_EMPTY_ROOMS, onGetEmptyRooms);
    yield takeLatest(actionTypes.GET_BOOKING_PRICE, onGetBookingPrice);
    yield takeLatest(actionTypes.GET_ALL_PRODUCTS, onGetAllProducts);
    yield takeEvery(actionTypes.SAVE_BOOKING, onSaveBooking);
}

export function* bookingSaga() {
    yield all([fork(watchOnBooking)]);
}