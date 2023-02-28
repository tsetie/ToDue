
var mysql = require("mysql");

var connPool = mysql.createPool({
  connectionLimit: 5,
  host: "localhost",
  user: "root",
  database: "Tseten",
  password: "Tencent16!!"
});



function getDoneTasks() {
  return new Promise((resolve, reject)=>{
    const sql = "select * from ToDue where done = 1"
    connPool.query(sql, (err, rows)=>{
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    })
  })
}
exports.getDoneTasks=getDoneTasks;

function getNotDoneTasks() {
  return new Promise((resolve, reject)=>{
    const sql = "select * from ToDue where done = 0"
    connPool.query(sql, (err, rows)=>{
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    })
  })
}
exports.getNotDoneTasks=getNotDoneTasks;

function addTask(task) {
  return new Promise((resolve, reject)=>{
    const sql = "insert into ToDue (task,done) values (?, 0)";
    connPool.query(sql, [task], (err, rows)=>{
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    })
  })
}
exports.addTask=addTask;

function changeDoneStatus(taskNumber, status){
  return new Promise((resolve, reject)=>{
    const sql = "UPDATE ToDue SET done = ? WHERE taskNum = ?";
    connPool.query(sql, [status, taskNumber], (err, rows)=>{
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    })
  })
}

exports.changeDoneStatus=changeDoneStatus;


function deleteTask(taskNumber){
  return new Promise((resolve, reject)=>{
    const sql = "DELETE FROM ToDue WHERE taskNum = ?";
    connPool.query(sql, [taskNumber], (err, rows)=>{
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    })
  })
}

exports.deleteTask=deleteTask;

function updateTask(taskNumber){
  return new Promise((resolve, reject)=>{
    const sql = "UPDATE ToDue SET task = ? WHERE taskNum = ?";
    connPool.query(sql, [task, taskNumber], (err, rows)=>{
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    })
  })
}
exports.updateTask=updateTask;

function getSearchDoneTasks(search) {
  return new Promise((resolve, reject)=>{
    const sql = "Select * from ToDue Where task LIKE ? and done = 1";
    connPool.query(sql,['%'+search+'%'], (err, rows)=>{
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    })
  })
}
exports.getSearchDoneTasks=getSearchDoneTasks;

function getSearchNotDoneTasks(search) {
  return new Promise((resolve, reject)=>{
    const sql = "Select * from ToDue Where task LIKE ? and done = 0";
    connPool.query(sql,['%'+search+'%'], (err, rows)=>{
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    })
  })
}
exports.getSearchNotDoneTasks=getSearchNotDoneTasks;

