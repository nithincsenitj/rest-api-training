const express=require('express');
const app=express();

const bodyParser=require('body-parser');
const urlencodedParser=bodyParser.urlencoded({extended:false})

app.use(express.static('public'));

let users=[
  { id:0, name: 'user1'},
  { id:1, name: 'user2'},
  { id:2, name: 'user3'},
  { id:3, name: 'user4'}];



app.get('/api/home',(req,res)=>{
  //res.send("here:");
  res.send(users);
})

app.get('/api/home/:id',(req,res)=>{
  console.log(req);
  const user = users.find(c => c.id === parseInt(req.params.id));
  res.send(user);
})

app.listen(3000,() => console.log("listening on 3000"));
