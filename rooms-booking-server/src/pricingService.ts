import {getDaysDiff} from "./bookingService";
import {ProductService} from "./productService";
import {RoomService} from "./roomService";
import {BookingPrices} from "./interfaces";

export class PricingService {
    constructor(private readonly roomService: RoomService, private readonly productService: ProductService) {
    }

    public getBookingPrice = (roomId: number, startDate: Date, endDate: Date, productsIds: number[]): BookingPrices => {
        const bookingDuration: number = getDaysDiff(startDate, endDate)
        const {roomPrice, roomDiscount} = this.roomService.getRoomPrice(roomId, bookingDuration)
        const {productPrice, productDiscount} = this.productService.getProductPrice(productsIds, bookingDuration)
        return {
            price: (roomPrice + productPrice).toFixed(2),
            discount: (roomDiscount + productDiscount).toFixed(2),
        };
    }
}