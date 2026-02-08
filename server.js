const express=require("express");
const sqlite3=require("sqlite3").verbose();
const cors=require("cors");

const app=express();
app.use(cors());
app.use(express.json());

const db=new sqlite3.Database("database.db");

db.run(`CREATE TABLE IF NOT EXISTS contacts(
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT,
email TEXT,
message TEXT)`);

app.post("/contact",(req,res)=>{
const {name,email,message}=req.body;
db.run("INSERT INTO contacts(name,email,message) VALUES(?,?,?)",[name,email,message],()=>res.send("Message received successfully!"));
});

app.listen(3000,()=>console.log("Backend running at http://localhost:3000"));
