import {useEffect, useState} from "react";
import {Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {GetBackToDataPageButton} from "../common/GetBackToDataPageButton";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../core/store/store";
import {ReservationPriceCard} from "./ReservationPriceCard";
import {SelectedRoomCard} from "./SelectedRoomCard";
import {ProductCardList} from "./ProductCardList";
import {
    getBookingPrice,
    saveBooking,
    setNewOpenScreen,
    setSelectedProducts
} from "../../core/actionCreators/bookingActionCreators";
import {GET_ALL_PRODUCTS, GET_BOOKING_PRICE} from "../../core/actionTypes/bookingActionTypes";
import {Page} from "../PageRouting";

export const ProductPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const store = useSelector((state: RootState) => state.booking);
    const loading = useSelector((state: RootState) => state.isLoading)

    const [productsCheckBox, setProductsCheckBox] = useState<number[]>(store.selectedProducts)
    const isLoadingProducts = loading[GET_ALL_PRODUCTS];
    const isLoadingPrice = loading[GET_BOOKING_PRICE];
    const room = store.selectedRoom;

    useEffect(() => {
        dispatch(getBookingPrice(room.id, store.startDate, store.endDate, store.selectedProducts))
    }, [room.id, store.startDate, store.endDate, JSON.stringify(store.selectedProducts), dispatch]);

    useEffect(() => {
        dispatch(setSelectedProducts(productsCheckBox))
    }, [JSON.stringify(productsCheckBox), dispatch]);

    const datePageButtonHandler = () => navigate(Page.DATE);
    const backButtonHandler = () => navigate(Page.ROOM);
    const nextButtonHandler = () => {
        dispatch(saveBooking(room.id, store.startDate, store.endDate, store.selectedProducts))
        dispatch(setNewOpenScreen(Page.SUCCESS))
        navigate(Page.SUCCESS)
    }

    const checkboxHandler = (productId: number) => {
        setProductsCheckBox(prevState => {
            const index = prevState.indexOf(productId);
            if (index === -1) {
                prevState.push(productId);
            } else {
                prevState.splice(index, 1);
            }
            return [...prevState];
        })
    }

    return (
        <Grid container direction={"column"}>
            <GetBackToDataPageButton
                text={"Reservation time"}
                startDate={store.startDate}
                endDate={store.endDate}
                buttonHandler={datePageButtonHandler}
            />
            <Typography variant={"h4"} component={"div"} sx={{marginTop: 5, marginBottom: 2, textAlign: "center"}}>
                {"Reservation details"}
            </Typography>
            <Grid container direction={"row"} item spacing={2}>
                <Grid item xs={12} md={6}>
                    <ProductCardList
                        products={store.products}
                        days={room.bookingDuration}
                        selectedCheckBox={productsCheckBox}
                        checkboxHandler={checkboxHandler}
                        isLoading={isLoadingProducts}
                    />
                </Grid>
                <Grid container direction="column" rowGap={2} item xs={12} md={6}>
                    <SelectedRoomCard
                        name={room.name}
                        image={room.image}
                        buttonHandler={backButtonHandler}/>
                    <ReservationPriceCard
                        price={store.price}
                        discount={store.discount}
                        buttonNextHandler={nextButtonHandler}
                        isLoading={isLoadingPrice}/>
                </Grid>
            </Grid>
        </Grid>
    )
}