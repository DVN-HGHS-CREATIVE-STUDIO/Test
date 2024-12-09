// Dropdown Menu
const menuButton = document.querySelector(".menu-container");
const closeButton = document.querySelector(".close-button");
const dropdownMenu = document.querySelector(".dropdown-menu");
const menuIcon = document.querySelector(".menu-icon");

menuButton?.addEventListener("click", () => {
  dropdownMenu?.classList.add("active");
  menuIcon?.classList.add("active");
  document.body.classList.add("menu-open");
});

closeButton?.addEventListener("click", () => {
  dropdownMenu?.classList.remove("active");
  menuIcon?.classList.remove("active");
  document.body.classList.remove("menu-open");
});

document.addEventListener("click", (e) => {
  if (
    dropdownMenu &&
    !dropdownMenu.contains(e.target) &&
    !menuButton?.contains(e.target)
  ) {
    dropdownMenu.classList.remove("active");
    menuIcon?.classList.remove("active");
    document.body.classList.remove("menu-open");
  }
});

// Date and Time
function updateDateTime() {
  const now = new Date();

  const date = now.getDate();
  const month = now.toLocaleString("en-US", { month: "long" }).toLowerCase();
  const day = now.toLocaleString("en-US", { weekday: "short" }).toLowerCase();

  let hours = now.getHours() % 12 || 12;
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const ampm = now.getHours() >= 12 ? "pm" : "am";

  const dateElement = document.querySelector(".date-number");
  const monthElement = document.querySelector(".month");
  const dayTimeElement = document.querySelector(".day-time");

  if (dateElement) dateElement.textContent = date;
  if (monthElement) monthElement.textContent = month;
  if (dayTimeElement)
    dayTimeElement.textContent = `${day} ${hours}:${minutes}${ampm}`;
}

updateDateTime();
setInterval(updateDateTime, 1000);

// Home Page Animations
function initializeProfileRotation() {
  const profileContainer = document.querySelector(".profile-image");
  const images = document.querySelectorAll(".profile-image img");
  if (!images.length) return;

  let currentImageIndex = 0;

  function rotateImages() {
    images.forEach((img) => img.classList.remove("active"));
    currentImageIndex = (currentImageIndex + 1) % images.length;
    images[currentImageIndex].classList.add("active");
  }

  setTimeout(() => {
    images[0].classList.add("active");
    setInterval(rotateImages, 5000);
  }, 1000);
}

// Welcome Message Animation
function initializeAnimations() {
  const elements = {
    profile: document.querySelector(".profile-image"),
    logo: document.querySelector(".designer-developer-logo"),
    title: document.querySelector(".welcome-message h2"),
    text: document.querySelector(".welcome-message p"),
    button: document.querySelector(".contact-button"),
  };

  const delays = {
    profile: 400,
    logo: 400,
    title: 600,
    text: 1000,
    button: 1400,
  };

  Object.entries(elements).forEach(([key, element]) => {
    if (element) {
      setTimeout(() => {
        element.classList.add(key === "profile" ? "fade-in" : "slide-in");
      }, delays[key]);
    }
  });
}

// Contact Form Validation
function initializeContactForm() {
  const elements = {
    form: document.querySelector(".contact-form"),
    name: document.querySelector(".name-input"),
    phone: document.querySelector(".phone-input"),
    email: document.querySelector(".email-input"),
    message: document.querySelector(".message-input"),
    submit: document.querySelector(".submit-button"),
    success: document.querySelector(".success-message"),
    error: document.querySelector(".error-message"),
    errorIcon: document.querySelector(".error-icon"),
  };

  if (!elements.form) return;

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showError(message) {
    if (elements.error) elements.error.textContent = message;
    if (elements.errorIcon) elements.errorIcon.style.display = "block";
  }

  function clearErrors() {
    if (elements.error) elements.error.textContent = "";
    if (elements.errorIcon) elements.errorIcon.style.display = "none";
  }

  function validateForm() {
    clearErrors();

    const name = elements.name?.value.trim() || "";
    const phone = elements.phone?.value.trim() || "";
    const email = elements.email?.value.trim() || "";
    const message = elements.message?.value.trim() || "";

    if (!name) {
      showError("Name is required.");
      return false;
    }

    if (!phone) {
      showError("Phone number is required.");
      return false;
    }

    if (!validateEmail(email)) {
      showError("Invalid email address.");
      return false;
    }

    if (!message) {
      showError("Message is required.");
      return false;
    }

    return true;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
      if (elements.success) elements.success.style.display = "block";
      elements.form?.reset();
    }
  }

  elements.form.addEventListener("submit", handleSubmit);
}

// Initialize Upon DOM Load
document.addEventListener("DOMContentLoaded", () => {
  initializeProfileRotation();
  initializeAnimations();
  initializeContactForm();
  initializeAboutPage();
  initializeSkillsAnimation();
  initializeContactPageAnimations();
  initializeResumePageAnimations();
  initializeProjectsPageAnimations();
});

//Contact Page Logic
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const formContainer = document.querySelector(".form-container");
  const thankYouMessage = document.querySelector(".thank-you-message");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
        mode: "cors",
      });

      const responseData = await response.json();

      if (response.ok) {
        form.style.opacity = "0";
        form.style.transform = "translateY(-20px)";

        setTimeout(() => {
          form.style.display = "none";
          thankYouMessage.style.display = "block";

          thankYouMessage.offsetHeight;

          thankYouMessage.classList.add("active");
        }, 500);

        // Reset Form After 5s
        setTimeout(() => {
          thankYouMessage.classList.remove("active");

          setTimeout(() => {
            form.reset();
            thankYouMessage.style.display = "none";
            form.style.display = "block";
            form.style.opacity = "1";
            form.style.transform = "translateY(0)";
          }, 500);
        }, 5000);
      } else {
        // More Detailed Error Logging
        console.error("Form submission error:", responseData);
        alert(`Submission failed: ${responseData.error || "Please try again"}`);
      }
    } catch (error) {
      console.error("Network or fetch error:", error);
      alert(
        "There was a network error. Please check your connection and try again."
      );
    }
  });

  // Form Validation
  function validateForm() {
    const name = form.querySelector("#name");
    const email = form.querySelector("#email");
    const phone = form.querySelector("#phone");
    const message = form.querySelector("#message");
    const fileUpload = form.querySelector("#file-upload");

    // Basic
    if (!name.value.trim()) {
      alert("Please enter your full name.");
      return false;
    }

    if (!email.value.trim() || !validateEmail(email.value)) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (!phone.value.trim() || !validatePhone(phone.value)) {
      alert("Please enter a valid 10-digit phone number.");
      return false;
    }

    if (!message.value.trim()) {
      alert("Please enter a message.");
      return false;
    }

    if (fileUpload.files.length > 0) {
      const fileSize = fileUpload.files[0].size;
      const maxSize = 25 * 1024 * 1024;
      if (fileSize > maxSize) {
        alert("File size should not exceed 25MB.");
        return false;
      }
    }

    return true;
  }

  // Email Validation
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Phone Validation
  function validatePhone(phone) {
    const re = /^\d{10}$/;
    return re.test(phone);
  }
});

// About Page Animations
function initializeAboutPage() {
  const aboutContent = document.querySelector(".about-content");
  if (!aboutContent) return;

  setTimeout(() => {
    aboutContent.classList.add("fade-in");
  }, 100);
}

// Skills Page Animation
function initializeSkillsAnimation() {
  const skillIcons = document.querySelectorAll(".skill-icon");
  if (!skillIcons.length) return;

  skillIcons.forEach((icon, index) => {
    const row = Math.floor(index / 4);
    const col = index % 4;

    const delay = (row + col) * 150;

    setTimeout(() => {
      icon.classList.add("animate");

      setTimeout(() => {
        icon.classList.add("float");

        icon.style.animationDelay = `${(row + col) * -0.2}s`;
      }, 1000);
    }, delay);
  });
}

// Contact Page Animation
function initializeContactPageAnimations() {
  const elements = {
    formGroups: document.querySelectorAll(".form-group"),
    submitButton: document.querySelector(".submit-button"),
    email: document.querySelector(".contact-email"),
    socialIcons: document.querySelector(".social-icons"),
  };

  const animate = (element, delay) => {
    if (!element) return;

    setTimeout(() => {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, delay);
  };

  window.addEventListener("load", () => {
    animate(elements.title, 200);

    elements.formGroups.forEach((group, index) => {
      animate(group, 400 + index * 200);
    });

    animate(elements.submitButton, 1000);

    animate(elements.email, 1200);

    animate(elements.socialIcons, 1400);
  });

  // Form Submission Handling
  const form = document.querySelector("form");
  const thankYouMessage = document.querySelector(".thank-you-message");

  if (form && thankYouMessage) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Fade Out
      form.style.opacity = "0";
      form.style.transform = "translateY(-20px)";

      // Thank You Message
      setTimeout(() => {
        form.style.display = "none";
        thankYouMessage.style.display = "block";

        // Force Reflow
        thankYouMessage.offsetHeight;

        // Active Class Animation
        thankYouMessage.classList.add("active");
      }, 500);

      // Reset Form After Delay
      setTimeout(() => {
        // Hide Message
        thankYouMessage.classList.remove("active");

        setTimeout(() => {
          // Reset and Show Form
          form.reset();
          thankYouMessage.style.display = "none";
          form.style.display = "block";

          // Animate Form Back In
          setTimeout(() => {
            form.style.opacity = "1";
            form.style.transform = "translateY(0)";
          }, 50);
        }, 500);
      }, 5000);
    });
  }
}

// Resume Page Animation
function initializeResumePageAnimations() {
  const elements = {
    title: document.querySelector(".resume-title"),
    images: document.querySelector(".resume-images"),
  };

  if (elements.images) {
    setTimeout(() => {
      elements.images.classList.add("fade-in");
    }, 400);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const resumeImages = document.querySelectorAll(".resume-image");

  resumeImages.forEach((image) => {
    image.addEventListener("mouseenter", () => {
      console.log("Mouse entered image");
      image.style.transform = "scale(1.1)";
      image.style.boxShadow = "0 20px 50px rgba(0,0,0,0.3)";
    });

    image.addEventListener("mouseleave", () => {
      console.log("Mouse left image");
      image.style.transform = "scale(1)";
      image.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
    });
  });
});

// Projects Page Animation
function initializeProjectsPageAnimations() {
  const elements = {
    projectLinks: document.querySelectorAll(".project-link"),
  };

  const animate = (element, delay) => {
    if (!element) return;

    setTimeout(() => {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, delay);
  };

  window.addEventListener("load", () => {
    elements.projectLinks.forEach((link, index) => {
      link.style.opacity = "0";
      link.style.transform = "translateY(40px)";

      animate(link, 200 + index * 200);
    });
  });
}
