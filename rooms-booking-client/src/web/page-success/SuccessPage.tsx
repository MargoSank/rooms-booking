import * as React from "react";
import {useMemo} from "react";
import {Button, Card, CardContent, Divider, List, ListItemText, Typography, useTheme} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../core/store/store";
import {resetStore} from "../../core/actionCreators/bookingActionCreators";
import {GridContainer} from "../common/GridContainer";
import {LoadingText} from "../common/LoadingText";
import {SAVE_BOOKING} from "../../core/actionTypes/bookingActionTypes";
import {Page} from "../PageRouting";
import {getPrice} from "../utils/utilities";
import useMediaQuery from "@mui/material/useMediaQuery";

export const SuccessPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const store = useSelector((state: RootState) => state.booking);
    const isLoadingBooking = useSelector((state: RootState) => state.isLoading[SAVE_BOOKING])

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const room = store.selectedRoom;
    const buttonNextHandler = () => {
        dispatch(resetStore())
        navigate(Page.DATE)
    }

    const productList = useMemo(() => {
        return store.products
            .filter(product => store.selectedProducts.includes(product.id))
            .map(product => <ListItemText
                key={product.id}
                primary={product.name}
                secondary={`${getPrice(product.priceNet)} ${product.chargeMethod === "once-per-booking" ? "per reservation" : "nightly"}`}
            />);
    }, [store])

    if (isLoadingBooking) {
        return <LoadingText text={"Reservation in progress"}/>
    }

    const body = <>
        <Typography variant={"h6"} component={"div"} sx={{textAlign: "center"}}>
            {"Reservation summary"}
        </Typography>
        <List>
            <ListItemText primary={"Room:"}/>
            <ListItemText primary={room.name} secondary={"Room name"}/>
            <ListItemText
                primary={`${store.startDate.toLocaleDateString()} ${store.checkIn} - ${store.endDate.toLocaleDateString()} ${store.checkOut}`}
                secondary="Booking dates"/>
            <Divider/>
            {store.selectedProducts.length !== 0 &&
                <>
                    <ListItemText primary={"ProductPage:"}/>
                    {productList}
                    <Divider/>
                </>
            }
            <ListItemText primary="Price:"/>
            <ListItemText primary={`${getPrice(store.price)}`} secondary={"Price"}/>
            <ListItemText primary={`${getPrice(store.discount)}`} secondary={"Saved with discounts"}/>
        </List>
    </>

    return (
        <GridContainer>
            <Typography variant={"h4"} component={"h2"}
                        sx={{marginBottom: 3, textAlign: "center"}}>{"Reservation Successful!"}</Typography>
            <Typography variant={"h6"} component={"div"}
                        sx={{marginBottom: 3}}>{`Reservation ID: ${store.bookingId}`}</Typography>
            {isSmallScreen
                ? body
                : <Card elevation={3} sx={{width: "60%"}}>
                    <CardContent>
                        {body}
                    </CardContent>
                </Card>}
            <Button variant={"contained"}
                    startIcon={<SearchIcon/>}
                    size={"large"}
                    onClick={buttonNextHandler}
                    sx={{maxWidth: 250, marginTop: 3}}
            >
                {"Find another room"}
            </Button>
        </GridContainer>
    )
}