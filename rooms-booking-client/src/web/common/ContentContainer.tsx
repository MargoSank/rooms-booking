import {PropsWithChildren} from "react";
import {Box} from "@mui/material";

export const ContentContainer = (props: PropsWithChildren) => <Box
    sx={{width: '100%', margin: "30px auto", minHeight: '600px', maxWidth: '90%'}}>
    {props.children}
</Box>;