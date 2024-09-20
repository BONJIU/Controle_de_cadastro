const express = require("express")
const app = express()
const handlebars = require("express-handlebars").engine
const bodyParser = require("body-parser")
const post = require("./models/post")
const { where } = require("sequelize")
 
app.engine("handlebars", handlebars({defaultLayout: "main"}))
app.set("view engine", "handlebars")
 
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
 
app.post("/cadastrar", function(req, res){
    post.create({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacao: req.body.observacao
    }).then(function(){
        console.log("Cadastrado com sucesso")
        res.send("Cadastrado com sucesso")
    })
})
app.get("/", function(req, res){
    res.render("primeira_pagina")
})


app.get("/excluir/:id", (req, res) => {
    const id = req.params.id;
    post.findByPk(id)
        .then(postData => {
            if (!postData) return res.sendStatus(404);
            res.render("quarta_pagina", { post: postData });
        })
});

app.post("/excluir/:id/confirmar", (req, res) => {
    const id = req.params.id;
    post.destroy({ where: { id } })
        .then(() => {
            console.log("Dados excluídos com sucesso!");
            res.redirect("/");
        })
});



app.get("/consultar", function(req, res){
    post.findAll().then(function(posts){
        res.render("segunda_pagina",{posts})
        console.log(posts)
    })
})
 
app.get("/atualizar", function(req,res){
    post.update({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacao: req.body.observacao
    },{
        where:{
            id: req.body.id
        }
       
    }).then(
        function(){
            console.log("Dados atualizados com sucesso!")
        }
    )
})
 
app.get("/editar/:id", function(req, res){
        post.findAll({where: {'id' : req.params.id}}).then(
            function(posts){
                res.render("terceira_pagina", {posts})
                console.log(posts)
            }
        )
    })
 
app.listen(8081, function(){
    console.log("Servidor funfando")
})