import {CircularProgress, Typography} from "@mui/material";

export interface LoadingTextProps {
    text: string
}

export const LoadingText = (props: LoadingTextProps) => <Typography variant={"h4"} component={"h3"} sx={{
    marginTop: 5,
    marginBottom: 5,
    textAlign: "center"
}}>
    {props.text} <CircularProgress size={50}/>
</Typography>;