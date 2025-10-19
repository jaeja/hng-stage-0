/**
 * Profile Card JavaScript
 * Updates current time in milliseconds every second
 */

document.addEventListener("DOMContentLoaded", function () {
  const timeElement = document.querySelector(
    '[data-testid="test-user-time"] #current-time-ms'
  );

  if (!timeElement) return;

  function updateTime() {
    const now = Date.now();
    timeElement.textContent = now;
  }

  // Update immediately
  updateTime();

  // Update every second
  setInterval(updateTime, 1000);

  // Social link click handlers for testing
  const socialLinks = document.querySelectorAll(
    '[data-testid^="test-user-social-"]'
  );
  socialLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      // Test: Log which social link was clicked
      console.log(`Social link clicked: ${this.getAttribute("data-testid")}`);
    });
  });
});
