import DateRangeIcon from "@mui/icons-material/DateRange";
import {Button} from "@mui/material";

export interface GetBackToDatPageButtonProps {
    startDate: Date;
    endDate: Date;
    text: string;
    buttonHandler: () => void;
}

export const GetBackToDataPageButton = (props: GetBackToDatPageButtonProps) => {
    return (
        <Button
            variant={"text"}
            onClick={props.buttonHandler}
            startIcon={<DateRangeIcon/>}
            sx={{color: "black", textTransform: "none", maxWidth: "400px", margin: "0 auto"}}
        >
            {`${props.text} ${props.startDate.toLocaleDateString()} - ${props.endDate.toLocaleDateString()}`}
        </Button>
    )
};