import mongoose, { Schema, model, mongo} from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

mongoose.connect(MONGO_URI);

const userSchema = new Schema({
    username: {type: String, unique: true},
    password: {type: String}
});

export const UserModel = model("User", userSchema);

const contentSchema = new Schema({
    type: String,
    link: String,
    title: String,
    tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
    userId: {type: mongoose.Types.ObjectId, ref: 'User'}
});

export const ContentModel = model("Content", contentSchema);

