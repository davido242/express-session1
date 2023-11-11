const express = require("express");
const session = require("express-session")
const app = express()

app.use(express.json());
app.use(express.urlencoded( {extended: false }));

app.use(session({
  secret: "session secrete",
  cookie: { maxAge: 30000},
  resave: true,
  saveUninitialized: false
}))

app.use((req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
})

const users = [
  {name: "Anson", age: 22},
  {name: "Michelle", age: 23},
  {name: "Kelvin", age: 25}
]

const posts = [
  {title: "My Favourite Food"},
  {title: "My Favourite Games"}
]

app.get("/", (req, res) => {
  res.send({
    message: "thanks",
    user: { }
  })
  console.log(users);

})

app.get("/users", (req, res) => {
  res.status(200).send(users);
  console.log(res.statusCode);
})

app.post("/users", (req, res) => {
  const user = req.body
  users.push(user);
  res.send("Created User Now");
})

app.post("/login", (req, res) => {
  const { username, password } = req.body
  console.log(req.sessionID);
  res.send(req.sessionID);
  console.log(username, password);
})

app.listen(3003, () => {
  console.log("App is listening on port 3003...");  
})