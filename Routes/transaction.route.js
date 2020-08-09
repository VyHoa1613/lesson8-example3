var express = require('express')
var router = express.Router()
var shortid = require('shortid')
var db = require("../db");

router.get("/",(req, res) =>{
    var usersTran = db.get("transaction").value();
    var takeUser =usersTran.map(function(item){
        return{
            user: db.get("users").find({id:item.userId}).value().name,
            book: db.get("books").find({id:item.bookId}).value().title
        }
    })
    res.render("transaction/borrow",{
        borrows:takeUser
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