import {PropsWithChildren, useEffect, useState} from "react";
import {Box, Step, StepButton, Stepper, useTheme} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../core/store/store";
import {Page} from "../PageRouting";
import useMediaQuery from '@mui/material/useMediaQuery';

const steps = [
    {label: 'Date selection', url: Page.DATE},
    {label: 'Room selection', url: Page.ROOM},
    {label: 'Details', url: Page.PRODUCT},
    {label: 'Success', url: Page.SUCCESS}
];

export const StepperComponent = (props: PropsWithChildren) => {
    const actualPath = useLocation().pathname;
    const navigate = useNavigate();
    const unlockedScreens = useSelector((state: RootState) => state.booking.availableScreens)

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const newActiveStep = steps.map(step => step.url.valueOf()).indexOf(actualPath);
        setActiveStep(newActiveStep);
    }, [actualPath])

    const handleStep = (idx: number) => () => {
        setActiveStep(idx)
        navigate(steps[idx].url)
    };
    return (
        <Box sx={{width: '100%', marginTop: 3, minWidth: "300px"}}>
            <Stepper nonLinear activeStep={activeStep}>
                {steps.map((step, idx) => {
                    return <Step key={step.label} disabled={!unlockedScreens.includes(steps[idx].url)}>
                        <StepButton role={"StepButton"} color="inherit" onClick={handleStep(idx)}>
                            {isSmallScreen ? "" : step.label}
                        </StepButton>
                    </Step>
                })}
            </Stepper>
            {props.children}
        </Box>
    )
};