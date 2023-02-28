const { response } = require("express");
const express = require("express");
const path = require('path');

// setup the app object
const app = express();
const PORT = 8081;

// Start the web server
app.listen(PORT, function() {
    console.log(`Listening on http://localhost:${PORT}`);
 });

//sets static resources as the root of project
app.use(express.static(__dirname));
// Parse URL-encoded bodies requires express 4.16+
// (older versions of express had external libraries for this)
app.use(express.urlencoded({extended:true})); 

// because for some reason with the set command you can configure 3 engines at once.
app.set("view engine", "pug");
app.set("views", "templates");

//this is the database connection 
var db = require("./db");


// routes 
app.get("/", function(req, res) {
    res.redirect("/home");
});

app.get("/home", async function(req, res) {
    var notDone = await db.getNotDoneTasks().catch();
    var done = await db.getDoneTasks().catch();
    res.render("home.pug", {done,notDone});

});

app.get("/home/notDone", function(req,res){
    db.getNotDoneTasks().then((notDone)=>{
        res.render("home.pug", {notDone});
    }).catch()
});


app.get("/home/done", function(req,res){
    db.getDoneTasks().then((done)=>{
        res.render("home.pug", {done});
    }).catch()
});

app.post("/addItem", function(req,res){
    var task = req.body.newTask;
    db.addTask(task).then(()=> {
        res.redirect(req.get('referer'));
    }).catch()
}); 

app.post("/markDone", function(req, res){
    var taskNumber = req.body.taskNumber;
    db.changeDoneStatus(taskNumber, 1).then(()=>{
        res.redirect(req.get('referer'));
    }).catch()
})  

app.post("/markNotDone", function(req, res){
    var taskNumber = req.body.taskNumber;
    db.changeDoneStatus(taskNumber, 0).then(()=>{
        res.redirect(req.get('referer'));
    }).catch()
})  

app.post("/deleteTask", function(req,res){
    var taskNumber = req.body.taskNumber;
    db.deleteTask(taskNumber).then(()=>{
        res.redirect(req.get('referer'));
    }).catch()
});

// app.post("/editTask", function(req,res){
//     var taskNumber = req.body.taskNumber;
//     db.updateTask(, taskNumber)
// })

app.post("/filter", function(req, res){
    var option = req.body.option;
    if(option == "All"){
        res.redirect("/home");
    }else if(option == "notDone"){
       res.redirect("/home/notDone");
    }else if(option == "done"){
        res.redirect("/home/done");
    }
});

app.get('/search', async function(req, res) {
    var search = req.query.search;
    var notDone = await db.getSearchNotDoneTasks(search).catch();
    var done = await db.getSearchDoneTasks(search).catch();
    res.render("home.pug", {notDone, done,search:search});
});