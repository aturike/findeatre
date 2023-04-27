// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname === "/auth/login") {
    const toggledisplayArr = ["block", "none"];
    const toggleButtontextArr = ["Sign up", "Log in"];
    const authToggleButton = document.querySelector(".JSbutton");
    const authForms = document.querySelectorAll(".JSform");

    authForms.forEach((form, index) => {
      form.style.display = toggledisplayArr[index];
    });

    authToggleButton.innerText = toggleButtontextArr[0];

    const showSignup = () => {
      toggledisplayArr.reverse();
      toggleButtontextArr.reverse();

      document.querySelectorAll(".JSform").forEach((form, index) => {
        form.style.display = toggledisplayArr[index];
      });
      authToggleButton.innerText = toggleButtontextArr[0];
    };

    authToggleButton.addEventListener("click", showSignup);
  }
});
