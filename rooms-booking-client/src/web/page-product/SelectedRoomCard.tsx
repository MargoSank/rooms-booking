import {
    Avatar,
    Card,
    CardContent,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from "@mui/material";

export interface OverallRoomCardProps {
    name: string;
    image: string;
    buttonHandler: () => void;
}

export const SelectedRoomCard = (props: OverallRoomCardProps) => <Card elevation={3}>
    <CardContent>
        <Typography variant={"h6"} component={"h2"}>
            {"Selected room"}
        </Typography>
        <List>
            <Divider/>
            <ListItem onClick={props.buttonHandler} sx={{cursor: "pointer"}}>
                <ListItemAvatar>
                    <ListItemText primary={props.name} secondary={"Room name"}/>
                    <Avatar
                        variant={"rounded"}
                        alt={`${props.name} image`}
                        src={props.image}
                        sx={{width: 120, height: 60}}
                    />
                </ListItemAvatar>
            </ListItem>
        </List>
    </CardContent>
</Card>;