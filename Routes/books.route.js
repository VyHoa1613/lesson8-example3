var express = require('express')
var router = express.Router()
var shortid = require('shortid')
var db = require("../db");

router.get("/", (req, res) => {
    res.render("books/book", {
        books:db.get("books").value()
    })
})

router.get("/create", (req, res) => {
    res.render("books/create");
})

router.post("/create", (req, res) => {
    req.body.id = shortid.generate();
    db.get("books").push(req.body).write();
    res.redirect("/books");
})

router.get("/:id/delete", (req, res) =>{
    var id = req.params.id;
    db.get("books").remove({id: id}).write();
    res.redirect("back");
})

router.get("/:id/update", (req, res) => {
    var id = req.params.id;
    var book = db.get("books").find({id: id}).value();
    res.render("books/update",{
        book:book
    })
})

router.post("/update", (req, res) => {
   var id = req.body.id;
   db.get("books").find({id: id}).assign({title: req.body.title, description: req.body.description}).write();
   res.redirect("/books");
})

module.exports = router;