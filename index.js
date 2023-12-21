const express = require("express");
const session = require("express-session");
const app = express();
const multer = require("multer");

const upload = multer();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.use(
  session({
    secret: "session secrete",
    cookie: { maxAge: 30000 },
    resave: true,
    saveUninitialized: false,
  })
);


app.get("/", (req, res) => {
  if (!req.session.viewCount) {
    req.session.viewCount = 1;
  } else {
    req.session.viewCount += 1;
  }
  res.send(`You have visited this page: ${req.session.viewCount}`);
});

app.get('/upload', (req, res) => {
  res.render("upload");
})

app.post('/upload', upload.single('uploadImage'), (req, res) => {
  res.send("Image Uploaded");
  image = req.file;
  console.log("Image Uploaded");
  console.log(image);
});

app.listen(3003, () => {
  console.log("App is listening on port 3003...");
});