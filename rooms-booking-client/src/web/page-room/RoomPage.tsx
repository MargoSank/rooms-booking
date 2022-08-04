import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../core/store/store";
import {GridContainer} from "../common/GridContainer";
import {GetBackToDataPageButton} from "../common/GetBackToDataPageButton";
import {RoomList} from "./RoomList";
import {getAllProducts, setNewOpenScreen, setRoomId} from "../../core/actionCreators/bookingActionCreators";
import {NotAvailableRooms} from "./NotAvailableRooms";
import {GET_EMPTY_ROOMS} from "../../core/actionTypes/bookingActionTypes";
import {Page} from "../PageRouting";

export const RoomPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const store = useSelector((state: RootState) => state.booking)
    const isLoadingRooms = useSelector((state: RootState) => state.isLoading[GET_EMPTY_ROOMS])

    const backButtonHandler = () => navigate(Page.DATE);
    const nextButtonHandler = (selectedRoomId: number) => {
        dispatch(setRoomId(selectedRoomId))
        dispatch(getAllProducts(store.selectedRoom.bookingDuration))
        dispatch(setNewOpenScreen(Page.PRODUCT))
        navigate(Page.PRODUCT)
    }

    return (
        <GridContainer>
            <GetBackToDataPageButton
                text={"Availability for"}
                startDate={store.startDate}
                endDate={store.endDate}
                buttonHandler={backButtonHandler}
            />
            <RoomList
                rooms={store.emptyRooms}
                buttonNextHandler={nextButtonHandler}
                loading={isLoadingRooms}
                emptyRoomsInfo={<NotAvailableRooms buttonHandler={backButtonHandler}/>}
            />
        </GridContainer>
    )
}