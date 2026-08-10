// =========================================
// GLAMORA CHECKOUT JAVASCRIPT
// =========================================


// =========================================
// PRODUCT DATA
// =========================================

const checkoutProducts = {

    "vitamin-c-serum": {
        name: "Vitamin C Glow Serum",
        category: "SERUM",
        price: 24.99,
        image: "vitamin c serum.png"
    },

    "hydrating-cleanser": {
        name: "Hydrating Cleanser",
        category: "CLEANSER",
        price: 18.99,
        image: "hydrating cleanser.png"
    },

    "glow-moisturizer": {
        name: "Glow Moisturizer",
        category: "MOISTURIZER",
        price: 22.99,
        image: "glow moisturizer.png"
    },

    "spf-50-sunscreen": {
        name: "SPF 50 Sunscreen",
        category: "SUNSCREEN",
        price: 19.99,
        image: "spf 50 sunscreen.png"
    },

    "night-repair-cream": {
        name: "Night Repair Cream",
        category: "MOISTURIZER",
        price: 26.99,
        image: "night repair cfream.png"
    },

    "niacinamide-serum": {
        name: "Niacinamide Serum",
        category: "SERUM",
        price: 21.99,
        image: "niacinamide serum.png"
    },

    "clay-mask": {
        name: "Clay Mask",
        category: "FACE MASK",
        price: 17.99,
        image: "clay mask.png"
    },

    "hydrating-toner": {
        name: "Hydrating Toner",
        category: "TONER",
        price: 16.99,
        image: "hydrating toner.png"
    },

    "rose-water-mist": {
        name: "Rose Water Mist",
        category: "FACE MIST",
        price: 15.99,
        image: "rose water mist.png"
    },

    "brightening-eye-cream": {
        name: "Brightening Eye Cream",
        category: "EYE CARE",
        price: 23.99,
        image: "brightening eye cream.png"
    },

    "hydrating-lip-balm": {
        name: "Hydrating Lip Balm",
        category: "LIP CARE",
        price: 9.99,
        image: "lip balm.png"
    },

    "retinol-renewal-cream": {
        name: "Retinol Renewal Cream",
        category: "MOISTURIZER",
        price: 27.99,
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
            "Could not load Glamora cart:",
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
// FORMAT MONEY
// =========================================

function formatMoney(amount) {

    return "$" + amount.toFixed(2);

}


// =========================================
// GET PRODUCT
// =========================================

function getProduct(item) {

    return (
        checkoutProducts[item.id] ||
        item
    );

}


// =========================================
// GET SUBTOTAL
// =========================================

function getSubtotal() {

    const cart =
        getCart();

    return cart.reduce(
        function (total, item) {

            const product =
                getProduct(item);

            return total +
                (
                    Number(product.price) *
                    Number(item.quantity)
                );

        },
        0
    );

}


// =========================================
// GET SAVED DISCOUNT
// =========================================

function getDiscount() {

    const savedDiscount =
        localStorage.getItem(
            "glamoraDiscount"
        );

    if (!savedDiscount) {

        return 0;

    }

    const discount =
        parseFloat(savedDiscount);

    return Number.isFinite(discount)
        ? discount
        : 0;

}


// =========================================
// RENDER CHECKOUT ITEMS
// =========================================

const checkoutItems =
    document.getElementById(
        "checkoutItems"
    );


function renderCheckoutItems() {

    const cart =
        getCart();


    if (!checkoutItems) {

        return;

    }


    checkoutItems.innerHTML = "";


    if (cart.length === 0) {

        checkoutItems.innerHTML = `

            <div class="checkout-empty">

                <i class="fas fa-shopping-bag"></i>

                <p>
                    Your cart is empty.
                </p>

                <a href="shop.html">
                    Continue Shopping
                </a>

            </div>

        `;

        return;

    }


    cart.forEach(
        function (item) {

            const product =
                getProduct(item);


            const itemTotal =
                Number(product.price) *
                Number(item.quantity);


            const itemElement =
                document.createElement(
                    "div"
                );


            itemElement.className =
                "checkout-item";


            itemElement.innerHTML = `

                <div class="checkout-item-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                    <span class="checkout-item-quantity">

                        ${item.quantity}

                    </span>

                </div>


                <div class="checkout-item-info">

                    <h3>
                        ${product.name}
                    </h3>

                    <span>
                        ${product.category || "SKINCARE"}
                    </span>

                </div>


                <strong class="checkout-item-price">

                    ${formatMoney(itemTotal)}

                </strong>

            `;


            checkoutItems.appendChild(
                itemElement
            );

        }
    );

}


// =========================================
// SUMMARY ELEMENTS
// =========================================

const checkoutSubtotal =
    document.getElementById(
        "checkoutSubtotal"
    );

const checkoutShipping =
    document.getElementById(
        "checkoutShipping"
    );

const checkoutDiscount =
    document.getElementById(
        "checkoutDiscount"
    );

const checkoutTotal =
    document.getElementById(
        "checkoutTotal"
    );


// =========================================
// SHIPPING METHOD
// =========================================

let selectedShipping =
    "standard";


const shippingPrices = {

    standard: 5.99,

    express: 12.99,

    free: 0

};


// =========================================
// UPDATE SHIPPING PRICE
// =========================================

function updateShippingDisplay() {

    const standardShipping =
        document.getElementById(
            "standardShipping"
        );


    const subtotal =
        getSubtotal();


    if (standardShipping) {

        if (subtotal >= 50) {

            standardShipping.textContent =
                "FREE";

        } else {

            standardShipping.textContent =
                "$5.99";

        }

    }

}


// =========================================
// GET SHIPPING COST
// =========================================

function getShippingCost() {

    const subtotal =
        getSubtotal();


    // Free shipping automatically
    // applies to orders over $50.

    if (subtotal >= 50) {

        return 0;

    }


    return shippingPrices[
        selectedShipping
    ];

}


// =========================================
// UPDATE SUMMARY
// =========================================

function updateCheckoutSummary() {

    const subtotal =
        getSubtotal();


    const shipping =
        getShippingCost();


    const discount =
        Math.min(
            getDiscount(),
            subtotal
        );


    const total =
        Math.max(
            0,
            subtotal +
            shipping -
            discount
        );


    if (checkoutSubtotal) {

        checkoutSubtotal.textContent =
            formatMoney(subtotal);

    }


    if (checkoutShipping) {

        checkoutShipping.textContent =
            shipping === 0
                ? "FREE"
                : formatMoney(shipping);

    }


    if (checkoutDiscount) {

        checkoutDiscount.textContent =
            "-" +
            formatMoney(discount);

    }


    if (checkoutTotal) {

        checkoutTotal.textContent =
            formatMoney(total);

    }


    updateShippingDisplay();

}


// =========================================
// SHIPPING RADIO BUTTONS
// =========================================

const shippingInputs =
    document.querySelectorAll(
        'input[name="shippingMethod"]'
    );


shippingInputs.forEach(
    function (input) {

        input.addEventListener(
            "change",
            function () {

                selectedShipping =
                    input.value;

                updateCheckoutSummary();

            }
        );

    }
);


// =========================================
// PAYMENT METHODS
// =========================================

const paymentInputs =
    document.querySelectorAll(
        'input[name="paymentMethod"]'
    );

const paymentMethods =
    document.querySelectorAll(
        ".payment-method"
    );

const cardDetails =
    document.getElementById(
        "cardDetails"
    );


function updatePaymentMethod() {

    let selectedPayment =
        "card";


    paymentInputs.forEach(
        function (input) {

            if (input.checked) {

                selectedPayment =
                    input.value;

            }

        }
    );


    paymentMethods.forEach(
        function (method) {

            const input =
                method.querySelector(
                    "input"
                );


            if (
                input &&
                input.checked
            ) {

                method.classList.add(
                    "active"
                );

            } else {

                method.classList.remove(
                    "active"
                );

            }

        }
    );


    if (cardDetails) {

        if (
            selectedPayment === "card"
        ) {

            cardDetails.style.display =
                "block";

        } else {

            cardDetails.style.display =
                "none";

        }

    }

}


paymentInputs.forEach(
    function (input) {

        input.addEventListener(
            "change",
            updatePaymentMethod
        );

    }
);


// =========================================
// CARD NUMBER FORMATTING
// =========================================

const cardNumber =
    document.getElementById(
        "cardNumber"
    );


if (cardNumber) {

    cardNumber.addEventListener(
        "input",
        function () {

            let value =
                cardNumber.value
                    .replace(/\D/g, "")
                    .substring(0, 16);


            let formatted =
                value.match(
                    /.{1,4}/g
                );


            cardNumber.value =
                formatted
                    ? formatted.join(" ")
                    : "";

        }
    );

}


// =========================================
// EXPIRY DATE FORMATTING
// =========================================

const expiry =
    document.getElementById(
        "expiry"
    );


if (expiry) {

    expiry.addEventListener(
        "input",
        function () {

            let value =
                expiry.value
                    .replace(/\D/g, "")
                    .substring(0, 4);


            if (value.length >= 3) {

                value =
                    value.substring(0, 2) +
                    " / " +
                    value.substring(2);

            }


            expiry.value =
                value;

        }
    );

}


// =========================================
// CVV
// =========================================

const cvv =
    document.getElementById(
        "cvv"
    );


if (cvv) {

    cvv.addEventListener(
        "input",
        function () {

            cvv.value =
                cvv.value
                    .replace(/\D/g, "")
                    .substring(0, 4);

        }
    );

}


// =========================================
// FORM VALIDATION
// =========================================

const checkoutForm =
    document.getElementById(
        "checkoutForm"
    );

const checkoutMessage =
    document.getElementById(
        "checkoutMessage"
    );


function validatePayment() {

    let selectedPayment =
        "card";


    paymentInputs.forEach(
        function (input) {

            if (input.checked) {

                selectedPayment =
                    input.value;

            }

        }
    );


    // Card payment

    if (
        selectedPayment === "card"
    ) {

        const cardName =
            document.getElementById(
                "cardName"
            );

        const cardNumberValue =
            document.getElementById(
                "cardNumber"
            );

        const expiryValue =
            document.getElementById(
                "expiry"
            );

        const cvvValue =
            document.getElementById(
                "cvv"
            );


        if (
            !cardName.value.trim() ||
            !cardNumberValue.value.trim() ||
            !expiryValue.value.trim() ||
            !cvvValue.value.trim()
        ) {

            return false;

        }


        const cleanCardNumber =
            cardNumberValue.value
                .replace(/\s/g, "");


        if (
            cleanCardNumber.length < 16
        ) {

            return false;

        }


        if (
            cvvValue.value.length < 3
        ) {

            return false;

        }

    }


    return true;

}


// =========================================
// GENERATE ORDER NUMBER
// =========================================

function generateOrderNumber() {

    const randomNumber =
        Math.floor(
            100000 +
            Math.random() * 900000
        );


    return "GLM-" +
        randomNumber;

}


// =========================================
// SAVE ORDER
// =========================================

function saveOrder(order) {

    localStorage.setItem(
        "glamoraLastOrder",
        JSON.stringify(order)
    );

}


// =========================================
// SHOW CONFIRMATION
// =========================================

function showConfirmation(
    orderNumber
) {

    const confirmation =
        document.getElementById(
            "orderConfirmation"
        );

    const checkoutContainer =
        document.querySelector(
            ".checkout-container"
        );

    const progress =
        document.querySelector(
            ".checkout-progress"
        );


    const topBar =
        document.querySelector(
            ".top-bar"
        );

    const header =
        document.querySelector(
            "header"
        );


    const confirmationNumber =
        document.getElementById(
            "orderNumber"
        );


    if (confirmationNumber) {

        confirmationNumber.textContent =
            orderNumber;

    }


    if (checkoutContainer) {

        checkoutContainer.style.display =
            "none";

    }


    if (progress) {

        progress.style.display =
            "none";

    }


    if (confirmation) {

        confirmation.classList.add(
            "visible"
        );

    }


    if (topBar) {

        topBar.style.display =
            "none";

    }


    if (header) {

        header.style.display =
            "none";

    }


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// =========================================
// PLACE ORDER
// =========================================

if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const cart =
                getCart();


            // =================================
            // CHECK CART
            // =================================

            if (cart.length === 0) {

                if (checkoutMessage) {

                    checkoutMessage.textContent =
                        "Your cart is empty. Please add a product first.";

                }

                return;

            }


            // =================================
            // VALIDATE PAYMENT
            // =================================

            if (!validatePayment()) {

                if (checkoutMessage) {

                    checkoutMessage.textContent =
                        "Please complete your payment information.";

                }

                return;

            }


            // =================================
            // FORM DATA
            // =================================

            const formData =
                new FormData(
                    checkoutForm
                );


            const subtotal =
                getSubtotal();


            const shipping =
                getShippingCost();


            const discount =
                Math.min(
                    getDiscount(),
                    subtotal
                );


            const total =
                Math.max(
                    0,
                    subtotal +
                    shipping -
                    discount
                );


            const orderNumber =
                generateOrderNumber();


            // =================================
            // CREATE ORDER
            // =================================

            const order = {

                orderNumber:
                    orderNumber,

                date:
                    new Date()
                        .toISOString(),

                customer: {

                    firstName:
                        formData.get(
                            "firstName"
                        ),

                    lastName:
                        formData.get(
                            "lastName"
                        ),

                    email:
                        formData.get(
                            "email"
                        ),

                    phone:
                        formData.get(
                            "phone"
                        ),

                    country:
                        formData.get(
                            "country"
                        ),

                    address:
                        formData.get(
                            "address"
                        ),

                    city:
                        formData.get(
                            "city"
                        ),

                    region:
                        formData.get(
                            "region"
                        ),

                    postalCode:
                        formData.get(
                            "postalCode"
                        )

                },


                shippingMethod:
                    selectedShipping,


                paymentMethod:
                    document.querySelector(
                        'input[name="paymentMethod"]:checked'
                    )?.value || "card",


                items:
                    cart,


                subtotal:
                    subtotal,


                shipping:
                    shipping,


                discount:
                    discount,


                total:
                    total

            };


            // =================================
            // SAVE ORDER
            // =================================

            saveOrder(order);


            // =================================
            // CLEAR CART
            // =================================

            localStorage.removeItem(
                "glamoraCart"
            );

            localStorage.removeItem(
                "glamoraDiscount"
            );


            // =================================
            // SHOW CONFIRMATION
            // =================================

            showConfirmation(
                orderNumber
            );

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
                !emailInput.value.trim()
            ) {

                if (newsletterMessage) {

                    newsletterMessage.textContent =
                        "Please enter your email address.";

                }

                return;

            }


            if (newsletterMessage) {

                newsletterMessage.textContent =
                    "Welcome to the Glamora community! ✨";

            }


            emailInput.value = "";

        }
    );

}


// =========================================
// INITIALIZE
// =========================================

renderCheckoutItems();

updateCheckoutSummary();

updatePaymentMethod();


console.log(
    "✨ Glamora Checkout Loaded"
);
