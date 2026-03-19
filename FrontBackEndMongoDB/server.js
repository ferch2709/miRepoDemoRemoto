const express = require ("express");
const cors = require("cors");
const mongoose= require("mongoose");

const Usuario=require("./models/Usuario.js");

const app =express();
const port = 3000;


app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://fercho2709:walder2727@ac-eqwshpv-shard-00-00.xegahch.mongodb.net:27017,ac-eqwshpv-shard-00-01.xegahch.mongodb.net:27017,ac-eqwshpv-shard-00-02.xegahch.mongodb.net:27017/?ssl=true&replicaSet=atlas-ft7b8r-shard-0&authSource=admin&appName=Cluster0")
.then(()=>{console.log("MongoDB Ready!")})
.catch(err=>console.log(err));


//let registros = [
   // {
        //id:1,
        //nombre:"Patricia",
        //email:"fihw@uuc.mx",
        //genero:"Femenino",
      //  plataformas:["Netflix","Prime"]
    //},
    //{
        //id:2,
        //nombre:"Calamardo",
       // email:"dsufhs@uuc.mx",
     //   genero:"Masculino",
   //     plataformas:["Disney+","HBO"]
 //   }
//];

//let idActual=3;

app.get("/api/usuarios", async (req,res)=>{
    const usuarios=await Usuario.find();
    res.json(usuarios);
});

app.post("/api/usuarios", async (req, res)=>{
    const nuevo = new Usuario(
        {
            nombre: req.body.nombre,
            email:req.body.email,
            genero: req.body.genero,
            plataformas: req.body.plataformas
        }
    );

    const guardado= await nuevo.save();
    res.json(guardado);
});

app.put("/api/usuarios/:id", async (req, res)=>{
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
        req.params.id,
        {
            nombre:req.body.nombre,
            email: req.body.email,
            genero: req.body.genero,
            plataformas: req.body.plataformas
        },
        {new:true}
    );

    res.json(usuarioActualizado);
});

app.listen(port,()=>{
    console.log("listening at http://localhost:"+port);
});