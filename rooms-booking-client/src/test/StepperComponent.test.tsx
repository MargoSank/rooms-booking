import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import React from "react";
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";
import {StepperComponent} from "../web/common/StepperComponent";
import {Page} from "../web/PageRouting";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {Router} from "react-router";
import {createMemoryHistory} from 'history';


describe("StepperComponent", () => {
    test('Should indicate active page', () => {
        const url = Page.DATE;
        const mockStore = configureStore()
        const store = mockStore({booking: {availableScreens: [Page.DATE]}})

        render(
            <MemoryRouter initialEntries={[url]}>
                <Provider store={store}>
                    <StepperComponent/>
                </Provider>
            </MemoryRouter>,
        )

        expect(screen.getAllByRole("StepButton")[0]).toHaveTextContent("Date selection")
        expect(screen.getAllByRole("StepButton")[0].querySelector(".MuiSvgIcon-root.Mui-active")).not.toBeNull()

        expect(screen.getAllByRole("StepButton")[1]).toHaveTextContent("Room selection")
        expect(screen.getAllByRole("StepButton")[1].querySelector(".MuiSvgIcon-root.Mui-active")).toBeNull()
    });

    test('Should navigate to page if page is available', async () => {
        const user = userEvent.setup()
        const url = Page.DATE;
        const mockStore = configureStore()
        const store = mockStore({booking: {availableScreens: [Page.DATE, Page.ROOM]}})
        const history = createMemoryHistory({initialEntries: [url]});

        render(
            <Router navigator={history} location={{}}>
                <Provider store={store}>
                    <StepperComponent/>
                </Provider>
            </Router>
        )

        await user.click(screen.getByText(/Room selection/i))
        expect(history.location.pathname).toBe("/room");
    });


    test('Should not navigate to page if page is not available', async () => {
        const user = userEvent.setup({pointerEventsCheck: 0})
        const url = Page.DATE;
        const mockStore = configureStore()
        const store = mockStore({booking: {availableScreens: [Page.DATE]}})
        const history = createMemoryHistory({initialEntries: [url]});

        render(
            <Router navigator={history} location={{}}>
                <Provider store={store}>
                    <StepperComponent/>
                </Provider>
            </Router>
        )

        await user.click(screen.getByText(/Room selection/i))
        expect(history.location.pathname).toBe("/date");
    })
})