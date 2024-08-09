const express = require("express");
const session = require("express-session");
const nocache = require("nocache");
const app = express();

const userName = "abin@gmail.com";
const passWord = "abin129";

app.use(nocache());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

app.set("view engine", "ejs");
app.use(express.static("views"));

app.get("/", (req, res) => {
  if (req.session.user) {
    const out = 10*5
    res.render("dashboard", {username : req.session.user,family:'Abin',Profile:out});
  } else if (req.session.pass) {
    req.session.pass = false;
    const msg = 'Invalid Credentials'
    res.render("login", {errMsg : msg});
  } else {
    const msg = ''
    res.render("login", {errMsg : msg});
  }
});

app.post("/verify", (req, res) => {
  if (req.body.email === userName && req.body.password === passWord) {
    req.session.user = userName;
    res.redirect("/");
  } else {
    req.session.pass = true;
    res.redirect("/");
  }
});

app.get("/login", (req, res) => {
  res.redirect("/");
});

app.get("/dashboard", (req, res) => {
  res.redirect("/");
});

app.post("/logout", (req, res) => {
  req.session.user = undefined;
  res.redirect("/");
});

app.get('/homenew', (req,res) => {
  res.render('home')
})


app.get('/newpro', (req,res) => {
  res.render('profile')
})

app.get("*", (req, res) => {
  res.render("404");
});

const PORT = 3002;
app.listen(PORT, (err) => {
  if (err) {
    throw err
  }
    console.log(`server is running on port`, PORT)
});



