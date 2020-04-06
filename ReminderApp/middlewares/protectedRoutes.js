
const protectedRoutes = (req, res, next) => {

  if (req.session.currentUser) {
    next ();
  } else {
    res.redirect("/users");
  }
};

module.exports = protectedRoutes;
