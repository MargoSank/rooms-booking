import {Grid, IconButton, Tooltip} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

export const ProductComplimentaryTooltip = () => <Grid container direction={"row"} alignItems={"center"}>
    <Grid item>
        {"complimentary"}
    </Grid>
    <Grid item>
        <Tooltip title={"For bookings of 28 nights or more, breakfast is provided free of charge"}>
            <IconButton>
                <InfoIcon fontSize={"small"}/>
            </IconButton>
        </Tooltip>
    </Grid>
</Grid>;