import {PropsWithChildren} from "react";
import {Box, Card, CardContent, Divider, List, ListItem, Typography} from "@mui/material";
import {ProductComplimentaryTooltip} from "./ProductComplimentaryTooltip";
import {ProductItem} from "../../core/interfaces";
import {ProductList} from "./ProductList";
import {PrintPrice} from "../common/PrintPrice";

export interface ProductCardProps {
    products: ProductItem[];
    days: number;
    selectedCheckBox: number[];
    checkboxHandler: (id: number) => void;
    isLoading: boolean;
}

export const ProductCardList = (props: PropsWithChildren<ProductCardProps>) => {

    if (props.products.length === 0) {
        return <Card>
            <CardContent>"All available products included in reservation"</CardContent>
        </Card>
    }

    return (
        <Card elevation={3}>
            <CardContent>
                <Typography variant={"h6"} component={"div"}>{"Products"}</Typography>
                <List>
                    <Divider/>
                    {props.products.map(product => {
                        const chargeMethod = product.chargeMethod === "once-per-booking" ? "per reservation" : "nightly";
                        const price = product.isComplimentary
                            ? <ProductComplimentaryTooltip/>
                            : <PrintPrice sum={product.priceNet} text={chargeMethod}/>;
                        return <Box key={product.id}>
                            <ListItem>
                                <ProductList id={product.id}
                                             name={product.name}
                                             image={product.image}
                                             price={price}
                                             checked={props.selectedCheckBox.includes(product.id)}
                                             checkboxHandler={props.checkboxHandler}/>
                            </ListItem>
                            <Divider/>
                        </Box>
                    })}
                </List>
            </CardContent>
        </Card>
    )
}