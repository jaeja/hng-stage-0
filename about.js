document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll('[data-testid^="test-about-"]');
  const mainContent = document.querySelector('[data-testid="test-about-page"]');

  // Smooth scroll to sections when clicking on headings
  function setupSectionNavigation() {
    const sectionTitles = document.querySelectorAll(".section-title");

    sectionTitles.forEach((title) => {
      title.addEventListener("click", (e) => {
        e.preventDefault();
        const section = title.closest(".about-section");
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Add focus style for keyboard navigation
        section.focus();
      });
    });
  }

  // Add intersection observer for scroll animations
  function setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      observer.observe(section);
    });
  }

  // Keyboard navigation support
  function setupKeyboardNavigation() {
    // Allow Tab navigation between sections
    sections.forEach((section, index) => {
      section.setAttribute("tabindex", "0");

      section.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown" || e.key === "ArrowRight") {
          e.preventDefault();
          if (index < sections.length - 1) {
            sections[index + 1].focus();
          }
        } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
          e.preventDefault();
          if (index > 0) {
            sections[index - 1].focus();
          }
        }
      });
    });
  }

  // Add interactive hover effects to thought cards
  function setupInteractiveCards() {
    const thoughtCards = document.querySelectorAll(".thought-card");

    thoughtCards.forEach((card) => {
      // Mouse enter
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-4px) scale(1.02)";
        card.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
      });

      // Mouse leave
      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0) scale(1)";
      });

      // Keyboard focus
      card.addEventListener("focus", () => {
        card.style.transform = "translateY(-2px)";
        card.style.boxShadow = "0 10px 15px -3px rgba(102, 126, 234, 0.3)";
      });

      card.addEventListener("blur", () => {
        card.style.transform = "translateY(0)";
        card.style.boxShadow = "";
      });
    });
  }

  // Add click-to-expand functionality for confidence items
  function setupExpandableContent() {
    const confidenceItems = document.querySelectorAll(".confidence-item");

    confidenceItems.forEach((item) => {
      const header = item.querySelector("h3");
      const content = item.querySelector("p");

      header.addEventListener("click", () => {
        const isExpanded = item.classList.contains("expanded");

        if (isExpanded) {
          item.classList.remove("expanded");
          content.style.display = "block";
          header.setAttribute("aria-expanded", "false");
        } else {
          item.classList.add("expanded");
          content.style.display = "none";
          header.setAttribute("aria-expanded", "true");
        }
      });

      // Set initial ARIA attributes
      header.setAttribute("aria-expanded", "false");
      header.setAttribute("role", "button");
      header.setAttribute("tabindex", "0");
    });
  }

  // Progress indicator for scroll position
  function setupScrollProgress() {
    const progressBar = document.createElement("div");
    progressBar.className = "scroll-progress";
    progressBar.setAttribute("aria-hidden", "true");
    document.body.prepend(progressBar);

    function updateProgress() {
      const scrollTop = window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      progressBar.style.width = scrollPercent + "%";
    }

    window.addEventListener("scroll", updateProgress);
    updateProgress();
  }

  // Initialize all features
  function init() {
    setupSectionNavigation();
    setupScrollAnimations();
    setupKeyboardNavigation();
    setupInteractiveCards();
    setupExpandableContent();
    setupScrollProgress();

    // Set initial focus for accessibility
    mainContent.focus();

    // Announce page load for screen readers
    const announcement = document.createElement("div");
    announcement.className = "sr-only";
    announcement.setAttribute("aria-live", "polite");
    announcement.textContent =
      "About Me page loaded. Use arrow keys to navigate between sections.";
    document.body.appendChild(announcement);

    setTimeout(() => {
      announcement.remove();
    }, 3000);
  }

  // Add CSS for animations if not already present
  function injectAnimationStyles() {
    if (!document.querySelector("#animation-styles")) {
      const style = document.createElement("style");
      style.id = "animation-styles";
      style.textContent = `
                .about-section {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .about-section.animate-in {
                    opacity: 1;
                    transform: translateY(0);
                }
                
                .scroll-progress {
                    position: fixed;
                    top: 0;
                    left: 0;
                    height: 4px;
                    background: linear-gradient(90deg, #667eea, #764ba2);
                    z-index: 1000;
                    transition: width 0.1s ease;
                }
                
                .confidence-item.expanded p {
                    display: none;
                }
                
                .sr-only {
                    position: absolute;
                    width: 1px;
                    height: 1px;
                    padding: 0;
                    margin: -1px;
                    overflow: hidden;
                    clip: rect(0, 0, 0, 0);
                    white-space: nowrap;
                    border: 0;
                }
            `;
      document.head.appendChild(style);
    }
  }

  // Start everything when DOM is ready
  injectAnimationStyles();
  init();

  // Handle window resize
  window.addEventListener("resize", () => {
    // Reinitialize responsive behaviors if needed
  });
});
