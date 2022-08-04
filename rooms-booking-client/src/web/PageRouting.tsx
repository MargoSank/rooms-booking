import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {DatePage} from "./page-date/DatePage";
import {RoomPage} from "./page-room/RoomPage";
import {ProductPage} from "./page-product/ProductPage";
import {SuccessPage} from "./page-success/SuccessPage";
import {useSelector} from "react-redux";
import {RootState} from "../core/store/store";

export enum Page {
    DATE = "/date",
    ROOM = "/room",
    PRODUCT = "/product",
    SUCCESS = "/success",
}

export const PageRouting = () => {
    const store = useSelector((state: RootState) => state.booking)
    const unlockedScreens = store.availableScreens;
    return (
        <Routes>
            <Route path="*" element={<Navigate to={unlockedScreens[0]} replace/>}/>
            {unlockedScreens.includes(Page.DATE) && <Route path={Page.DATE} element={<DatePage/>}/>}
            {unlockedScreens.includes(Page.ROOM) && <Route path={Page.ROOM} element={<RoomPage/>}/>}
            {unlockedScreens.includes(Page.PRODUCT) && <Route path={Page.PRODUCT} element={<ProductPage/>}/>}
            {unlockedScreens.includes(Page.SUCCESS) && <Route path={Page.SUCCESS} element={<SuccessPage/>}/>}
        </Routes>
    )
};