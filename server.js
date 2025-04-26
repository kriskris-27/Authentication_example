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


app.post('/users/login', async(req,res)=>{
        const user = users.find( user => user.name == req.body.name)
        console.log(user)
        if (user== null){
            return res.status(400).send('Cannot find user')
        }
    try{
        if(await bcrypt.compare(req.body.password,user.password)){
            res.status(201).send("Login successful")
        }
        else{
            res.send("Not Allowed")
        }
        
    }catch(err){
        res.status(500).send("Error sending",err)
        console.log(err)
    }
})


app.listen(3000,(err)=>{
    if (err){
        console.log("Error died",err);
        process.exit(1);
    }
    console.log("3000 is alive")
});
