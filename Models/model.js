var mongoose = require("mongoose");

var Schema = mongoose.Schema({
  Name: {
    required: false,
    type: String,
  },
  Age: {
    required: false,
    type: Number,
  },
  Gender: {
    type: String,
  },
  DOB: {
    type: String,
  },
  Contact: {
    required: false,
    type: Number,
    length: 10,
  },

  email: {
    type: String,
    required: false,
    unique: true,
    sparse: true,
  },

  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: false,
  },
  usertype: {
    type: [
      {
        required: true,
        type: String,
        enum: ["Admin", "HR"],
      },
    ],
    default: ["Admin"],
  },
});

Schema.path("username").validate(async (username) => {
  const usernameCount = await mongoose.models.list3.countDocuments({
    username,
  });
  return !usernameCount;
}, "UserName Already Exists");

var admin_signin = (module.exports = mongoose.model("list3", Schema));
module.exports.get = function (limit) {
  return admin_signin.find().limit(limit).exec();
};
