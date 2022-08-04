import {Button, Card, CardContent, CardMedia, Grid, IconButton, ListItemText, Tooltip, Typography} from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {RoomItem} from "../../core/interfaces";
import InfoIcon from "@mui/icons-material/Info";
import {useMemo} from "react";
import {getPrice} from "../utils/utilities";
import {PrintPrice} from "../common/PrintPrice";

export interface RoomCardProps {
    room: RoomItem;
    buttonHandler: (roomId: number) => void;
}

export const RoomCard = (props: RoomCardProps) => {
    return useMemo(() => {
        const nightPrice = props.room.pricePerNightNet;
        const nightText = props.room.bookingDuration > 1 ? `${props.room.bookingDuration} nights` : "1 night";
        const roomPrice = getPrice(parseFloat(props.room.price));

        return <Card sx={{maxWidth: 400, margin: 1}}>
            <CardMedia
                component={"img"}
                alt={`${props.room.name} image`}
                image={props.room.image}
                sx={{maxHeight: 200, maxWidth: 400}}
            />
            <CardContent>
                <ListItemText
                    primary={props.room.name}
                    secondary={<PrintPrice sum={nightPrice} text={"nightly"}/>}
                    primaryTypographyProps={{fontSize: "24px"}}
                />
                <Grid container alignItems={"center"} flexWrap={"nowrap"}>
                    <Typography variant={"subtitle2"} component={"span"}>
                        {`Reservation price for ${nightText} is ${roomPrice}`}
                    </Typography>
                    <Tooltip title={"Price including tax"}>
                        <IconButton>
                            <InfoIcon fontSize={"small"}/>
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Button
                    variant={"contained"}
                    endIcon={<ChevronRightIcon/>}
                    size={"medium"}
                    onClick={() => props.buttonHandler(props.room.id)}
                    sx={{ marginTop: 1}}
                >
                    {"Reserve now"}
                </Button>
            </CardContent>
        </Card>
    }, [props]);
}

