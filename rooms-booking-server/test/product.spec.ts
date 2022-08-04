import {ProductService} from "../src/productService";
import {ProductItem} from "../src/interfaces";

describe('ProductService test', () => {
    const productDataTest = [
        {
            "id": 1,
            "name": "Breakfast",
            "priceNet": 6,
            "priceTaxPercentage": 0.09,
            "chargeMethod": "nightly",
            "image": "https://via.placeholder.com/400x200.png?text=Breakfast"
        },
        {
            "id": 2,
            "name": "SaunaKit",
            "priceNet": 19,
            "priceTaxPercentage": 0.09,
            "chargeMethod": "once-per-booking",
            "image": "https://via.placeholder.com/400x200.png?text=Sauna%20Kit"
        }
    ];
    const productService = new ProductService(productDataTest)

    describe('isExistingProduct function test', () => {
        test(`Test non-existent product id, should return false`, () => {
            const productId = 123;

            expect(productService.isExistingProduct(productId)).toStrictEqual(false);
        })

        test(`Test existing product id, should return true`, () => {
            const productId = 1;

            expect(productService.isExistingProduct(productId)).toStrictEqual(true);
        })
    });


    describe('getProductById function test', () => {
        test(`Test first product id, should return product obj`, () => {
            const productId = 1;
            const expectedProduct = {
                "id": 1,
                "name": "Breakfast",
                "priceNet": 6,
                "priceTaxPercentage": 0.09,
                "chargeMethod": "nightly",
                "image": "https://via.placeholder.com/400x200.png?text=Breakfast"
            };

            expect(productService.getProductById(productId)).toStrictEqual(expectedProduct);
        })

        test(`Test second product id, should return product obj`, () => {
            const productId = 2;
            const expectedProduct = {
                "id": 2,
                "name": "SaunaKit",
                "priceNet": 19,
                "priceTaxPercentage": 0.09,
                "chargeMethod": "once-per-booking",
                "image": "https://via.placeholder.com/400x200.png?text=Sauna%20Kit"
            };

            expect(productService.getProductById(productId)).toStrictEqual(expectedProduct);
        })
    });

    describe('getProductPrice function test', () => {
        test(`Test empty product price calculation for 1 days, should return 0`, () => {
            const products = [];
            const days = 1;
            const expectedPrice = {"productPrice": 0, "productDiscount": 0};

            expect(productService.getProductPrice(products, days)).toStrictEqual(expectedPrice);
        })

        test(`Test first product price calculation for 7 days, should return 45.78 and 0`, () => {
            const products = [1];
            const days = 7;
            const expectedPrice = {"productPrice": 45.78, "productDiscount": 0};


            expect(productService.getProductPrice(products, days)).toStrictEqual(expectedPrice);
        })

        test(`Test all products price calculation for 6 days, should return 59.95 and 0`, () => {
            const products = [2,1];
            const days = 6;
            const expectedPrice = {"productPrice": 59.95, "productDiscount": 0};

            expect(productService.getProductPrice(products, days)).toStrictEqual(expectedPrice);
        })

        test(`Test all products price calculation with discount for 28 days, should return 20.71 and 183.12`, () => {
            const products = [1,2];
            const days = 28;
            const expectedPrice = {"productPrice": 20.710000000000008, "productDiscount": 183.12};

            expect(productService.getProductPrice(products, days)).toStrictEqual(expectedPrice);
        })
    });
})
