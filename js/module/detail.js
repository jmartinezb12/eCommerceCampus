import { headers } from "../components/env.js";

export const getProductId = async({id:idCategory})=>{
    console.log("Esperando .......");
    const url = `https://real-time-amazon-data.p.rapidapi.com/product-details?asin=${idCategory}&country=US`;
    const options = {
        method: 'GET',
        headers
    };
    let res = await fetch(url, options);
    let data = res.json();
    return data;
}

const quantity = async (e)=>{
    let span_quantity = document.querySelector("#span_quantity");
    let price_discount = document.querySelector("#price_discount");
    let price_original = document.querySelector("#price_original");
    let params = new URLSearchParams(location.search);
    let id = params.get('id');
    let res = JSON.parse(localStorage.getItem(id)).data;

    let product_original_price = undefined;
    if(res.product_original_price) product_original_price = Number(res.product_original_price.replace("$", ""));
    let product_price= Number(res.product_price.replace("$", ""));

    
    if(e.target.id == "btn_plus")span_quantity.innerHTML = Number(span_quantity.innerHTML) + 1
    if(e.target.id == "btn_minus" && span_quantity.innerHTML > "1") span_quantity.innerHTML = Number(span_quantity.innerHTML) - 1;

    price_discount.innerHTML = `$${(product_price * Number(span_quantity.innerHTML)).toFixed(2)}`;
    if(product_original_price) price_original.innerHTML = `$${(product_original_price * Number(span_quantity.innerHTML)).toFixed(2)}`;
    // Swal.fire({
    //     position: "top-end",
    //     title: `<small>Product ${id} with a quantity of ${span_quantity.innerHTML} was added to the cart</small>`,
    //     showConfirmButton: false,
    //     timer: 2000
    // });
}