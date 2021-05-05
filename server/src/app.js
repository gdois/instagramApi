const express = require("express");
const app = express();
const cors = require("cors");
const Insta = require("./instagram/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const login = new Promise((resolve, reject) => {
    Insta.Login(username, password).then(response => resolve(response)).catch(error => reject(error));
  })
  
  Promise.all([login])
    .then(data => {
      res.json(data);
    }).catch(error => res.json(error))
})

app.get("/:id", (req, res) => {
  const user = req.params.id;
  const getStats = new Promise((resolve, reject) => {
    Insta.getProfile(user).then(response => resolve(response)).catch(error => reject(error));
  })

  Promise.all([getStats])
    .then(data => {
      res.json(data)
    }).catch(error => res.json(error))
})

app.get("/pics/:id", (req, res) => {
  const user = req.params.id;
  const getStats = new Promise((resolve, reject) => {
    Insta.getProfilePics(user).then(response => resolve(response)).catch(error => reject(error));
  })

  Promise.all([getStats])
    .then(data => {
      res.json(data)
    }).catch(error => res.json(error))
})

app.listen("8000", () => {
  console.log("8000");
})