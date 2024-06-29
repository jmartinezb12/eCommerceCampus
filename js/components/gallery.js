export const galleryIndex = (res, category)=>{
    let {products} = res.data
    let plantilla = "";
    products.forEach((value,index) => {
        plantilla += /*html*/`
        <section>
           <div class="section__front_page">
               <a href="views/detail.html?id=${value.asin}">
                   <img src="${value.product_photo}">
               </a>
               <img src="storage/img/heart.svg">
           </div>
           <h5>${value.product_title}</h5>
           <small>${category}</small>
           <div class="section__price">
               <span>${value.product_price}</span>
               <div  class="price__score">
                   <img src="storage/img/star.svg">
                   <p>${(value.product_star_rating!=null) ? value.product_star_rating : 0}</p>
               </div>
           </div>
       </section>
       `;
    });
    return plantilla
}

export const galleryCategory = ({data: {product_photos}} = res)=>{
    return /*html*/`
        <article class="article__product">
            <div class="product__image">
                ${product_photos.map(value => `<div class="product__image__item"><img src="${value}"></div>`).join('')}
            </div>
            <div class="product__menu">
                <a href="../?id='fashion'">
                    <img src="../storage/img/back.svg">
                </a>
                <img src="../storage/img/heartBlack.svg">
            </div>
        </article>`;
}

export const galleryCheckPrice = (res) => {
    const { data: dataUpdate } = res || {};
    const totalItems = 9;
    const shippingFee = 0;
    const subTotal = 131.97;
  
    return /*html*/`
      <article class="section__bill">
        <div class="bill__total">
          <label class="total__items">(${totalItems} items)</label>
          <span class="total__price">$${subTotal.toFixed(2)}</span>
        </div>
        <div class="bill__fee">
          <label>Shipping fee</label>
          <span>$${shippingFee.toFixed(2)}</span>
        </div>
        <div class="bill__subtotal">
          <label>Sub Total</label>
          <span class="subtotal__price">$${subTotal.toFixed(2)}</span>
        </div>
      </article>
    `;
};

export const galleryCheckout = async () => {
    const keys = Object.keys(sessionStorage);
    let plantilla = "";

    keys.forEach(key => {
        const objectData = JSON.parse(sessionStorage.getItem(key));
        if (objectData.exist_detail) {
            const { product_photo, product_title, product_star_rating, product_price } = diccionario.data;
            plantilla += generateProductTemplate(product_photo, product_title, product_star_rating, product_price);
        }
    });

    return plantilla;
};

const generateProductTemplate = (photo, title, rating, price) => {
    const shortTitle = title.substring(0, 15);
    const starRating = rating ? rating : "*No Ratings*";

    return /*html*/`
        <article class="details__product">
            <div class="product__imagen">
                <img src="${photo}">
            </div>
            <div class="product__description">
                <h3>${shortTitle}...</h3>
                <small>⭐ ${starRating}</small>
                <span id="precio">${price}</span>
            </div>
            <div class="product__custom">
                <img src="../storage/img/option.svg">
                <div id="precio" class="product__select">
                    <img src="../storage/img/minus.svg" id="btn_minus">
                    <span id="span_quantity">1</span>
                    <img src="../storage/img/plus.svg" id="btn_plus">
                </div>
            </div>
        </article>`;
};
