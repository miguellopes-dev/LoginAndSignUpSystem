const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require("./config");
const { console } = require('inspector');

const app = express();

//Convert data into json format
app.use(express.json());

app.use(express.urlencoded({extended: false}));

//use EJS as the view engine
app.set('view engine','ejs');

// static file
app.use(express.static("public"));


app.get("/",(req, res) => {
    res.render("login");
});

app.get("/signup",(req, res) => {
    res.render("signup");
});

//Register User
app.post("/signup", async (req,res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    }

    //Check if the user already exists in the database
    const existingUser = await collection.findOne({name: data.name});

    if(existingUser) {
        res.send(" This user already exists!");
    }
    else{
        //hide the password by hashing it
        const saltRounds = 10;
        const hashedPassword = await bycript.hash(data.password, saltRounds);

        data.password = hashedPassword;

        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }    
});

//Login user
app.post("/login", async (req,res) => {
    try{
        const check = await collection.findOne({name: req.body.username});
        if(!check){
            res.send("User not found");

            const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
            if(isPasswordMatch){
                res.render("HOME");
            }else{
                res.render("INVALID PASSWORD");
            }
        }
    }catch{
        res.render("WRONG CREDENTIALS");
    }
})

const port = 5000;
app.listen(port,() => {
    console.log('Server running on Port:${port}');
})