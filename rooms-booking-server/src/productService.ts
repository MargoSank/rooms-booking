import {ProductItem, ProductItemResponse} from "./interfaces";

export class ProductService {
    constructor(private readonly productsData: ProductItem[]) {
    }

    public isExistingProduct = (id: number): boolean => {
        return !!this.productsData.find(product => product.id === id)
    }

    public getProductById = (id: number): ProductItem => {
        const product = this.productsData.find(product => product.id === id)
        if (product === undefined) {
            throw new Error(`Invalid product id - ${id}`)
        }
        return product;
    }

    public getProductPrice = (productsIds: number[], bookingDuration: number): { productPrice: number; productDiscount: number; } => {
        if (productsIds.length === 0) return {productPrice: 0, productDiscount: 0};

        const products = this.productsData.filter(product => productsIds.includes(product.id))
        const productPrices = products
            .map(item => {
                const priceNet = item.chargeMethod === 'nightly' ? item.priceNet * bookingDuration : item.priceNet
                const tax = priceNet * item.priceTaxPercentage;
                return priceNet + tax
            });
        const productDiscount = (bookingDuration >= 28 && productsIds.includes(1)) ? productPrices[0] : 0;
        const productPrice = productPrices.reduce((previousValue, currentValue) => previousValue + currentValue, 0) - productDiscount;
        return {productPrice, productDiscount};
    }

    public getProducts = (bookingDuration: number): ProductItemResponse[] => {
        return this.productsData.map(product => {
            if (bookingDuration >= 28 && product.id === 1) {
                return {...product, isComplimentary: true};
            } else {
                return {...product, isComplimentary: false};
            }
        })
    }
}
