import {combineReducers} from "redux";
import bookingReducer from "./bookingReducer";
import isLoadingReducer from "./isLoadingReducer";

export const rootReducer = combineReducers({
    booking: bookingReducer,
    isLoading: isLoadingReducer,
});

export type AppState = ReturnType<typeof rootReducer>;