//onst express = require("express");
import express from "express";
import cors from "cors";
import "dotenv/config";

import fs from "fs";
import path from "path";

import User from "./src/models/user.model.js";
import { connectDB } from "./src/lib/db.js";
import { clerkMiddleware } from "@clerk/express";
const port = process.env.PORT || 3000;
const app = express();
const FRONTEND_URL = process.env.FRONTEND_URL;

const publickDir = path.join(process.cwd(), "public");

app.use(express.json());
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(clerkMiddleware());
app.use(express.static(publickDir));

app.get("/health", (req, res) => {
    res.status(200).json({ ok: true });
});

if(fs.existsSync(publickDir)) {
    app.use(express.static(publicDir));

    app.get("/{*any}",(req,res,next) => {
        res.sendFile(path.join(publicDir, "index.html"), (err) => next(err));
    });
}

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`)
});