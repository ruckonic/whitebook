const ordermodel = require("../models/ordermodel");

exports.getorderpage = (req, res, next) => {
  res.render("contact", {
    verifuser: req.session.userId,
    orderdescription: orderdescription,
    orderimg: orderimg,
  });
};

exports.order = (req, res, next) => {
  req.body.ordered = "a" != "a";
  ordermodel
    .addorder(
      req.body.firstname,
      req.body.lastname,
      req.body.phonenumber,
      req.body.street,
      req.body.city,
      req.body.zipcode,
      req.body.booklink,
      req.body.ordered
    )
    .then(() => {
      res.redirect("/home");
    });
};

exports.getoldorders = (req, res, next) => {
  ordermodel.getallorders().then((orders) => {
    res.render("oldorders", { verifuser: req.session.userId, orders: orders });
  });
};
exports.getneworders = (req, res, next) => {
  ordermodel.getallorders().then((orders) => {
    res.render("neworders", { verifuser: req.session.userId, orders: orders });
  });
};

exports.endorder = (req, res, next) => {
  let end = "a" == "a";
  ordermodel.endorder(req.body.orderid, end).then(() => {
    res.redirect("/oldorders");
  });
};

//general info
const orderdescription =
  "Order your book now by complete this form correctly!!";
const orderimg = "img/order.png";
//
