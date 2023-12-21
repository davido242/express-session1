const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const mongoDBSession = require("connect-mongodb-session")(session);
const app = express();


const monogoUrl = "mongodb://localhost:27017/sessions";

mongoose.connect(monogoUrl, {
  // useNewUrlParser: true,
  useCreateIndex: true,
  // useUnifiedTopology: true
}).then((res) => {
  console.log("Mongodb connected");
})

const store = new mongoDBSession({
  uri: monogoUrl,
  collection: "mySessions"

})

app.use(express.json());
app.use(express.urlencoded( {extended: false }));

app.use(session({
  secret: "key that will sign cookie",
  // cookie: { maxAge: 30000},
  resave: false,
  saveUninitialized: false,
  store: store
}))

app.use((req, res, next) => {
  console.log("Url here: ", `${req.method} - ${req.url}`);
  next();
})

app.get("/homepage", (req, res) => {
  res.send("Hello Session HOme Page");
})

app.get("/login", (req, res) => {
  console.log(req.session);
  req.session.isAuth = true;
  res.send("Hello Session Tut");
  console.log(req.session.id);
})

app.listen(3003, () => {
  console.log("App is listening on port 3003...");  
})