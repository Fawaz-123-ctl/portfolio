const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const yearElement = document.getElementById("year");

// Automatically update the copyright year.
yearElement.textContent = new Date().getFullYear();

// Mobile navigation menu.
menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

// Close the mobile menu after selecting a section.
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
});

// Reveal elements when they enter the viewport.
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}

// Highlight the navigation link for the current section.
const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    navLinks.forEach((link) => {
                        const isActive =
                            link.getAttribute("href") ===
                            `#${entry.target.id}`;

                        link.classList.toggle("active", isActive);
                    });
                }
            });
        },
        {
            rootMargin: "-30% 0px -55% 0px"
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });
}