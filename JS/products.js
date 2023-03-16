const productsParent = document.querySelector(".all-products");
const categories = document.querySelector(".categories");
const products = data.products;
const filters = [];
const cartBtn = document.querySelector('.cart-btn');
const cartSidebar = document.querySelector('.cart-sidebar');
const cartCloseBtn = document.querySelector('.cart-close-button');

categories.addEventListener("click", addFilter)
displayProducts();

function addFilter(event) {
    removeProducts();
    const isCategoryBtn = event.target.classList.contains('category');
    const category = event.target.textContent.toLowerCase().replace(/\s+|&/g, '');


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
        if (filters.length === 0 || product.category.some(c => filters.includes(c.toLowerCase().replace(/\s+|&/g, '')))) {
            const productOuterBox = document.createElement("div");
            const productInnerBox = document.createElement("img");
            const productName = document.createElement("p");
            const productPrice = document.createElement("p");
            const addToCartBtn = document.createElement("button");
            // const productDesc = document.createElement("p");
            productsParent.appendChild(productOuterBox);
            productOuterBox.appendChild(productInnerBox);
            productOuterBox.appendChild(productName);
            productOuterBox.appendChild(productPrice);
            productOuterBox.appendChild(addToCartBtn);

            productOuterBox.classList.add("product-outer-box");
            productInnerBox.classList.add("product-inner-box");
            productPrice.classList.add("product-price");
            addToCartBtn.classList.add("add-to-cart");
            productInnerBox.src = "../images_products/" + product.image;
            productName.textContent = product.name;
            productPrice.textContent = "£" + product.price;
            addToCartBtn.textContent = "Add to Basket";

            addToCartBtn.addEventListener('click', () => {
                const selectedProduct = {
                    id: product.id,
                    name: product.name,
                    price: product.price
                };
                basket.push(selectedProduct);
                updateBasket();

                // Show success message
                // const successMsg = document.createElement('div');
                // successMsg.classList.add('success-msg');
                // successMsg.textContent = `${product.name} added to cart!`;
                // productOuterBox.appendChild(successMsg);
                // setTimeout(() => {
                //     successMsg.remove();
                // }, 2000);
            });

        }
    });
}

function removeProducts() {
    productsParent.innerHTML = "";
}

cartBtn.addEventListener('click', () => {
    cartSidebar.classList.add('show');
});

cartCloseBtn.addEventListener('click', () => {
    cartSidebar.classList.remove('show');
});

// /* ------------*/

let basket = [];
let totalPrice = 0;

function updateBasket() {
    const cartItemsContainer = document.querySelector('.cart-items-container');
    const cartTotalPrice = document.querySelector('.cart-total-price');

    // Remove all existing cart items
    cartItemsContainer.innerHTML = '';

    // Add each product in the cart to the cart items container
    basket.forEach(product => {
        const cartItem = document.createElement('div');
        const cartItemName = document.createElement('p');
        const cartItemPrice = document.createElement('p');
        const cartItemRemoveBtn = document.createElement('button');

        cartItem.classList.add('cart-item');
        cartItemName.textContent = product.name;
        cartItemPrice.textContent = '£' + product.price;
        cartItemRemoveBtn.textContent = 'Remove';
        cartItemRemoveBtn.classList.add('cart-item-remove');

        cartItem.appendChild(cartItemName);
        cartItem.appendChild(cartItemPrice);
        cartItem.appendChild(cartItemRemoveBtn);

        cartItemsContainer.appendChild(cartItem);
    });

    // Update the cart total price
    const totalPrice = basket.reduce((acc, product) => {
        return acc + product.price;
    }, 0);
    cartTotalPrice.textContent = '£' + totalPrice.toFixed(2);

    // Add event listeners to remove buttons
    const removeButtons = document.querySelectorAll('.cart-item-remove');
    removeButtons.forEach(button => {
        button.addEventListener('click', event => {
            const itemName = event.target.previousSibling.previousSibling.textContent;
            basket = basket.filter(product => product.name !== itemName);
            updateBasket();
        });
    });
}


document.addEventListener('click', event => {
    if (event.target.classList.contains('cart-item-remove')) {
        const itemName = event.target.previousSibling.previousSibling.textContent;
        basket = basket.filter(product => product.name !== itemName);
        updateBasket();
    }
});


addToCartBtn.addEventListener('click', () => {
    const selectedProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1 // initialize quantity to 1 for new items
    };
    const index = basket.findIndex(item => item.id === selectedProduct.id);
    if (index !== -1) {
        basket[index].quantity++; // increase quantity if item already exists
    } else {
        basket.push(selectedProduct); // add new item to basket
    }
    updateBasket();
});


function removeItem(itemId) {
    let itemIndex = cart.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        let item = cart[itemIndex];
        if (item.quantity > 1) {
            item.quantity--;
        } else {
            cart.splice(itemIndex, 1);
        }
        saveCart();
    }
    displayCart();
}
