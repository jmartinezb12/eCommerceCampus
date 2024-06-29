import { galleryCheckout, galleryCheckPrice } from "./components/gallery.js";
import { getProductId } from "./module/detail.js";

const checkoutDetailsGallery = document.querySelector(".checkout__details");
const totalItemsElement = document.querySelector(".total__items");
const totalPriceElement = document.querySelector(".total__price");
const subTotalPriceElement = document.querySelector(".subtotal__price");

document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    
    if (!sessionStorage.getItem(id)) {
        const productData = await getProductId({ id });
        sessionStorage.setItem(id, JSON.stringify(productData));
    }

    const info = JSON.parse(sessionStorage.getItem(id));
    checkoutDetailsGallery.innerHTML = await galleryCheckout();
    document.querySelector(".section__shopping").innerHTML = await gallerycheckPrice(info);

    updateCartDetails();
    setupQuantityButtons(info);
});

const updateCartDetails = () => {
    const productDetails = document.querySelectorAll(".details__product");
    let totalPrice = 0;
    let totalItems = 0;

    productDetails.forEach(detail => {
        const productPriceElement = detail.querySelector("#product_price");
        const quantitySpanElement = detail.querySelector("#quantity_span");

        totalPrice += parseFloat(productPriceElement.textContent.replace("$", ""));
        totalItems += parseInt(quantitySpanElement.textContent, 10);
    });

    totalItemsElement.textContent = `Total(${totalItems} items)`;
    totalPriceElement.textContent = totalPrice;
    subTotalPriceElement.textContent = totalPrice;
}

const setupQuantityButtons = (info) => {
    const productDetails = document.querySelectorAll(".details__product");

    productDetails.forEach(detail => {
        const btnMinus = detail.querySelector("#btn_minus");
        const btnPlus = detail.querySelector("#btn_plus");
        const quantitySpanElement = detail.querySelector("#quantity_span");
        const productPriceElement = detail.querySelector("#product_price");

        btnMinus.addEventListener('click', () => updateQuantity(quantitySpanElement, productPriceElement, info, -1));
        btnPlus.addEventListener('click', () => updateQuantity(quantitySpanElement, productPriceElement, info, 1));
    });
}

const updateQuantity = (quantitySpanElement, productPriceElement, info, change) => {
    let quantity_span = parseInt(quantitySpanElement.textContent, 10);
    if (quantity_span + change < 1) return;

    quantity_span += change;
    quantitySpanElement.textContent = quantity_span;

    //const price = parseFloat(productPriceElement.textContent.replace("$", ""));
    updateCartDetails();

    const productPrice = parseFloat(info.data.product_price.replace('$', ''));
    const originalPrice = info.data.product_original_price ? parseFloat(info.data.product_original_price.replace('$', '')) : null;
    
    let precioTotalContent = `<span id="total_price">$${(quantity_span * productPrice).toFixed(2)}</span>`;
    if (originalPrice) {
        precioTotalContent += ` <del><sub>$${(quantity_span * originalPrice).toFixed(2)}</sub></del>`;
    }
    
    document.querySelector("#total_price").innerHTML = precioTotalContent;
}
