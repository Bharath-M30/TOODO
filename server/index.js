require("dotenv").config();
const express = require("express");
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
const allowedOrigins = "*";

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE'],
}

//middlewares
app.use(express.json());
app.use(cors(corsOptions));

//routes
app.use('/users', userRoute);
app.use('/signin', signinRoute);
app.use('/signup', signupRoute);
app.use('/users/tasks', taskRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});