var express = require('express')
var router = express.Router()
var shortid = require('shortid')
var db =  require('../db')

router.get("/",(req, res) =>{
    res.render("users/user",{
        users:db.get("users").value()
    })
})

router.get("/create",(req, res) => {
    res.render("users/create");
})

router.post("/create", (req, res) => {
    req.body.id = shortid.generate();
    db.get("users").push(req.body).write();
    res.redirect("/users");
})

router.get("/:id/delete",(req, res) =>{
    var id = req.params.id;
    db.get("users").remove({id:id}).write();
    res.redirect("back");
})

router.get("/:id/update",(req, res) => {
    var id = req.params.id;
    var user =  db.get("users").find({id:id}).value();
    res.render("users/update", {
        user:user
    })
})

router.post("/update", (req, res) => {
    var id = req.body.id;
    db.get("users").find({id:id}).assign({name: req.body.name}).write();
    res.redirect("/users");
})

module.exports = router;