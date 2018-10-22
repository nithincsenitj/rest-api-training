const express=require('express');
const app=express();

const bodyParser=require('body-parser');
const urlencodedParser=bodyParser.urlencoded({extended:true})

app.use(express.static('public'));
app.use(bodyParser.json());

let users=[
  { id:0, name: 'user1'},
  { id:1, name: 'user2'},
  { id:2, name: 'user3'},
  { id:3, name: 'user4'}];


//listing all
app.get('/api/home',(req,res)=>{
  //res.send("here:");
  res.send(users);
})

//picking one
app.get('/api/home/:id',(req,res)=>{
  //console.log(req);
  const user = users.find(c => c.id === parseInt(req.params.id));
  res.send(user);
})

app.post('/api/home/new/:id',(req,res)=>{
//console.log(req);
  const user={
    id : users.length+1,
    name:req.body.name
  }
  users.push(user);
  res.send(user);
})





//update
app.post('/api/home/update/:id',(req,res)=>{
  const user = users.find(c => c.id === parseInt(req.params.id));
  user.name = req.body.name
  res.send(user);
})


//delete
app.get('/api/home/delete/:id',(req,res)=>{
  const user = users.find(c => c.id === parseInt(req.params.id));
//  user.name = req.body.name
  var index = users.indexOf(user.id);
  users.splice(index,1);
  res.send(users);
})


app.listen(3000,() => console.log("listening on 3000"));
