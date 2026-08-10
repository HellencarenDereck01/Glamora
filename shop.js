// =========================================
// GLAMORA SHOP JAVASCRIPT
// =========================================


// =========================================
// CART FUNCTIONS
// =========================================

function getCart() {

    const savedCart =
        localStorage.getItem("glamoraCart");

    if (!savedCart) {
        return [];
    }

    try {

        return JSON.parse(savedCart);

    } catch (error) {

        console.error(
            "Unable to load cart:",
            error
        );

        return [];

    }

}


// =========================================
// SAVE CART
// =========================================

function saveCart(cart) {

    localStorage.setItem(
        "glamoraCart",
        JSON.stringify(cart)
    );

}


// =========================================
// UPDATE CART COUNT
// =========================================

function updateCartCount() {

    const cartCount =
        document.getElementById(
            "cartCount"
        );

    if (!cartCount) {
        return;
    }


    const cart =
        getCart();


    const totalQuantity =
        cart.reduce(
            function (total, item) {

                return total +
                    Number(item.quantity || 0);

            },
            0
        );


    cartCount.textContent =
        totalQuantity;

}


// =========================================
// ADD PRODUCT TO CART
// =========================================

function addProductToCart(
    productCard
) {

    const productId =
        productCard.dataset.id;

    const productName =
        productCard.dataset.name;

    const productPrice =
        Number(
            productCard.dataset.price
        );

    const productImage =
        productCard.dataset.image;


    if (
        !productId ||
        !productName ||
        !productPrice ||
        !productImage
    ) {

        console.error(
            "Product information is missing."
        );

        return;

    }


    const cart =
        getCart();


    const existingProduct =
        cart.find(
            function (item) {

                return item.id === productId;

            }
        );


    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({

            id:
                productId,

            name:
                productName,

            price:
                productPrice,

            image:
                productImage,

            quantity:
                1

        });

    }


    saveCart(cart);

    updateCartCount();

}


// =========================================
// ADD TO CART BUTTONS
// =========================================

const addToCartButtons =
    document.querySelectorAll(
        ".add-to-cart"
    );


addToCartButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {


                const productCard =
                    button.closest(
                        ".product-card"
                    );


                if (!productCard) {

                    return;

                }


                // Add product

                addProductToCart(
                    productCard
                );


                // Save original text

                const originalText =
                    button.innerHTML;


                // Change button

                button.innerHTML =
                    '<i class="fas fa-check"></i> Added to Cart';


                button.classList.add(
                    "added"
                );


                // Restore button

                setTimeout(
                    function () {

                        button.innerHTML =
                            originalText;

                        button.classList.remove(
                            "added"
                        );

                    },
                    1500
                );

            }
        );

    }
);


// =========================================
// INITIAL CART COUNT
// =========================================

updateCartCount();


// =========================================
// WISHLIST BUTTONS
// =========================================

const wishlistButtons =
    document.querySelectorAll(
        ".product-card .fa-heart"
    );


wishlistButtons.forEach(
    function (heart) {

        heart.addEventListener(
            "click",
            function () {

                heart.classList.toggle(
                    "fas"
                );

                heart.classList.toggle(
                    "far"
                );

            }
        );

    }
);


// =========================================
// SEARCH
// =========================================

const searchInput =
    document.querySelector(
        ".search-bar input"
    );


const productCards =
    document.querySelectorAll(
        ".product-card"
    );


if (searchInput) {

    searchInput.addEventListener(
        "input",
        function () {

            const searchTerm =
                searchInput.value
                    .toLowerCase()
                    .trim();


            productCards.forEach(
                function (card) {

                    const name =
                        card
                            .dataset
                            .name
                            .toLowerCase();


                    if (
                        name.includes(
                            searchTerm
                        )
                    ) {

                        card.style.display =
                            "";

                    } else {

                        card.style.display =
                            "none";

                    }

                }
            );

        }
    );

}


// =========================================
// SORT PRODUCTS
// =========================================

const sortSelect =
    document.querySelector(
        ".shop-top select"
    );


if (sortSelect) {

    sortSelect.addEventListener(
        "change",
        function () {

            const grid =
                document.querySelector(
                    ".product-grid"
                );


            if (!grid) {

                return;

            }


            const cards =
                Array.from(
                    grid.querySelectorAll(
                        ".product-card"
                    )
                );


            const selected =
                sortSelect.value;


            if (
                selected ===
                "Price Low to High"
            ) {

                cards.sort(
                    function (a, b) {

                        return (
                            Number(
                                a.dataset.price
                            ) -
                            Number(
                                b.dataset.price
                            )
                        );

                    }
                );

            }


            else if (
                selected ===
                "Price High to Low"
            ) {

                cards.sort(
                    function (a, b) {

                        return (
                            Number(
                                b.dataset.price
                            ) -
                            Number(
                                a.dataset.price
                            )
                        );

                    }
                );

            }


            else if (
                selected ===
                "Newest"
            ) {

                // Newest products first

                const newest =
                    [
                        "hydrating-toner",
                        "retinol-renewal-cream",
                        "brightening-eye-cream",
                        "rose-water-mist",
                        "clay-mask",
                        "niacinamide-serum",
                        "night-repair-cream",
                        "spf-50-sunscreen",
                        "glow-moisturizer",
                        "hydrating-cleanser",
                        "vitamin-c-serum"
                    ];


                cards.sort(
                    function (a, b) {

                        return (
                            newest.indexOf(
                                a.dataset.id
                            ) -
                            newest.indexOf(
                                b.dataset.id
                            )
                        );

                    }
                );

            }


            else if (
                selected ===
                "Best Selling"
            ) {

                const bestSelling =
                    [
                        "vitamin-c-serum",
                        "niacinamide-serum",
                        "glow-moisturizer",
                        "spf-50-sunscreen",
                        "night-repair-cream",
                        "hydrating-cleanser",
                        "clay-mask",
                        "hydrating-toner",
                        "rose-water-mist",
                        "brightening-eye-cream",
                        "hydrating-lip-balm",
                        "retinol-renewal-cream"
                    ];


                cards.sort(
                    function (a, b) {

                        return (
                            bestSelling.indexOf(
                                a.dataset.id
                            ) -
                            bestSelling.indexOf(
                                b.dataset.id
                            )
                        );

                    }
                );

            }


            cards.forEach(
                function (card) {

                    grid.appendChild(
                        card
                    );

                }
            );

        }
    );

}


// =========================================
// NEWSLETTER
// =========================================

const newsletterForm =
    document.querySelector(
        ".newsletter form"
    );


if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const emailInput =
                newsletterForm.querySelector(
                    "input[type='email']"
                );


            if (
                !emailInput ||
                !emailInput.value.trim()
            ) {

                return;

            }


            alert(
                "Thank you for joining the Glamora community! ✨"
            );


            emailInput.value = "";

        }
    );

}


// =========================================
// PAGE LOADED
// =========================================

console.log(
    "✨ Glamora Shop Loaded"
);
