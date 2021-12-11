const ordercontroller = require("../controllers/ordercontroller");
const router = require("express").Router();
const guardauth = require("./guardauth");

router.get("/contact", ordercontroller.getorderpage);
router.post("/addorder", ordercontroller.order);
router.post("/endorder", guardauth.islogin, ordercontroller.endorder);
router.get("/oldorders", guardauth.islogin, ordercontroller.getoldorders);
router.get("/neworders", guardauth.islogin, ordercontroller.getneworders);
module.exports = router;
