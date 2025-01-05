import mongoose, { Schema, model} from "mongoose";

mongoose.connect("");

const userSchema = new Schema({
    username: {type: String, unique: true},
    password: {type: String}
});

export const UserModel = model("User", userSchema);

