const express=require('express');
const app=express();
require('dotenv').config() 

const bodyParser=require('body-parser');
const urlencodedParser=bodyParser.urlencoded({extended:false})

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(urlencodedParser);


//sequelize
const Sequelize = require('sequelize');
const connection = new Sequelize('rest_api','postgres',process.env.password,{
  dialect:'postgres',operatorsAliases: true
});

//connection
const Users = connection.define('users',{
  name:Sequelize.STRING
});


//dummy users
Users.create({
    name:'user1'
  })
Users.create({
    name:'nithin'
  })
  Users.create({
    name:'user3'
  })
  Users.create({
    name:'user4'
  })

//homepage
app.get('/api/home',(req,res)=>{

    res.send("happyness");
    });

// Listing all
app.get('/api/users',(req,res)=>{
    Users.findAll().then(function(users){
      res.send(users);
    });
})

//picking one
app.get('/api/users/:id',(req,res)=>{
  //console.log(req);
  const user = parseInt(req.params.id);
  Users.findById(user).then(function(users){
    res.send(users.dataValues);
  });
})


//addingnewuser
app.post('/api/users/new',(req,res)=>{
//console.log(req);

  Users.create({
    name: req.body.name
  }).then(()=>{
    Users.findAll().then(function(users){
      res.send(users);
    });
  })


})

//update
app.post('/api/users/update/:id',(req,res)=>{
  const user = parseInt(req.params.id);

  Users.findById(user).then(function(users){
    users.name = req.body.name
    users.save().then(() => {
    Users.findAll().then(function(users){
      res.send(users);
    });})
  });

})

//delete
app.get('/api/users/delete/:id',(req,res)=>{
  const user = parseInt(req.params.id);
  Users.destroy({
    where:{
      id:user
    }
  }).then(()=>{
    Users.findAll().then(function(users){
      res.send(users);
  })
//  res.send("deleted");

  });
})

//listening
app.listen(1081,() => console.log("listening on 1081"));
