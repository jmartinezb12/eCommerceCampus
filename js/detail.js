import { buttonCartDetails } from "./components/footer.js";
import { galleryCategory } from "./components/gallery.js";
import { productDetail, titleProductDetail } from "./components/section.js";
import { getProductId } from "./module/detail.js";

let main__section_gallery = document.querySelector("#main__section__gallery");
let main__section__title = document.querySelector("#main__section__title");
let product__information = document.querySelector(".product__information");
let footer__ul = document.querySelector(".footer__ul");

addEventListener("DOMContentLoaded", async(e)=>{
   
    let params = new URLSearchParams(location.search);
    let id = params.get('id');
    if(!localStorage.getItem(id)) localStorage.setItem(id, JSON.stringify(await getProductId({id})));
    
    let info = JSON.parse(localStorage.getItem(id));
    main__section_gallery.innerHTML = await galleryCategory(info);
    main__section__title.innerHTML = await titleProductDetail(info);
    let btn_minus = document.querySelector("#btn_minus");
    let btn_plus = document.querySelector("#btn_plus");
    
    product__information.innerHTML = await productDetail(info);
    footer__ul.innerHTML = await buttonCartDetails(info);
    
    btn_minus.addEventListener('click', async e => {
        let quantity = parseInt(quantitySpan.textContent);
        if (quantity > 1) {
          quantity--;
          quantitySpan.textContent = quantity;
      
          const productPrice = parseFloat(info.data.product_price.replace('$', ''));
          let totalPrice = quantity * productPrice;
      
          if (info.data.product_original_price) {
            const originalPrice = parseFloat(info.data.product_original_price.replace('$', ''));
            totalPrice.innerHTML = /*html*/`
              <span>Add to Cart $${totalPrice.toFixed(2)}<del><sub>$${(quantity * originalPrice).toFixed(2)}</sub></del></span>
            `;
          } else {
            totalPrice.innerHTML = /*html*/`
              <span>Add to Cart $${totalPrice.toFixed(2)}</span>
            `;
          }
        }
    });
    btn_plus.addEventListener("click", async e => {
      let quantity = parseInt(quantitySpan.textContent);
      quantity++;
      quantitySpan.textContent = quantity;
    
      if (info.data.product_price !== null) {
        let productPrice = parseFloat(info.data.product_price.replace('$', ''));
        let totalPrice = quantity * productPrice;
        let originalPrice = info.data.product_original_price
          ? parseFloat(info.data.product_original_price.replace('$', '')) * quantity
          : null;
    
        totalPrice.innerHTML = /*html*/`
          <span>
            Add to Cart $${totalPrice}
            ${originalPrice ? `<del><sub>$${originalPrice}</sub></del>` : ''}
          </span>
        `;
      }
    });
    // let {data} = res;
    // let {
    //     category_path,
    //     about_product,
    //     product_details,
    //     product_information,
    //     product_photos,
    //     product_variations,
    //     rating_distribution,
    //     review_aspects,
    //     ...dataUpdate
    // } = data;
    // console.log(dataUpdate);

    // btn_minus.addEventListener("click",quantity);
    // btn_plus.addEventListener("click",quantity);
})

// const quantity = async (e)=>{
//     let span_quantity = document.querySelector("#span_quantity");
//     let price_discount = document.querySelector("#price_discount");
//     let price_original = document.querySelector("#price_original");
//     let params = new URLSearchParams(location.search);
//     let id = params.get('id');
//     let res = JSON.parse(localStorage.getItem(id)).data;

//     let product_original_price = undefined;
//     if(res.product_original_price) product_original_price = Number(res.product_original_price.replace("$", ""));
//     let product_price= Number(res.product_price.replace("$", ""));

    
//     if(e.target.id == "btn_plus")span_quantity.innerHTML = Number(span_quantity.innerHTML) + 1
//     if(e.target.id == "btn_minus" && span_quantity.innerHTML > "1") span_quantity.innerHTML = Number(span_quantity.innerHTML) - 1;

//     price_discount.innerHTML = `$${(product_price * Number(span_quantity.innerHTML)).toFixed(2)}`;
//     if(product_original_price) price_original.innerHTML = `$${(product_original_price * Number(span_quantity.innerHTML)).toFixed(2)}`;
//     // Swal.fire({
//     //     position: "top-end",
//     //     title: `<small>Product ${id} with a quantity of ${span_quantity.innerHTML} was added to the cart</small>`,
//     //     showConfirmButton: false,
//     //     timer: 2000
//     // });
// }

footer__ul.addEventListener("click", async () => {
  const receiveData = getDataFromLocalStorage(id);
  receiveData.exist_detail = true;
  saveDataToSessionStorage(id, receiveData);
});

const getDataFromLocalStorage = (id) => {
  return JSON.parse(localStorage.getItem(id));
};

const saveDataToSessionStorage = (id, data) => {
  sessionStorage.setItem(id, JSON.stringify(data));
};

const currentInformation = document.querySelector("#current_information");
const btnReadMore = document.querySelector("#read_more");

const updateDescription = async () => {
    const description = info.data.product_description;
    currentInformation.textContent = description;
};

const attachClickListener = (element, callback) => {
    if (element) {
        element.addEventListener('click', callback);
    }
};

attachClickListener(btnReadMore, updateDescription);