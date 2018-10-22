const express=require('express');
const app=express();

const bodyParser=require('body-parser');
const urlencodedParser=bodyParser.urlencoded({extended:false})

app.use(express.static('public'));

let users=['user1','user2','user3','user4'];



app.get('/',(req,res)=>{
  res.send("here:");
  res.send(users);
})

app.listen(3000,() => console.log("listening on 3000"));
