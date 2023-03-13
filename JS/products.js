const productsParent = document.querySelector(".all-products");

displayProducts();

async function displayProducts() {
    const products = data.products;

    products.forEach(product => {
        const productOuterBox = document.createElement("div");
        const productInnerBox = document.createElement("img");
        const productName = document.createElement("p");
        // const productDesc = document.createElement("p");
        productsParent.appendChild(productOuterBox);
        productOuterBox.appendChild(productInnerBox);
        productOuterBox.appendChild(productName);

        productOuterBox.classList.add("product-outer-box");
        productInnerBox.classList.add("product-inner-box");
        productInnerBox.src = "../images/" + product.image;
        productName.textContent = product.name;
    
    });

}
