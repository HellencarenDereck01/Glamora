// =========================================
// GLAMORA CONTACT PAGE JAVASCRIPT
// =========================================


// =========================================
// CONTACT FORM
// =========================================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value.trim();

        if (
            name === "" ||
            email === "" ||
            subject === "" ||
            message === ""
        ) {

            formMessage.textContent =
                "Please fill in all required fields.";

            formMessage.style.color = "#c0392b";

            return;
        }


        formMessage.textContent =
            "Thank you, " + name + "! Your message has been sent successfully. ✨";

        formMessage.style.color = "#b98b45";


        contactForm.reset();

    });

}


// =========================================
// FAQ ACCORDION
// =========================================

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(function (item) {

    const question = item.querySelector(".faq-question");

    question.addEventListener("click", function () {

        const isActive = item.classList.contains("active");


        // Close all FAQ items

        faqItems.forEach(function (otherItem) {

            otherItem.classList.remove("active");

        });


        // Open selected item

        if (!isActive) {

            item.classList.add("active");

        }

    });

});


// =========================================
// NEWSLETTER
// =========================================

const newsletterForm =
    document.getElementById("newsletterForm");

const newsletterMessage =
    document.getElementById("newsletterMessage");


if (newsletterForm) {

    newsletterForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const email =
            newsletterForm.querySelector("input").value.trim();


        if (email === "") {

            newsletterMessage.textContent =
                "Please enter your email address.";

            return;

        }


        newsletterMessage.textContent =
            "You're officially part of the Glamora community! ✨";


        newsletterForm.reset();

    });

}


// =========================================
// HEADER SEARCH
// =========================================

const searchInput =
    document.querySelector(".search-bar input");

const searchButton =
    document.querySelector(".search-bar button");


if (searchInput && searchButton) {

    searchButton.addEventListener("click", function () {

        const searchValue =
            searchInput.value.trim();


        if (searchValue !== "") {

            window.location.href =
                "shop.html?search=" +
                encodeURIComponent(searchValue);

        }

    });


    // Allow pressing ENTER to search

    searchInput.addEventListener("keypress", function (event) {

        if (event.key === "Enter") {

            event.preventDefault();

            searchButton.click();

        }

    });

}


// =========================================
// SCROLL TO TOP
// =========================================

const scrollButton =
    document.createElement("button");

scrollButton.innerHTML =
    '<i class="fas fa-arrow-up"></i>';

scrollButton.setAttribute(
    "aria-label",
    "Scroll to top"
);


scrollButton.style.position = "fixed";
scrollButton.style.right = "25px";
scrollButton.style.bottom = "25px";
scrollButton.style.width = "48px";
scrollButton.style.height = "48px";
scrollButton.style.border = "none";
scrollButton.style.borderRadius = "50%";
scrollButton.style.background = "#111";
scrollButton.style.color = "#fff";
scrollButton.style.fontSize = "16px";
scrollButton.style.cursor = "pointer";
scrollButton.style.display = "none";
scrollButton.style.zIndex = "999";
scrollButton.style.boxShadow =
    "0 5px 20px rgba(0,0,0,.15)";


document.body.appendChild(scrollButton);


window.addEventListener("scroll", function () {

    if (window.scrollY > 400) {

        scrollButton.style.display = "flex";

        scrollButton.style.alignItems = "center";

        scrollButton.style.justifyContent = "center";

    } else {

        scrollButton.style.display = "none";

    }

});


scrollButton.addEventListener("click", function () {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


// =========================================
// HEADER SHADOW ON SCROLL
// =========================================

const header = document.querySelector("header");

if (header) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 30) {

            header.style.boxShadow =
                "0 8px 25px rgba(0,0,0,.08)";

        } else {

            header.style.boxShadow = "none";

        }

    });

}


// =========================================
// PAGE LOADED
// =========================================

console.log("✨ Glamora Contact Page Loaded");
