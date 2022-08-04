import {RoomItem} from "../../core/interfaces";
import {Grid, Typography} from "@mui/material";
import {RoomCard} from "./RoomCard";
import {LoadingText} from "../common/LoadingText";

export interface AvailableRoomsProps {
    rooms: RoomItem[];
    buttonNextHandler: (roomId: number) => void;
    loading: boolean;
    emptyRoomsInfo: JSX.Element;
}

export const RoomList = (props: AvailableRoomsProps) => {
    if (props.loading) {
        return <LoadingText text={"We are looking for suitable rooms"}/>
    }

    if (props.rooms.length === 0) {
        return props.emptyRoomsInfo
    }

    return (
        <>
            <Typography variant={"h4"} component={"h2"} sx={{marginTop: 5, marginBottom: 2, textAlign: "center"}}>
                {"Select room"}
            </Typography>
            <Grid container direction={"row"} justifyContent={"center"}>
                {props.rooms.map(room => <RoomCard key={room.id} room={room} buttonHandler={props.buttonNextHandler}/>)}
            </Grid>
        </>
    )
}