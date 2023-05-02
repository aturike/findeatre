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

  if (window.location.pathname === "/search") {
    const datefilterButton = document.querySelectorAll(".JSbutton");
    const searchParams = new URLSearchParams(window.location.search).get(
      "search"
    );
    const searchTermURI = `${window.location.pathname}?search=${searchParams}`;

    datefilterButton.forEach((button) => {
      button.addEventListener("click", () => {
        window.location.replace(`${searchTermURI}&sortdate=${button.name}`);
      });
    });
  }


});