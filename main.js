const wrapper = document.querySelector(".wrapper");
const registerLink = document.querySelector(".register-link");
const loginLink = document.querySelector(".login-link");

registerLink.onclick = () => {
  wrapper.classList.add("active");
};

loginLink.onclick = () => {
  wrapper.classList.remove("active");
};

// Loader

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    var loader = document.querySelector(".main-fader");
    if (loader) {
      loader.style.opacity = "0";

      // Add an event listener for the transition end
      loader.addEventListener("transitionend", function () {
        loader.style.display = "none";
      });
    }
  }, 4000); // 4000 milliseconds = 4 seconds
});
