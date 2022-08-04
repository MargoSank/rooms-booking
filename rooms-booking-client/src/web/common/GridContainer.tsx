import {PropsWithChildren} from "react";
import {Grid} from "@mui/material";


export const GridContainer = (props: PropsWithChildren) =>
    <Grid
        container
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
    >
        {props.children}
    </Grid>;