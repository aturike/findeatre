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

      const chosenButtonName = new URLSearchParams(window.location.search).get(
        "sortdate"
      );
      if (button.name === chosenButtonName && button.name !== "reset") {
        const chosenbutton = document.getElementsByName(button.name)[0];
        chosenbutton.style.backgroundColor = "white";
        chosenbutton.style.color = "black";
      }
    });
  }

  if (window.location.pathname.match("/shows")) {
    const moreBtn = document.querySelector(".JSbtnmore");
    const modalBg = document.querySelector(".show-story-bg");
    const modalTxt = document.querySelector(".show-story");

    const showModal = () => {
      modalBg.style.display = "block";
      modalTxt.style.display = "block";
    };

    const hideModal = () => {
      modalBg.style.display = "none";
      modalTxt.style.display = "none";
    };

    moreBtn.addEventListener("click", showModal);
    modalBg.addEventListener("click", hideModal);
  }

  if (window.location.pathname.match("/artists")) {
    const moreBtn = document.querySelector(".JSbtnmore");
    const modalBg = document.querySelector(".show-story-bg");
    const modalTxt = document.querySelector(".show-story");

    const showModal = () => {
      modalBg.style.display = "block";
      modalTxt.style.display = "block";
    };

    const hideModal = () => {
      modalBg.style.display = "none";
      modalTxt.style.display = "none";
    };

    moreBtn.addEventListener("click", showModal);
    modalBg.addEventListener("click", hideModal);
  }

  /* My profile: modify my email address */
  if (window.location.pathname === "/profile") {
    const editEmailbutton = document.querySelector(".JSbtnEdit");
    const submitEmailbutton = document.querySelector(".JSbtnSubmit");
    const submitForm = document.querySelector(".JSformEdit");
    const emailStatic = document.querySelector(".JSemailStatic");

    const showhideForm = () => {
      if (emailStatic.style.display === "none") {
        emailStatic.style.display = "block";
        submitForm.style.display = "none";
      } else {
        emailStatic.style.display = "none";
        submitForm.style.display = "block";
      }
    };

    editEmailbutton.addEventListener("click", showhideForm);
    submitEmailbutton.addEventListener("click", showhideForm);
  }

  /* My profile: modify my photo */
  if (window.location.pathname === "/profile") {
    const editPhotobutton = document.querySelector(".JSbtnEditphoto");
    const submitPhotobutton = document.querySelector(".JSbtnSubmitphoto");
    const submitFormphoto = document.querySelector(".JSformEditphoto");
    const photoStatic = document.querySelector(".JSphotoStatic");

    const showhideForm = () => {
      if (photoStatic.style.display === "none") {
        photoStatic.style.display = "block";
        submitFormphoto.style.display = "none";
      } else {
        photoStatic.style.display = "none";
        submitFormphoto.style.display = "block";
      }
    };

    editPhotobutton.addEventListener("click", showhideForm);
    submitPhotobutton.addEventListener("click", showhideForm);
  }
});
