
var express = require('express')
var app = express()
var port = 3000


var booksRouter = require("./Routes/books.route");
var usersRouter = require("./Routes/users.route");
var transactionRouter = require("./Routes/transaction.route");

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug');
app.set('views','./views');

// Set some defaults (required if your JSON file is empty)

app.use("/books",booksRouter);



// Users
app.use("/users",usersRouter);
//
app.use("/transaction",transactionRouter);

app.listen(port, () => {
    console.log('hello book store'+ port);
  })