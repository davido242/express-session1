const express = require("express");
const session = require("express-session");
const app = express();
const multer = require("multer");
// const path = require("path");


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './images')
//   },
//   filename: (req, file, cb) => {
//     // console.log(file);
//     cb(null, Date.now() + "davido" + path.extname(file.originalname));
//   }
// })
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// The reason for the error of unexpected end of form
app.use(upload.any());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.use(
  session({
    secret: "session secrete",
    cookie: { maxAge: 30000 },
    resave: true,
    saveUninitialized: false,
  })
);

const Auth = (req, res, next) => {
  console.log("Auth Loaded");
  next();
}

app.get("/", (req, res) => {
  if (!req.session.viewCount) {
    req.session.viewCount = 1;
  } else {
    req.session.viewCount += 1;
  }
  res.send(`You have visited this page: ${req.session.viewCount}`);
});

app.get("/upload", (req, res) => {
  res.render("upload");
});

app.post("/upload", upload.single("uploadImage"), (req, res) => {
  const {username, password, email} = req.body;
  const image = req.file;
  console.log({ "name: ": username, email: email, password: password });
  res.contentType("image/jpeg").send(image);
  console.log("Image", image);
});

app.use("/api", Auth);

app.get("/api/home", (req, res,) => {
  res.send("Home Page with Default Auth")
})

app.get("/api/dashboard", (req, res,) => {
  res.send("Dashboard Page with Auth")
})

app.listen(3003, () => {
  console.log("App is listening on port 3003...");
});
