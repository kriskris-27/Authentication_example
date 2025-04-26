const express= require("express")
const app=express()
app.use(express.json())

const users=[]

app.get('/users' , (req,res)=>{
    res.json(users)
})

app.post('/users',(req,res)=>{
    const user = {name : req.body.name, password : req.body.password}
    users.push(user)
    res.status(201).send("request send")
})

app.listen(3000,(err)=>{
    if (err){
        console.log("Error",err);
        process.exit(1);
    }
    console.log("3000 is alive")
});
