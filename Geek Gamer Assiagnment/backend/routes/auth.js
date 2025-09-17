const { registerController, loginController } = require("../controllers/authController")
const router = require("express").Router()
const passport = require("passport");

router.post("/register",registerController)
router.post("/login",loginController)
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const jwt = require("jsonwebtoken");
    const JWT_SECRET = process.env.JWT_SECRET;

    const token = jwt.sign(
      { id: req.user._id, role: req.user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    req.session.user = {
      id: req.user._id,
      name: req.user.name,
      role: req.user.role,
    };

    res.redirect("/"); 
  }
);

module.exports = router