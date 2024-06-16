addEventListener("DOMContentLoaded", async e=>{
    if(!localStorage.getItem("getAllCategory")) localStorage.setItem("getAllCategory", JSON.stringify(await getAllCategory()));
    nav__ul.innerHTML = await menuListCategoryIndex(JSON.parse(localStorage.getItem("getAllCategory")));  
})
input_search.addEventListener("change", async e => {
    input__search.value = null;
    let res = await getAllProductName(dataSearch)
    main__article.innerHTML = galleryIndex(g)
})