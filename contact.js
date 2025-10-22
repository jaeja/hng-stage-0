document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const successMessage = document.getElementById("success-message");
  const submitBtn = document.querySelector(
    '[data-testid="test-contact-submit"]'
  );

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validation functions
  function validateFullName(value) {
    return value.trim().length > 0;
  }

  function validateEmail(value) {
    return emailRegex.test(value.trim());
  }

  function validateSubject(value) {
    return value.trim().length > 0;
  }

  function validateMessage(value) {
    return value.trim().length >= 10;
  }

  // Get error element for field
  function getErrorElement(fieldId) {
    return document.getElementById(`${fieldId}-error`);
  }

  // Show error message
  function showError(field, message) {
    const errorElement = getErrorElement(field.id);
    errorElement.textContent = message;
    field.setAttribute("aria-invalid", "true");
    field.classList.add("error");
  }

  // Clear error message
  function clearError(field) {
    const errorElement = getErrorElement(field.id);
    errorElement.textContent = "";
    field.removeAttribute("aria-invalid");
    field.classList.remove("error");
  }

  // Validate single field
  function validateField(field) {
    let isValid = true;
    const value = field.value;

    switch (field.name) {
      case "fullName":
        if (!validateFullName(value)) {
          showError(field, "Full name is required.");
          isValid = false;
        } else {
          clearError(field);
        }
        break;
      case "email":
        if (!validateEmail(value)) {
          showError(field, "Please enter a valid email address.");
          isValid = false;
        } else {
          clearError(field);
        }
        break;
      case "subject":
        if (!validateSubject(value)) {
          showError(field, "Subject is required.");
          isValid = false;
        } else {
          clearError(field);
        }
        break;
      case "message":
        if (!validateMessage(value)) {
          showError(field, "Message must be at least 10 characters long.");
          isValid = false;
        } else {
          clearError(field);
        }
        break;
    }

    return isValid;
  }

  // Validate entire form
  function validateForm() {
    const fields = form.querySelectorAll("input, textarea");
    let isValid = true;

    fields.forEach((field) => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  }

  // Real-time validation
  function setupRealTimeValidation() {
    const fields = form.querySelectorAll("input, textarea");

    fields.forEach((field) => {
      field.addEventListener("blur", () => {
        validateField(field);
      });

      field.addEventListener("input", () => {
        if (field.getAttribute("aria-invalid") === "true") {
          validateField(field);
        }
      });
    });
  }

  // Form submission handler
  function handleSubmit(e) {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      submitBtn.focus(); // Return focus to submit button
      return;
    }

    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    // Simulate API call
    setTimeout(() => {
      // Hide form and show success message
      form.style.display = "none";
      successMessage.classList.add("show");

      // Reset button state
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
    }, 1500);
  }

  // Keyboard navigation support
  function setupKeyboardNavigation() {
    const focusableElements = form.querySelectorAll(
      "input, textarea, button:not(:disabled)"
    );

    focusableElements.forEach((element, index) => {
      element.addEventListener("keydown", (e) => {
        if (e.key === "Tab") {
          const lastElement = focusableElements[focusableElements.length - 1];
          if (e.shiftKey && element === focusableElements[0]) {
            // Shift+Tab on first element
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && element === lastElement) {
            // Tab on last element
            e.preventDefault();
            focusableElements[0].focus();
          }
        }
      });
    });
  }

  // Initialize form
  function init() {
    setupRealTimeValidation();
    setupKeyboardNavigation();

    // Set initial focus
    form.querySelector('[data-testid="test-contact-name"]').focus();
  }

  // Event listeners
  form.addEventListener("submit", handleSubmit);

  // Initialize when DOM is loaded
  init();
});
