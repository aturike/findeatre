//Maybe don`t need
const isLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    const err = encodeURIComponent("error");
    return res.redirect("/auth/login?user=" + err);
  }
  next();
};

// if an already logged in user tries to access the login page it
// redirects the user to the home page
const isLoggedOut = (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/");
  }
  next();
};

module.exports = {
  isLoggedIn,
  isLoggedOut,
};
