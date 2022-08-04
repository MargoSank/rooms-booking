import {Button, Typography} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {GridContainer} from "../common/GridContainer";

export interface NotAvailableRoomsProps {
    buttonHandler: () => void;
}

export const NotAvailableRooms = (props: NotAvailableRoomsProps) => <GridContainer>
    <Typography variant={"h4"} component={"div"} sx={{marginTop: 5, marginBottom: 5, textAlign: "center"}}>
        {"Unfortunately there are no available rooms for the selected dates and times."}
    </Typography>
    <Button
        variant={"contained"}
        startIcon={<ChevronLeftIcon/>}
        size={"medium"}
        onClick={props.buttonHandler}
    >
        {"Check new dates/times"}
    </Button>
</GridContainer>;