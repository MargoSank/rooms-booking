import {PropsWithChildren} from "react";
import {Avatar, Checkbox, ListItemAvatar, ListItemText} from "@mui/material";

export interface ProductListProps {
    id: number;
    name: string;
    image: string;
    price: JSX.Element;
    checked: boolean
    checkboxHandler: (id: number) => void;
}

export const ProductList = (props: PropsWithChildren<ProductListProps>) => <>
    <ListItemAvatar>
        <Avatar
            variant={"rounded"}
            alt={`${props.name} image`}
            src={props.image}
            sx={{maxWidth: 120, maxHeight: 60, minWidth: 60, minHeight: 30, marginRight: 1}}
        />
    </ListItemAvatar>
    <ListItemText primary={props.name} secondary={props.price}/>
    <Checkbox
        checked={props.checked}
        onChange={() => props.checkboxHandler(props.id)}
    />
</>;