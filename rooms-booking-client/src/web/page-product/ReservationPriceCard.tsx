import {Card, CardContent, CircularProgress, Divider, List, ListItem, ListItemText, Typography} from "@mui/material";
import {ApproveBookingDialog} from "./ApproveBookingDialog";
import {getPrice} from "../utils/utilities";

export interface ReservationPriceCardProps {
    price: number;
    discount: number;
    buttonNextHandler: () => void;
    isLoading: boolean;
}

export const ReservationPriceCard = (props: ReservationPriceCardProps) => {

    const discountText = props.discount !== 0 && <ListItem>
        <ListItemText primary={"Discount"}/>
        <ListItemText primary={props.isLoading ? <CircularProgress size={15}/> : getPrice(props.discount)}/>
    </ListItem>;

    return (
        <Card elevation={3}>
            <CardContent>
                <Typography variant="h6" component={"div"}>{"Reservation"}</Typography>
                <List>
                    <Divider/>
                    <ListItem>
                        <ListItemText primary={"Price"}/>
                        <ListItemText
                            primary={props.isLoading ? <CircularProgress size={15}/> : getPrice(props.price)}/>
                    </ListItem>
                    {discountText}
                    <ApproveBookingDialog buttonNextHandler={props.buttonNextHandler} loading={props.isLoading}/>
                </List>
            </CardContent>
        </Card>
    )
};