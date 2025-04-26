const express= require("express")
const bcrypt=require('bcrypt')
const app=express()
app.use(express.json())


const users=[]

app.get('/users' , (req,res)=>{
    res.json(users)
})

app.post('/users',async (req,res)=>{
    try{
        const salt = await bcrypt.genSalt()
        const hashedPassword= await bcrypt.hash(req.body.password,salt)
        const user = {name : req.body.name, password : hashedPassword}
        users.push(user)
        res.status(201).send("request send")
    }catch(err){
        res.status(500).send("Error sending",err)
    }
    
})


app.login

app.listen(3000,(err)=>{
    if (err){
        console.log("Error",err);
        process.exit(1);
    }
    console.log("3000 is alive")
});
