require("dotenv").config();
const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const app = express();
const dbConnect = require("./db/dbConnect");
const signinRoute = require("./routes/signin");
const signupRoute = require("./routes/signup");
const taskRoute = require("./routes/tasks");
const userRoute = require("./routes/user");
const PORT = process.env.PORT || 3000;

dbConnect();

//cors
const corsOptions = {
    origin: process.env.CLIENT_URL || "https://toodo-mha1nqeki-bharath-ms-projects.vercel.app",
    methods: 'GET,POST,PUT,PATCH,DELETE', 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true
  };


//middlewares
app.use(express.json());
app.use(cookieParser()); 
app.use(cors(corsOptions));

//routes
app.use('/users', userRoute);
app.use('/signin', signinRoute);
app.use('/signup', signupRoute);
app.use('/users/tasks', taskRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})