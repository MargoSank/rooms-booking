import {PropsWithChildren} from "react";
import Container from '@mui/material/Container';

export const AppContainer = (props: PropsWithChildren) =>
    <Container maxWidth="xl">
        {props.children}
    </Container>;