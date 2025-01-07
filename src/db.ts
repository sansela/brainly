import mongoose, { Schema, model} from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

mongoose.connect(MONGO_URI);

const userSchema = new Schema({
    username: {type: String, unique: true},
    password: {type: String}
});

export const UserModel = model("User", userSchema);

