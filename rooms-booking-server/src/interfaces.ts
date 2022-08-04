export interface RoomItem {
    id: number;
    name: string;
    pricePerNightNet: number;
    priceTaxPercentage: number;
    image: string;
}

export interface RoomItemWithPrice extends RoomItem {
    price: string;
    discount: string;
    bookingDuration: number;
}

export interface ProductItem {
    id: number;
    name: string;
    priceNet: number;
    priceTaxPercentage: number;
    chargeMethod: string;
    image: string;
}

export interface ProductItemResponse extends ProductItem{
    isComplimentary: boolean;
}

export interface BookingItem {
    id: number;
    roomId: number;
    startDateUtc: string;
    endDateUtc: string;
    products?: string;
}

export interface Interval {
    start: Date;
    end: Date;
}

export interface BookingPrices {
    price: string;
    discount: string;
}