import {useState} from "react";
import {Button, Typography, useTheme} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getEmptyRooms, setDateTimes, setNewOpenScreen} from "../../core/actionCreators/bookingActionCreators";
import {RootState} from "../../core/store/store";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {DateAndTimeSelection} from "./DateAndTimeSelection";
import {DateRange} from "@mui/x-date-pickers-pro/DateRangePicker";
import {GridContainer} from "../common/GridContainer";
import {Page} from "../PageRouting";
import useMediaQuery from "@mui/material/useMediaQuery";
import {geDateWithTime} from "../utils/utilities";

export const DatePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const store = useSelector((state: RootState) => state.booking);

    const [datesValue, setDatesValue] = useState<DateRange<Date>>([store.startDate, store.endDate]);
    const [checkIn, setCheckIn] = useState(store.checkIn);
    const [checkOut, setCheckOut] = useState(store.checkOut);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const buttonNextHandler = () => {
        if (datesValue[0] !== null && datesValue[1] !== null) {
            const startDate = geDateWithTime(datesValue[0], checkIn);
            const endDate = geDateWithTime(datesValue[1], checkOut);

            dispatch(setDateTimes(startDate, endDate, checkIn, checkOut))
            dispatch(getEmptyRooms(startDate, endDate))
            dispatch(setNewOpenScreen(Page.ROOM))
            navigate(Page.ROOM)
        }
    }

    return <GridContainer>
        <Typography variant={"h4"} component={"h1"} sx={{marginBottom: 5, textAlign: "center"}}>
            {"Choose the best hotel room for your trip!"}
        </Typography>
        <DateAndTimeSelection
            datesValue={datesValue}
            setDatesValue={setDatesValue}
            checkIn={checkIn}
            checkOut={checkOut}
            setCheckIn={setCheckIn}
            setCheckOut={setCheckOut}
            isSmallScreen={isSmallScreen}
        />
        <Button
            variant={"contained"}
            size={"large"}
            fullWidth
            endIcon={<ChevronRightIcon/>}
            onClick={buttonNextHandler}
            sx={{marginTop: 6, maxWidth: "600px"}}
        >
            {"Room search"}
        </Button>
    </GridContainer>
};