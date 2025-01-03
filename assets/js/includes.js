document.addEventListener("DOMContentLoaded", () => {
    // Include HTML content dynamically
    const includes = document.querySelectorAll("[data-include]");
    includes.forEach((element) => {
        const file = element.getAttribute("data-include");
        if (file) {
            fetch(file)
                .then((response) => {
                    if (!response.ok) throw new Error(`Failed to load ${file}`);
                    return response.text();
                })
                .then((data) => {
                    element.innerHTML = data;

                    // After inserting the header/footer, re-run the active link logic
                    if (element.querySelector(".page-selector")) {
                        updateActiveLinks();
                    }

                    // If the footer is being loaded, update the year dynamically
                    if (file.includes("footer.html")) {
                        const footerYear = element.querySelector("#footer-year");
                        if (footerYear) {
                            footerYear.textContent = new Date().getFullYear();
                        }
                    }
                })
                .catch((error) => console.error(error));
        }
    });

    // Function to update active links in the page selector
    function updateActiveLinks() {
        const links = document.querySelectorAll(".page-selector a");
        const currentPage = window.location.pathname.split("/").pop();

        links.forEach(link => {
            if (link.getAttribute("href") === currentPage) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    // Call updateActiveLinks for inline content (if already loaded)
    updateActiveLinks();
});
