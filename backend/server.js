const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 4000;

// loading in the middle ware
app.use(cors());
app.use(bodyParser.json());

//connecting to the mongodb database
mongoose.connect("mongodb://127.0.0.1:27017/todos", { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

// the following code creates an instance of an express router
const todoRoutes = express.Router();
//the router will be added as middleware and will take control of request starting with the '/todos' path
app.use("/todos", todoRoutes);

//now we are adding an endpoint to deliver all the todo tiems
// when a user goes to the url "/todos/" it will return
todoRoutes.route("/").get(function(req, res) {
  Todo.find(function(err, todos) {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});

//this is another endpoint that accepts the url paramter id
// it is then passing the id to look for the object
todoRoutes.route("/:id").get(function(req, res) {
  let id = req.params.id;
  Todo.findById(id, function(err, todo) {
    res.json(todo);
  });
});

//this is a route that is used to add a new todo item by sending a http post request
todoRoutes.route("/add").post(function(req, res) {
  let todo = new Todo(req.body);
  todo
    .save()
    .then(todo => {
      res.status(200).json({ todo: "todo added successfully" });
    })
    .catch(err => {
      res.status(400).send("adding new todo failed");
    });
});

//updates a todo that is already in the database
todoRoutes.route("/update/:id").post(function(req, res) {
  Todo.findById(req.params.id, function(err, todo) {
    if (!todo) res.status(404).send("data is not found");
    else todo.todo_description = req.body.todo_description;
    todo.todo_responsible = req.body.todo_responsible;
    todo.todo_priority = req.body.todo_priority;
    todo.todo_completed = req.body.todo_completed;

    todo
      .save()
      .then(todo => {
        res.json("Todo updated!");
      })
      .catch(err => {
        res.status(400).send("Update not possible");
      });
  });
});

// starts to listen to port 4000
app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
