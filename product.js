// =========================================
// GLAMORA PRODUCT PAGE JAVASCRIPT
// =========================================


// =========================================
// PRODUCT DATA
// =========================================

const products = {

    "vitamin-c-serum": {
        name: "Vitamin C Glow Serum",
        category: "SERUM",
        price: 24.99,
        oldPrice: 32.99,
        image: "vitamin-c-serum.png"
    },

    "hydrating-cleanser": {
        name: "Hydrating Cleanser",
        category: "CLEANSER",
        price: 18.99,
        oldPrice: 24.99,
        image: "hydrating-cleanser.png"
    },

    "glow-moisturizer": {
        name: "Glow Moisturizer",
        category: "MOISTURIZER",
        price: 22.99,
        oldPrice: 29.99,
        image: "glow-moisturizer.png"
    },

    "spf-50-sunscreen": {
        name: "SPF 50 Sunscreen",
        category: "SUNSCREEN",
        price: 19.99,
        oldPrice: 25.99,
        image: "spf-50-sunscreen.png"
    },

    "night-repair-cream": {
        name: "Night Repair Cream",
        category: "MOISTURIZER",
        price: 26.99,
        oldPrice: 34.99,
        image: "night-repair-cream.png"
    },

    "niacinamide-serum": {
        name: "Niacinamide Serum",
        category: "SERUM",
        price: 21.99,
        oldPrice: 28.99,
        image: "niacinamide-serum.png"
    },

    "clay-mask": {
        name: "Clay Mask",
        category: "FACE MASK",
        price: 17.99,
        oldPrice: 22.99,
        image: "clay-mask.png"
    },

    "hydrating-toner": {
        name: "Hydrating Toner",
        category: "TONER",
        price: 16.99,
        oldPrice: 21.99,
        image: "hydrating-toner.png"
    },

    "rose-water-mist": {
        name: "Rose Water Mist",
        category: "FACE MIST",
        price: 15.99,
        oldPrice: 20.99,
        image: "rose-water-mist.png"
    },

    "brightening-eye-cream": {
        name: "Brightening Eye Cream",
        category: "EYE CARE",
        price: 23.99,
        oldPrice: 29.99,
        image: "brightening-eye-cream.png"
    },

    "hydrating-lip-balm": {
        name: "Hydrating Lip Balm",
        category: "LIP CARE",
        price: 9.99,
        oldPrice: 13.99,
        image: "hydrating-lip-balm.png"
    },

    "retinol-renewal-cream": {
        name: "Retinol Renewal Cream",
        category: "MOISTURIZER",
        price: 27.99,
        oldPrice: 35.99,
        image: "retinol-renewal-cream.png"
    }

};


// =========================================
// GET PRODUCT FROM URL
// =========================================

const urlParams =
    new URLSearchParams(window.location.search);

const productId =
    urlParams.get("id") || "vitamin-c-serum";

const selectedProduct =
    products[productId] || products["vitamin-c-serum"];


// =========================================
// PRODUCT ELEMENTS
// =========================================

const productName =
    document.getElementById("productName");

const productCategory =
    document.getElementById("productCategory");

const productPrice =
    document.getElementById("productPrice");

const productDescription =
    document.getElementById("productDescription");

const mainProductImage =
    document.getElementById("mainProductImage");

const breadcrumbProduct =
    document.getElementById("breadcrumbProduct");


// =========================================
// DISPLAY PRODUCT
// =========================================

if (productName) {

    productName.textContent =
        selectedProduct.name;

}

if (productCategory) {

    productCategory.textContent =
        selectedProduct.category;

}

if (productPrice) {

    productPrice.textContent =
        "$" + selectedProduct.price.toFixed(2);

}

if (mainProductImage) {

    mainProductImage.src =
        selectedProduct.image;

    mainProductImage.alt =
        selectedProduct.name;

}

if (breadcrumbProduct) {

    breadcrumbProduct.textContent =
        selectedProduct.name;

}

if (productDescription) {

    productDescription.textContent =
        "A beautifully formulated " +
        selectedProduct.name.toLowerCase() +
        " designed to fit effortlessly into your everyday skincare routine while leaving your skin feeling fresh, smooth and cared for.";

}

document.title =
    selectedProduct.name + " | Glamora";


// =========================================
// QUANTITY
// =========================================

let quantity = 1;

const quantityDisplay =
    document.getElementById("quantity");

const increaseQuantity =
    document.getElementById("increaseQuantity");

const decreaseQuantity =
    document.getElementById("decreaseQuantity");


function updateQuantity() {

    if (quantityDisplay) {

        quantityDisplay.textContent =
            quantity;

    }

}


if (increaseQuantity) {

    increaseQuantity.addEventListener(
        "click",
        function () {

            quantity++;

            updateQuantity();

        }
    );

}


if (decreaseQuantity) {

    decreaseQuantity.addEventListener(
        "click",
        function () {

            if (quantity > 1) {

                quantity--;

                updateQuantity();

            }

        }
    );

}


// =========================================
// PRODUCT IMAGE THUMBNAILS
// =========================================

const thumbnails =
    document.querySelectorAll(".thumbnail");


thumbnails.forEach(function (thumbnail) {

    thumbnail.addEventListener(
        "click",
        function () {

            const image =
                thumbnail.getAttribute("data-image");

            if (mainProductImage && image) {

                mainProductImage.src = image;

            }


            thumbnails.forEach(
                function (item) {

                    item.classList.remove("active");

                }
            );


            thumbnail.classList.add("active");

        }
    );

});


// =========================================
// WISHLIST
// =========================================

const wishlistButtons =
    document.querySelectorAll(
        "#addWishlist, #imageWishlist, .related-wishlist"
    );


wishlistButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            button.classList.toggle("active");


            const icon =
                button.querySelector("i");


            if (icon) {

                if (
                    button.classList.contains("active")
                ) {

                    icon.classList.remove(
                        "far"
                    );

                    icon.classList.add(
                        "fas"
                    );

                } else {

                    icon.classList.remove(
                        "fas"
                    );

                    icon.classList.add(
                        "far"
                    );

                }

            }

        }
    );

});


// =========================================
// SHOPPING CART
// =========================================

function getCart() {

    const cart =
        localStorage.getItem("glamoraCart");

    return cart
        ? JSON.parse(cart)
        : [];

}


function saveCart(cart) {

    localStorage.setItem(
        "glamoraCart",
        JSON.stringify(cart)
    );

}


function updateCartCount() {

    const cart =
        getCart();

    const totalQuantity =
        cart.reduce(
            function (total, item) {

                return total + item.quantity;

            },
            0
        );


    const cartCount =
        document.getElementById("cartCount");


    if (cartCount) {

        cartCount.textContent =
            totalQuantity;

    }

}


updateCartCount();


// =========================================
// ADD TO CART
// =========================================

const addToCart =
    document.getElementById("addToCart");


if (addToCart) {

    addToCart.addEventListener(
        "click",
        function () {

            const cart =
                getCart();


            const existingProduct =
                cart.find(
                    function (item) {

                        return item.id === productId;

                    }
                );


            if (existingProduct) {

                existingProduct.quantity +=
                    quantity;

            } else {

                cart.push({

                    id: productId,

                    name: selectedProduct.name,

                    price: selectedProduct.price,

                    image: selectedProduct.image,

                    quantity: quantity

                });

            }


            saveCart(cart);

            updateCartCount();


            const originalText =
                addToCart.innerHTML;


            addToCart.innerHTML =
                '<i class="fas fa-check"></i> Added to Cart';


            addToCart.style.background =
                "#b98b45";


            setTimeout(
                function () {

                    addToCart.innerHTML =
                        originalText;

                    addToCart.style.background =
                        "";

                },
                1800
            );

        }
    );

}


// =========================================
// PRODUCT DETAIL TABS
// =========================================

const detailTabs =
    document.querySelectorAll(".detail-tab");

const detailContents =
    document.querySelectorAll(".detail-content");


detailTabs.forEach(function (tab) {

    tab.addEventListener(
        "click",
        function () {

            const target =
                tab.getAttribute("data-tab");


            detailTabs.forEach(
                function (item) {

                    item.classList.remove(
                        "active"
                    );

                }
            );


            detailContents.forEach(
                function (content) {

                    content.classList.remove(
                        "active"
                    );

                }
            );


            tab.classList.add("active");


            const targetContent =
                document.getElementById(target);


            if (targetContent) {

                targetContent.classList.add(
                    "active"
                );

            }

        }
    );

});


// =========================================
// NEWSLETTER
// =========================================

const newsletterForm =
    document.getElementById(
        "newsletterForm"
    );

const newsletterMessage =
    document.getElementById(
        "newsletterMessage"
    );


if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const emailInput =
                newsletterForm.querySelector(
                    "input"
                );


            if (
                !emailInput.value.trim()
            ) {

                newsletterMessage.textContent =
                    "Please enter your email address.";

                return;

            }


            newsletterMessage.textContent =
                "Welcome to the Glamora community! ✨";


            emailInput.value = "";

        }
    );

}


// =========================================
// PRODUCT SEARCH
// =========================================

const productSearch =
    document.getElementById(
        "productSearch"
    );

const searchButton =
    document.getElementById(
        "searchButton"
    );


function performSearch() {

    const searchTerm =
        productSearch.value.trim();


    if (searchTerm === "") {

        return;

    }


    window.location.href =
        "shop.html?search=" +
        encodeURIComponent(searchTerm);

}


if (searchButton) {

    searchButton.addEventListener(
        "click",
        performSearch
    );

}


if (productSearch) {

    productSearch.addEventListener(
        "keypress",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                performSearch();

            }

        }
    );

}


// =========================================
// RELATED PRODUCT CARDS
// =========================================

const relatedCards =
    document.querySelectorAll(
        ".related-card"
    );


relatedCards.forEach(function (card) {

    card.addEventListener(
        "click",
        function (event) {

            if (
                event.target.closest(
                    ".related-wishlist"
                )
            ) {

                return;

            }


            const title =
                card.querySelector(
                    "h3"
                );


            if (!title) {

                return;

            }


            const name =
                title.textContent.trim();


            const id =
                name
                    .toLowerCase()
                    .replace(
                        /[^a-z0-9]+/g,
                        "-"
                    )
                    .replace(
                        /^-|-$/g,
                        ""
                    );


            window.location.href =
                "product.html?id=" +
                id;

        }
    );

});


// =========================================
// SCROLL TO TOP
// =========================================

const scrollButton =
    document.createElement(
        "button"
    );


scrollButton.innerHTML =
    '<i class="fas fa-arrow-up"></i>';


scrollButton.setAttribute(
    "aria-label",
    "Scroll to top"
);


scrollButton.style.position =
    "fixed";

scrollButton.style.right =
    "25px";

scrollButton.style.bottom =
    "25px";

scrollButton.style.width =
    "48px";

scrollButton.style.height =
    "48px";

scrollButton.style.border =
    "none";

scrollButton.style.borderRadius =
    "50%";

scrollButton.style.background =
    "#111";

scrollButton.style.color =
    "#fff";

scrollButton.style.fontSize =
    "16px";

scrollButton.style.cursor =
    "pointer";

scrollButton.style.display =
    "none";

scrollButton.style.alignItems =
    "center";

scrollButton.style.justifyContent =
    "center";

scrollButton.style.zIndex =
    "999";

scrollButton.style.boxShadow =
    "0 5px 20px rgba(0,0,0,.15)";


document.body.appendChild(
    scrollButton
);


window.addEventListener(
    "scroll",
    function () {

        if (window.scrollY > 400) {

            scrollButton.style.display =
                "flex";

        } else {

            scrollButton.style.display =
                "none";

        }

    }
);


scrollButton.addEventListener(
    "click",
    function () {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);


// =========================================
// HEADER SHADOW
// =========================================

const header =
    document.querySelector(
        "header"
    );


if (header) {

    window.addEventListener(
        "scroll",
        function () {

            if (window.scrollY > 30) {

                header.style.boxShadow =
                    "0 8px 25px rgba(0,0,0,.08)";

            } else {

                header.style.boxShadow =
                    "none";

            }

        }
    );

}


// =========================================
// PAGE LOADED
// =========================================

console.log(
    "✨ Glamora Product Page Loaded"
);
