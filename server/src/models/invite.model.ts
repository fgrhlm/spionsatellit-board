import mongoose from "mongoose";

const { Schema } = mongoose;

const inviteSchema = new Schema({
  code: String,
})

const Invite = mongoose.model("Invite", inviteSchema);

export default Invite;