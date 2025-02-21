import mysql from "mysql";
var connection = mysql.createConnection({
    host: "localhost",
    user: "user1",
    password: "password1",
})

connection.connect(function (err, db) {
    if (err) throw err;
    console.log("Connected successfully.");
    con.query("CREATE DATABASE mydb", function (err, result) {
        if (err) throw err;
        console.log("DataBase Created");
    })
})
