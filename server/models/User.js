const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    tasks: [
      {
        id: {
          type: String, 
          required: true, 
          unique: true,
          default: () => new mongoose.Types.ObjectId().toString(),
        },
        title: String,
        status: {
          type: Boolean,
          default: false,
        },
        createdAt: {
          type: Date,
          default: Date.now(),
        }
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
