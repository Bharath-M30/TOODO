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
const allowedOrigins = [process.env.CLIENT_URL,
  'https://toodo-mha1nqeki-bharath-ms-projects.vercel.app',
  'http://127.0.0.1:5500',
  'http://localhost:5173'
];

const corsOptions = {
  origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
          callback(null, true)
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  },
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE'],
  optionsSuccessStatus: 200
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