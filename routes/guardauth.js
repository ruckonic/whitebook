exports.isnotlogin = (req, res, next) => {
  if (!req.session.userId) {
    next();
  } else {
    res.redirect("/");
  }
};

exports.islogin = (req, res, next) => {
  if (req.session.userId) next();
  else res.redirect("/login");
};
