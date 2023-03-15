const productsParent = document.querySelector(".all-products");
const categories = document.querySelector(".categories");
const products = data.products;
const filters = [];

categories.addEventListener("click", addFilter)
displayProducts();

function addFilter(event) {
    removeProducts();
    const isCategoryBtn = event.target.classList.contains('category');
    const category = event.target.textContent.toLowerCase();

    if (isCategoryBtn) {
        if (!filters.includes(category)) {
            filters.push(category);
            event.target.classList.add("pressed");
        } else {
            filters.splice(filters.indexOf(category), 1);
            event.target.classList.remove("pressed");
        }
    }

    displayProducts();
}

function displayProducts() {
    products.forEach(product => {
        if (filters.includes(product.category.toString()) || filters.length === 0) {
            const productOuterBox = document.createElement("div");
            const productInnerBox = document.createElement("img");
            const productName = document.createElement("p");
            const productPrice = document.createElement("p");
            // const productDesc = document.createElement("p");
            productsParent.appendChild(productOuterBox);
            productOuterBox.appendChild(productInnerBox);
            productOuterBox.appendChild(productName);
            productOuterBox.appendChild(productPrice);
    
            productOuterBox.classList.add("product-outer-box");
            productInnerBox.classList.add("product-inner-box");
            productPrice.classList.add("product-price");
            productInnerBox.src = "../images/" + product.image;
            productName.textContent = product.name;
            productPrice.textContent = "£" + product.price;
        }
    });
}

function removeProducts() {
    productsParent.innerHTML = "";
}