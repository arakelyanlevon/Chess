import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import './models/User.js';

dotenv.config();
const port = process.env.SERVER_PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.post('/', (req, res) => {
    console.log(req.body)
    res.send(req.body);
});

mongoose.connect('mongodb://localhost/chess', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});