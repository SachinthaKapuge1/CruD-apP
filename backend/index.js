import express from "express";
import mysql from "mysql";
import cors from "cors";



const app = express();

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'crud_app'
});



app.get('/',(req,res)=>{
    res.json("Hello this is the backend")
})

app.get("/books",(req,res)=>{
    const q="SELECT * FROM books"
    db.query(q,(err,data)=>{
        if(err){return(res.json(err))} 
        return res.json(data)
    })
})

app.post("/books",(req,res)=>{
    const q = "INSERT INTO books(`name`,`description`,`prize`,`cover_png`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.description,
        req.body.prize,
        req.body.cover_png
    ]
        
    db.query(q, [values], (err,data)=>{
        if(err) return res.json(err);
        return res.json("Book added successfully");
    })
})

app.delete("/books/:id",(req,res)=>{
    const id=req.params.id;
    const q= "DELETE FROM books WHERE id=?";

    db.query(q,[id],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Book deleted successfully!");
    })
})

app.put("/books/:id",(req,res)=>{
    const id=req.params.id;
    const q= "UPDATE books SET `name`=?,`description`=?,`prize`=?,`cover_png`=? WHERE id=?";
    const values = [
        req.body.name,
        req.body.description,
        req.body.prize,
        req.body.cover_png
    ]

    db.query(q,[...values,id],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Book deleted successfully!");
    })
})

app.listen(8800,()=>{
    console.log("Back end conected!")
})