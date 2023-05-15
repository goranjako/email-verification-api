import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ContactSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Firstname is required"],
    },
    lastName: {
      type: String,
      required: [true, "Lastname is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
      match: [
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/,
        "Please enter a valid email",
      ],
    },
    phone: {
      type: Number,
      required: [true, "Phone is required"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
  },
    createdAt: {
        type: Date,
        default: Date.now
    },

  }
);

export default mongoose.model("Contact", ContactSchema);
