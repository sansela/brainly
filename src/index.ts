import express from "express";
import mongoose from "mongoose";
import 'dotenv/config'
import jwt from "jsonwebtoken";
import { ContentModel, UserModel } from "./db";
import { userMiddleware } from "./middleware";
import { JWT_PASSWORD } from "./config";

const app = express();
app.use(express.json());
app.post('/api/v1/signup', async(req, res) => {
//TODO - jod validation, hashing password
    const username = req.body.username;
    const passowrd = req.body.password;

   try{
    await UserModel.create({
        username: username,
        password: passowrd
    });

    res.json({
        message: "user has signed up"
    });
   } catch {
    res.status(411).json({
        message: "user already exists"
    })
   }

});

app.post('/api/v1/signin', async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await UserModel.findOne({
        username,
        password
    });

    if(existingUser) {
        const token = jwt.sign({
            id: existingUser._id
        }, JWT_PASSWORD);
        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect Credentials"
        });
    }

});

app.post('/api/v1/content', userMiddleware, async(req, res) => {
    const type = req.body.type;
    const link = req.body.link;
    const title = req.body.title;
    // @ts-ignore
    const userId = req.userId;

    try {
         await ContentModel.create({
            type,
            link,
            title,
            userId,
            tags: []
        });
        res.json({
            message: "contents added successfully"
        });
    } catch(e) {
        res.status(403).json({
            message: "Content NOT added. Please try again"
        })
    }
    

})

app.get('/api/v1/content', userMiddleware, async(req, res) => {

    //@ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({
        userId
    }).populate("userId", "username");
    res.json({
        content
    });

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