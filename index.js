const express = require("express");
const session = require("express-session");
const app = express();
const multer = require("multer");
const path = require("path");
// const cors = require("cors");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './images')
//   },
//   filename: (req, file, cb) => {
//     console.log(file);
//     cb(null, Date.now() + "davido" + path.extname(file.originalname));
//   }
// })
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// app.use(upload.any());
// app.use(cors());

// const bodyParser = require("body-parser");
// app.use(bodyParser.json());
// const upload = multer()
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
  // const {username, password, email} = req.body;

  const image = req.file.buffer;
  // console.log(image);
  console.log({ "name: ": username, email: email, password: password });
  // res.contentType('image/jpeg').send(image.buffer);
  res.contentType("image/jpeg").send(image);
  // res.send("THanks")
  console.log("Image", image);
  // console.log("Image Path: ", image.path);
});

app.post("/Oldupload", async (req, res) => {
  try {
    // app.post('/upload', upload.single('uploadImage'), (req, res) => {
    const name = await req.body.username;
    // const image = req.file.buffer;
    // console.log(image);
    console.log("name: ", name);
    // res.contentType('image/jpeg').send(image.buffer);
    // res.contentType('image/jpeg').send(image);
    res.send("THanks");
    // console.log("Image", image)
    // console.log("Image Path: ", image.path);
  } catch (error) {
    console.log("🚀 ~ file: index.js:57 ~ error:", error);
  }
});

app.listen(3003, () => {
  console.log("App is listening on port 3003...");
});
