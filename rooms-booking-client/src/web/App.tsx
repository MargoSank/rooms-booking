import React from 'react';
import {AppContainer} from "./common/AppContainer";
import {Provider} from "react-redux";
import {store} from "../core/store/store";
import {StepperComponent} from "./common/StepperComponent";
import {PageRouting} from "./PageRouting";
import {ContentContainer} from "./common/ContentContainer";

export function App() {
    return (
        <Provider store={store}>
            <AppContainer>
                <StepperComponent>
                    <ContentContainer>
                        <PageRouting/>
                    </ContentContainer>
                </StepperComponent>
            </AppContainer>
        </Provider>
    );
}
