var express = require('express')
var router = express.Router()
var shortid = require('shortid')
var db = require("../db");

router.get("/",(req, res) =>{
    res.render("transaction/borrow",{
        borrows:db.get("transaction").value()
    })
})

router.get("/create", (req, res)=> {
    res.render("transaction/create",{
        users:db.get("users").value(),
        books:db.get("books").value()
    });
    
})

router.post("/create",(req, res)=> {
    req.body.id = shortid.generate();
    db.get("transaction").push(req.body).write();
    res.redirect("/transaction");
})

module.exports = router;