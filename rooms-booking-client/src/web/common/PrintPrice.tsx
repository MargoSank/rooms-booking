import {Typography} from "@mui/material";
import {getPrice} from "../utils/utilities";

export interface PrintPriceProps {
    sum: number;
    text?: string
}

export const PrintPrice = (props: PrintPriceProps) => {
    const price = getPrice(props.sum);
    if (props.text) {
        return <Typography variant="subtitle1" component="div">{price + " " + props.text}</Typography>
    } else {
        return <Typography variant="subtitle1" component="div">{price}</Typography>
    }
}
