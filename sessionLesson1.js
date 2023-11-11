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

// let viewCount = 0;

app.get("/", (req, res) => {
// res.send(`${req.method} - ${req.url}`);
if(!req.session.viewCount) {
  req.session.viewCount = 1;
} else {
  req.session.viewCount += 1;
}
res.send(`You have visited this page: ${req.session.viewCount}`)
})

app.listen(3003, () => {
  console.log("App is listening on port 3003...");  
})