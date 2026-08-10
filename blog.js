// =========================================
// GLAMORA BLOG JAVASCRIPT
// =========================================


// =========================================
// CATEGORY FILTER
// =========================================

const categoryButtons =
    document.querySelectorAll(".category-btn");

const blogCards =
    document.querySelectorAll(".blog-card");

const featuredPost =
    document.querySelector(".featured-post");


categoryButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const selectedCategory =
            button.getAttribute("data-category");


        // Remove active from all buttons

        categoryButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });


        // Add active to clicked button

        button.classList.add("active");


        // Filter regular articles

        blogCards.forEach(function (card) {

            const cardCategory =
                card.getAttribute("data-category");


            if (
                selectedCategory === "all" ||
                cardCategory === selectedCategory
            ) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

            }

        });


        // Filter featured article

        if (featuredPost) {

            const featuredCategory =
                featuredPost.getAttribute("data-category");


            if (
                selectedCategory === "all" ||
                featuredCategory === selectedCategory
            ) {

                featuredPost.classList.remove("hidden");

            } else {

                featuredPost.classList.add("hidden");

            }

        }

    });

});



// =========================================
// BLOG SEARCH
// =========================================

const blogSearch =
    document.getElementById("blogSearch");

const searchButton =
    document.getElementById("searchButton");


function searchArticles() {

    const searchTerm =
        blogSearch.value
            .trim()
            .toLowerCase();


    if (searchTerm === "") {

        blogCards.forEach(function (card) {

            card.classList.remove("hidden");

        });


        if (featuredPost) {

            featuredPost.classList.remove("hidden");

        }

        return;

    }


    // Search regular articles

    blogCards.forEach(function (card) {

        const articleText =
            card.textContent.toLowerCase();


        if (articleText.includes(searchTerm)) {

            card.classList.remove("hidden");

        } else {

            card.classList.add("hidden");

        }

    });


    // Search featured article

    if (featuredPost) {

        const featuredText =
            featuredPost.textContent.toLowerCase();


        if (featuredText.includes(searchTerm)) {

            featuredPost.classList.remove("hidden");

        } else {

            featuredPost.classList.add("hidden");

        }

    }

}


if (searchButton) {

    searchButton.addEventListener(
        "click",
        searchArticles
    );

}


if (blogSearch) {

    blogSearch.addEventListener(
        "keypress",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                searchArticles();

            }

        }
    );

}



// =========================================
// READ ARTICLE BUTTONS
// =========================================

const readMoreButtons =
    document.querySelectorAll(".read-more");


readMoreButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const articleTitle =
            button.getAttribute("data-title");


        alert(
            "✨ " +
            articleTitle +
            "\n\nThis article will be available soon on the Glamora Beauty Journal."
        );

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

    newsletterForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const emailInput =
                newsletterForm.querySelector("input");


            const email =
                emailInput.value.trim();


            if (email === "") {

                newsletterMessage.textContent =
                    "Please enter your email address.";

                return;

            }


            newsletterMessage.textContent =
                "You're officially part of the Glamora community! ✨";


            emailInput.value = "";

        }
    );

}



// =========================================
// HEADER SEARCH ENTER KEY
// =========================================

if (blogSearch) {

    blogSearch.addEventListener(
        "input",
        function () {

            if (blogSearch.value.trim() === "") {

                blogCards.forEach(function (card) {

                    card.classList.remove("hidden");

                });


                if (featuredPost) {

                    featuredPost.classList.remove("hidden");

                }

            }

        }
    );

}



// =========================================
// SCROLL TO TOP BUTTON
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

scrollButton.style.alignItems = "center";

scrollButton.style.justifyContent = "center";

scrollButton.style.zIndex = "999";

scrollButton.style.boxShadow =
    "0 5px 20px rgba(0,0,0,.15)";


document.body.appendChild(scrollButton);


window.addEventListener(
    "scroll",
    function () {

        if (window.scrollY > 400) {

            scrollButton.style.display = "flex";

        } else {

            scrollButton.style.display = "none";

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
    document.querySelector("header");


if (header) {

    window.addEventListener(
        "scroll",
        function () {

            if (window.scrollY > 30) {

                header.style.boxShadow =
                    "0 8px 25px rgba(0,0,0,.08)";

            } else {

                header.style.boxShadow = "none";

            }

        }
    );

}



// =========================================
// PAGE LOADED
// =========================================

console.log(
    "✨ Glamora Beauty Journal Loaded"
);
