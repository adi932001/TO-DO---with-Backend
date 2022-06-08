//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose=require("mongoose");

const app = express();
mongoose.connect("mongodb+srv://adi2911:LrElrHJ81TuLApaf@cluster1.3epqsww.mongodb.net/?retryWrites=true&w=majority/tasklistDB",{useNewUrlParser:true});
const tasksSchema={
  taskname:{
    type:String,
    required:true
    
  }
};
const Task=mongoose.model("Task",tasksSchema);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//new document
const task1=new Task({
  taskname:"Assignment"
}) ;

const task2=new Task({
  taskname:"Welcome2!"
});

const task3=new Task({
  taskname:"Welcome3!"
}) 

const defaultTask=[task1];


app.get("/", function(req, res) {
  Task.find({},function(err,foundItems){

  if(foundItems.length === 0){
    console.log("yes");
      Task.insertMany(defaultTask,function(err){
        console.log(err);
      });
      res.redirect("/");
    } else{
      console.log("no");
      res.render("list", {listTitle: "Today", newListItems: foundItems});
    }
  });
  

});

app.post("/", function(req, res){

  const item = req.body.newItem;
  const task4=new Task({
    taskname:item
  })
  task4.save(function(err){
    console.log(err);
  });
  res.redirect("/");

});

app.post("/delete",function(req,res){
  const del=req.body.check;
  Task.findByIdAndDelete(del,function(err){
    console.log(err);
    res.redirect("/");
  })
  
})

app.get("/:work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(7000, function(err) {
  console.log("Server started on port 7000");
});
