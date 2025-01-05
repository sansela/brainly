import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { UserModel } from "./db";

const app = express();
app.use(express.json());
app.post('/api/v1/signup', async(req, res) => {
//TODO - jod validation, hashing password
    const username = req.body.username;
    const passowrd = req.body.password;

    await UserModel.create({
        username: username,
        password: passowrd
    });

    res.json({
        message: "user has signed up"
    });

});

app.post('/api/v1/signin', (req, res) => {

});

app.post('/api/v1/content', (req, res) => {

})

app.get('/api/v1/content', (req, res) => {

});

app.delete('/api/v1/content', (req, res) => {

});

app.post('/api/v1/brain/share', (req, res) => {

});

app.get('/api/v1/brain/:shareLink', (req, res) => {
    
});

app.listen(3000, () => {
    console.log("server started on port 3000");
});