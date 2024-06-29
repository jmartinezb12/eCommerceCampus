export const priceDetails = async ({ data: dataUpdate } = res) => {
    const { product_price, product_original_price } = dataUpdate;

    return generatePriceDetailsHTML(product_price, product_original_price);
};

const generatePriceDetailsHTML = (price, originalPrice) => {
    if (originalPrice === null) {
        return /*html*/`
            <li>
                <a href="checkout.html">
                    <img src="../storage/img/shopping-cart.svg">
                    <span id="total_price">Add to Cart ${price}</span>
                </a>
            </li>`;
    }

    return /*html*/`
        <li>
            <a href="#">
                <img src="../storage/img/shopping-cart.svg">
                <span id="total_price">Add to Cart ${price}<del><sub>${originalPrice}</sub></del></span>
            </a>
        </li>`;
};
