export const descriptionDetails = async ({ data: dataUpdate } = res) => {
    if (dataUpdate.product_description === null) return null;

    const description = dataUpdate.product_description;
    const truncatedDescription = description.length > 150
        ? `${description.substring(0, 150)}... <strong id="read_more"> Leer más.</strong>`
        : description;

    return /*html*/`
        <article class="product__information">
            <p id="current_information">${truncatedDescription}</p>
        </article>
    `;
};