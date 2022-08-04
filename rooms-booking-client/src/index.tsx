import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './web/App';
import {BrowserRouter} from "react-router-dom";
import {CssBaseline} from "@mui/material";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(<>
    <CssBaseline/>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
</>);

