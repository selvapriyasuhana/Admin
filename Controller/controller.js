const service = require("../Service/service.js");

exports.index = async (req, res) => {
  try {
    const admin = await service.Service_index();
    res.json({
      status: "Success",
      message: "sign in successfully",
      data: admin,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};

exports.view = async (req, res) => {
  try {
    const admin = await service.Service_view(req.params.username);
    if (!staff) {
      return res.json({
        status: "Error",
        message: "User not found",
      });
    }
    res.json({
      status: "Success",
      message: "Retrieved SIGNIN  details successfully",
      data: admin,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const adminData = {
      Name: req.body.Name,
      Age: req.body.Age,
      Gender: req.body.Gender,
      DOB: req.body.DOB,
      Contact: req.body.Contact,
      email: req.body.email,
    };
    const admin = await service.Service_update(req.params.username, adminData);
    if (!admin) {
      return res.json({
        status: "Error",
        message: "username incorrect",
      });
    }
    res.json({
      status: "Success",
      message: "Staff  details added successfully",
      data: admin,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};

exports.Delete = async (req, res) => {
  try {
    const deletedCount = await service.Service_Delete(req.params.username);
    if (deletedCount === 0) {
      return res.json({
        status: "Error",
        message: "please check your username",
      });
    }
    res.json({
      status: "Success",
      message: "Staff  details deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};
