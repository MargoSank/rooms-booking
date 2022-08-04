import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import {Box} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export interface ApproveBookingDialogProps {
    buttonNextHandler: () => void;
    loading: boolean;
}

export const ApproveBookingDialog = (props: ApproveBookingDialogProps) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const handleClickOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleNextStep = () => {
        setIsOpen(false);
        props.buttonNextHandler();
    };
    return (
        <Box>
            <Button variant={"contained"}
                    fullWidth={true}
                    endIcon={<ChevronRightIcon/>}
                    onClick={handleClickOpen}
                    size={"large"}
                    disabled={props.loading}
            >
                Book now
            </Button>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby={"alert-dialog-title"}
            >
                <DialogTitle id={"alert-dialog-title"}>
                    {"Do you confirm this reservation?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>{"No"}</Button>
                    <Button onClick={handleNextStep} autoFocus>{"Yes"}</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
