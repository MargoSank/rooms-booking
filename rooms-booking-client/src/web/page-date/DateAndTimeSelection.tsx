import {PropsWithChildren} from "react";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DateRange, DateRangePicker} from "@mui/x-date-pickers-pro/DateRangePicker";
import {Box, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, TextField} from "@mui/material";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export interface CalendarProps {
    datesValue: DateRange<Date>;
    setDatesValue: (dates: DateRange<Date>) => void;
    checkIn: string;
    checkOut: string;
    setCheckIn: (time: string) => void;
    setCheckOut: (time: string) => void;
    isSmallScreen: boolean;
}

export const DateAndTimeSelection = (props: PropsWithChildren<CalendarProps>) => {
    const checkInTimes = ["12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
    const checkOutTimes = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];

    const handleChangeDatesValue = (dates: DateRange<Date>) => props.setDatesValue(dates);
    const handleChangeCheckIn = (event: SelectChangeEvent) => props.setCheckIn(event.target.value);
    const handleChangeCheckOut = (event: SelectChangeEvent) => props.setCheckOut(event.target.value);

    const styleSelect = props.isSmallScreen ? {marginTop: 3} : {marginLeft: 3};

    return (
        <Card elevation={3}>
            <CardContent>
                <LocalizationProvider dateAdapter={AdapterDateFns} localeText={{start: "Arrival", end: "Departure"}}>
                    <DateRangePicker
                        inputFormat={"dd/MM/yyyy"}
                        disablePast
                        value={props.datesValue}
                        onChange={(newValue) => {
                            handleChangeDatesValue(newValue);
                        }}
                        renderInput={(startProps, endProps) => (
                            <Grid container direction={"column"} sx={{margin: 2}}>
                                <Box>
                                    <TextField {...startProps}/>
                                    <FormControl sx={styleSelect}>
                                        <InputLabel id={"arrival-time-label"} shrink={true}>Check-in</InputLabel>
                                        <Select
                                            labelId={"arrival-time-label"}
                                            id={"arrival-time"}
                                            value={props.checkIn}
                                            label={"Check-in"}
                                            notched={true}
                                            onChange={handleChangeCheckIn}
                                        >
                                            {checkInTimes.map(time => <MenuItem key={time}
                                                                                value={time}>{time}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                </Box>

                                <Box sx={{margin: "10px auto"}}>
                                    <ArrowDownwardIcon fontSize={"large"}/>
                                </Box>

                                <Box>
                                    <TextField{...endProps}/>
                                    <FormControl sx={styleSelect}>
                                        <InputLabel
                                            id={"departure-time-label"}
                                            shrink={true}>
                                            Check-out
                                        </InputLabel>
                                        <Select
                                            labelId={"departure-time-label"}
                                            id={"departure-time"}
                                            value={props.checkOut}
                                            label={"Check-out"}
                                            onChange={handleChangeCheckOut}
                                        >
                                            {checkOutTimes.map(time => <MenuItem key={time}
                                                                                 value={time}>{time}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                        )}
                    />
                </LocalizationProvider>
            </CardContent>
        </Card>
    )
};