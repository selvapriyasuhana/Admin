const router = require("express").Router();
const Admin = require("../Models/model");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("priya");

router.get("/start", (req, res) => {
  res.json({
    status: "API Works",
    message: "Welcome admin signin API",
  });
});
router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    const decryptedPassword = cryptr.decrypt(admin.password);

    if (decryptedPassword === password) {
      return res.json({
        message: "Signin successful",
        data: admin,
      });
    } else {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred",
      error: error.message,
    });
  }
});

router.post("/staff/register", async (req, res) => {
  try {
    const {
      password,
      username,
      usertype,
      Name,
      Age,
      Gender,
      DOB,
      Contact,
      email,
    } = req.body;

    const encryptedPassword = cryptr.encrypt(password);

    const admin = new Admin({
      password: encryptedPassword,
      username,
      usertype,
      Name,
      Age,
      Gender,
      DOB,
      Contact,
      email,
    });

    await admin.save();

    return res.json({
      message: "Registered successfully",
      data: admin,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred",
      error: error.message,
    });
  }
});

const Controller = require("../Controller/controller.js");
router.route("/admin").get(Controller.index);

router
  .route("/admin/:username")
  .get(Controller.view)
  .patch(Controller.update)
  .put(Controller.update)
  .delete(Controller.Delete);
module.exports = router;
