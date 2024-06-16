addEventListener("DOMContentLoaded", async e=>{
    if(!localStorage.getItem("getAllCategory")) localStorage.setItem("getAllCategory", JSON.stringify(await getAllCategory()));
    nav__ul.innerHTML = await menuListCategoryIndex(JSON.parse(localStorage.getItem("getAllCategory")));  
})
input_search.addEventListener("change", async e => {
    let params = new URLSearchParams(location.search);
    let data = { search : e.target.value, id: params.get('id')}
    input__search.value = null;
    let res = await getAllProductName(data)
    main__article.innerHTML = galleryIndex(res, params.get('id'));
})