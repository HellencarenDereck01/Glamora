// =========================================
// GLAMORA CART JAVASCRIPT
// =========================================


// =========================================
// PRODUCT DATA
// =========================================

const cartProducts = {

    "vitamin-c-serum": {
        name: "Vitamin C Serum",
        category: "SERUM",
        price: 34.99,
        image: "vitamin c serum.png"
    },

    "hydrating-cleanser": {
        name: "Hydrating Cleanser",
        category: "CLEANSER",
        price: 24.99,
        image: "hydrating cleanser.png"
    },

    "glow-moisturizer": {
        name: "Glow Moisturizer",
        category: "MOISTURIZER",
        price: 29.99,
        image: "glow moisturizer.png"
    },

    "spf-50-sunscreen": {
        name: "SPF 50 Sunscreen",
        category: "SUNSCREEN",
        price: 27.99,
        image: "spf 50 sunscreen.png"
    },

    "night-repair-cream": {
        name: "Night Repair Cream",
        category: "MOISTURIZER",
        price: 39.99,
        image: "night repair cfream.png"
    },

    "niacinamide-serum": {
        name: "Niacinamide Serum",
        category: "SERUM",
        price: 32.99,
        image: "niacinamide serum.png"
    },

    "clay-mask": {
        name: "Clay Face Mask",
        category: "FACE MASK",
        price: 22.99,
        image: "clay mask.png"
    },

    "hydrating-toner": {
        name: "Hydrating Toner",
        category: "TONER",
        price: 25.99,
        image: "hydrating toner.png"
    },

    "rose-water-mist": {
        name: "Rose Water Mist",
        category: "FACE MIST",
        price: 19.99,
        image: "rose water  mist.png"
    },

    "brightening-eye-cream": {
        name: "Brightening Eye Cream",
        category: "EYE CARE",
        price: 29.99,
        image: "brightening eye cream.png"
    },

    "hydrating-lip-balm": {
        name: "Hydrating Lip Balm",
        category: "LIP CARE",
        price: 14.99,
        image: "lip balm.png"
    },

    "retinol-renewal-cream": {
        name: "Retinol Renewal Cream",
        category: "MOISTURIZER",
        price: 44.99,
        image: "retinol.png"
    }

};


// =========================================
// GET CART
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
            "Unable to read Glamora cart:",
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
// CART COUNT
// =========================================

function updateCartCount() {

    const cart = getCart();

    const totalItems =
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
            totalItems;

    }

}


// =========================================
// CART ELEMENTS
// =========================================

const cartItemsContainer =
    document.getElementById("cartItems");

const emptyCart =
    document.getElementById("emptyCart");

const cartItemLabel =
    document.getElementById("cartItemLabel");

const subtotalElement =
    document.getElementById("subtotal");

const shippingElement =
    document.getElementById("shipping");

const discountElement =
    document.getElementById("discount");

const totalElement =
    document.getElementById("total");


// =========================================
// PROMO VARIABLES
// =========================================

let appliedDiscount = 0;

let promoApplied = false;


// =========================================
// FORMAT MONEY
// =========================================

function formatMoney(amount) {

    return "$" + amount.toFixed(2);

}


// =========================================
// RENDER CART
// =========================================

function renderCart() {

    const cart = getCart();


    if (!cartItemsContainer) {
        return;
    }


    cartItemsContainer.innerHTML = "";


    // =====================================
    // EMPTY CART
    // =====================================

    if (cart.length === 0) {

        if (emptyCart) {

            emptyCart.classList.add(
                "visible"
            );

        }


        if (cartItemLabel) {

            cartItemLabel.textContent =
                "0 items";

        }


        updateSummary();

        return;

    }


    if (emptyCart) {

        emptyCart.classList.remove(
            "visible"
        );

    }


    // =====================================
    // CREATE CART ITEMS
    // =====================================

    cart.forEach(
        function (item) {

            const product =
                cartProducts[item.id] || item;


            const cartItem =
                document.createElement(
                    "article"
                );


            cartItem.className =
                "cart-item";


            cartItem.setAttribute(
                "data-id",
                item.id
            );


            const itemTotal =
                product.price *
                item.quantity;


            cartItem.innerHTML = `

                <div class="cart-item-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                </div>


                <div class="cart-item-info">

                    <span class="cart-item-category">

                        ${product.category || "SKINCARE"}

                    </span>


                    <h3>

                        ${product.name}

                    </h3>


                    <p class="cart-item-price">

                        ${formatMoney(product.price)}
                        each

                    </p>


                    <div class="cart-item-controls">

                        <div class="cart-quantity">

                            <button
                                type="button"
                                class="decrease-cart"
                                data-id="${item.id}"
                            >

                                −

                            </button>


                            <span>

                                ${item.quantity}

                            </span>


                            <button
                                type="button"
                                class="increase-cart"
                                data-id="${item.id}"
                            >

                                +

                            </button>

                        </div>


                        <button
                            type="button"
                            class="remove-item"
                            data-id="${item.id}"
                        >

                            <i class="far fa-trash-can"></i>

                            Remove

                        </button>

                    </div>

                </div>


                <strong class="cart-item-total">

                    ${formatMoney(itemTotal)}

                </strong>

            `;


            cartItemsContainer.appendChild(
                cartItem
            );

        }
    );


    // =====================================
    // ITEM COUNT
    // =====================================

    const totalItems =
        cart.reduce(
            function (total, item) {

                return total + item.quantity;

            },
            0
        );


    if (cartItemLabel) {

        cartItemLabel.textContent =
            totalItems === 1
                ? "1 item"
                : totalItems + " items";

    }


    attachCartEvents();

    updateSummary();

}


// =========================================
// CART BUTTON EVENTS
// =========================================

function attachCartEvents() {


    // =====================================
    // INCREASE QUANTITY
    // =====================================

    const increaseButtons =
        document.querySelectorAll(
            ".increase-cart"
        );


    increaseButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const id =
                        button.getAttribute(
                            "data-id"
                        );


                    const cart =
                        getCart();


                    const item =
                        cart.find(
                            function (cartItem) {

                                return cartItem.id === id;

                            }
                        );


                    if (item) {

                        item.quantity++;

                        saveCart(cart);

                        renderCart();

                        updateCartCount();

                    }

                }
            );

        }
    );


    // =====================================
    // DECREASE QUANTITY
    // =====================================

    const decreaseButtons =
        document.querySelectorAll(
            ".decrease-cart"
        );


    decreaseButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const id =
                        button.getAttribute(
                            "data-id"
                        );


                    const cart =
                        getCart();


                    const item =
                        cart.find(
                            function (cartItem) {

                                return cartItem.id === id;

                            }
                        );


                    if (item) {

                        if (item.quantity > 1) {

                            item.quantity--;

                        } else {

                            const index =
                                cart.indexOf(
                                    item
                                );


                            cart.splice(
                                index,
                                1
                            );

                        }


                        saveCart(cart);

                        renderCart();

                        updateCartCount();

                    }

                }
            );

        }
    );


    // =====================================
    // REMOVE PRODUCT
    // =====================================

    const removeButtons =
        document.querySelectorAll(
            ".remove-item"
        );


    removeButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const id =
                        button.getAttribute(
                            "data-id"
                        );


                    let cart =
                        getCart();


                    cart =
                        cart.filter(
                            function (item) {

                                return item.id !== id;

                            }
                        );


                    saveCart(cart);

                    renderCart();

                    updateCartCount();

                }
            );

        }
    );

}


// =========================================
// UPDATE SUMMARY
// =========================================

function updateSummary() {

    const cart =
        getCart();


    const subtotal =
        cart.reduce(
            function (total, item) {

                const product =
                    cartProducts[item.id] || item;


                return total +
                    (
                        product.price *
                        item.quantity
                    );

            },
            0
        );


    // =====================================
    // SHIPPING
    // =====================================

    let shipping = 0;


    if (subtotal === 0) {

        shipping = 0;

    } else if (subtotal >= 50) {

        shipping = 0;

    } else {

        shipping = 5.99;

    }


    // =====================================
    // DISCOUNT
    // =====================================

    const discount =
        promoApplied
            ? appliedDiscount
            : 0;


    // =====================================
    // TOTAL
    // =====================================

    const total =
        Math.max(
            0,
            subtotal +
            shipping -
            discount
        );


    // =====================================
    // UPDATE HTML
    // =====================================

    if (subtotalElement) {

        subtotalElement.textContent =
            formatMoney(subtotal);

    }


    if (shippingElement) {

        shippingElement.textContent =
            shipping === 0
                ? "FREE"
                : formatMoney(shipping);

    }


    if (discountElement) {

        discountElement.textContent =
            "-" + formatMoney(discount);

    }


    if (totalElement) {

        totalElement.textContent =
            formatMoney(total);

    }

}


// =========================================
// PROMO CODE
// =========================================

const applyPromo =
    document.getElementById(
        "applyPromo"
    );


const promoCode =
    document.getElementById(
        "promoCode"
    );


const promoMessage =
    document.getElementById(
        "promoMessage"
    );


if (applyPromo) {

    applyPromo.addEventListener(
        "click",
        function () {

            const code =
                promoCode.value
                    .trim()
                    .toUpperCase();


            const cart =
                getCart();


            const subtotal =
                cart.reduce(
                    function (total, item) {

                        const product =
                            cartProducts[item.id] ||
                            item;


                        return total +
                            (
                                product.price *
                                item.quantity
                            );

                    },
                    0
                );


            if (code === "") {

                promoMessage.textContent =
                    "Please enter a promo code.";

                return;

            }


            // =================================
            // GLAMORA10
            // =================================

            if (code === "GLAMORA10") {

                if (subtotal === 0) {

                    promoMessage.textContent =
                        "Add an item to your cart first.";

                    return;

                }


                appliedDiscount =
                    subtotal * 0.10;


                promoApplied = true;


                promoMessage.textContent =
                    "10% discount applied! ✨";


                updateSummary();


                return;

            }


            // =================================
            // INVALID CODE
            // =================================

            appliedDiscount = 0;

            promoApplied = false;


            promoMessage.textContent =
                "That promo code isn't valid.";


            updateSummary();

        }
    );

}


// =========================================
// QUICK ADD
// =========================================

const quickAddButtons =
    document.querySelectorAll(
        ".quick-add"
    );


quickAddButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const id =
                    button.getAttribute(
                        "data-product"
                    );


                const product =
                    cartProducts[id];


                if (!product) {
                    return;
                }


                const cart =
                    getCart();


                const existing =
                    cart.find(
                        function (item) {

                            return item.id === id;

                        }
                    );


                if (existing) {

                    existing.quantity++;

                } else {

                    cart.push({

                        id: id,

                        name: product.name,

                        price: product.price,

                        image: product.image,

                        quantity: 1

                    });

                }


                saveCart(cart);

                updateCartCount();

                renderCart();


                const originalText =
                    button.textContent;


                button.textContent =
                    "Added ✓";


                button.style.background =
                    "#111111";


                button.style.color =
                    "#ffffff";


                setTimeout(
                    function () {

                        button.textContent =
                            originalText;


                        button.style.background =
                            "";


                        button.style.color =
                            "";

                    },
                    1500
                );

            }
        );

    }
);


// =========================================
// RECOMMENDATION WISHLIST
// =========================================

const wishlistButtons =
    document.querySelectorAll(
        ".recommendation-wishlist"
    );


wishlistButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                button.classList.toggle(
                    "active"
                );


                const icon =
                    button.querySelector("i");


                if (icon) {

                    if (
                        button.classList.contains(
                            "active"
                        )
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

    }
);


// =========================================
// CHECKOUT
// =========================================

const checkoutButton =
    document.getElementById(
        "checkoutButton"
    );


if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        function () {

            const cart =
                getCart();


            if (cart.length === 0) {

                alert(
                    "Your cart is empty. Add a product before checking out."
                );

                return;

            }


            window.location.href =
                "checkout.html";

        }
    );

}


// =========================================
// SEARCH
// =========================================

const cartSearch =
    document.getElementById(
        "cartSearch"
    );


const searchButton =
    document.getElementById(
        "searchButton"
    );


function performSearch() {

    const searchTerm =
        cartSearch.value.trim();


    if (searchTerm === "") {

        return;

    }


    window.location.href =
        "shop.html?search=" +
        encodeURIComponent(
            searchTerm
        );

}


if (searchButton) {

    searchButton.addEventListener(
        "click",
        performSearch
    );

}


if (cartSearch) {

    cartSearch.addEventListener(
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
                emailInput.value.trim() === ""
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
// INITIALIZE
// =========================================

updateCartCount();

renderCart();


console.log(
    "✨ Glamora Cart Loaded"
);
/* cart */
