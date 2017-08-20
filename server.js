// retrieving 
const http = require('http')
const express = require('express');
const database = require('./database');
const bodyparser = require('body-parser');
const jwtMiddleware = require('express-jwt');
const jwt = require('jsonwebtoken');
const app = express();
const jwtSecret = 'ilovelucy';
const sql = require('mssql');






app.use(bodyparser());
app.use(express.static('public'));
app.use(bodyparser.json()); 
app.use(bodyparser.urlencoded({extended: true}));

//Posting data to log in page
app.get("/login", (req, res) => {
 res.sendFile(__dirname + "/public/login.html");
});

// registering '/login' route to the express app. e.g. www.google.com/login
app.post('/login', function(request, response){
    console.log(request.body)
    database.User.findAll({
        where: {
            email: request.body.email
        }
    }).then(function(data){
        console.log(data)
        const user = data[0].dataValues
        
        if (user.password === request.body.password) {
            const token = jwt.sign({
                name: user.name,
                admin: user.admin
            }, jwtSecret, {
                expiresIn: 60 * 2
            })
            console.log(token)
            response.setHeader('Authorization','Your Token is: ' + token.toString())
            //response.json("Logging in Just A Moment....");
            response.sendFile(__dirname + "/public/yourname.html");

        } else {
            response.sendStatus(403)
        }
    })
})

// registering User Signing in to view baby names
app.get('/signup', function(request, response){
    response.sendFile(__dirname + "/public/signUp.html");
    })


// registering '/user' route. e.g. www.google.com/user
app.post('/newuser', function(request, response){
    console.log(request.method)
    console.log(request.headers)
    console.log(request.body)
    database.User.create({
        email: request.body.email,
        name: request.body.name,
        password: request.body.password,
        admin: false
    }).then(function(){
        //response.sendStatus(201)
        response.sendFile(__dirname + "/public/view.html");
    })
})




//Thanking user for signing in
app.get('/views', function(request, response) {
    database.User.findAll({attributes: ['name'],
    order: [['updatedAt', 'DESC']],
        limit: 1

}).then(function(data) {
        response.json(data)
    })
})
//Showing User the rank of the name they typed in

app.post('/rank', function(request, response){
    console.log(request.method)
    console.log(request.headers)
    console.log(request.body)
    database.babyName.findAll({
        where: {
            name: request.body.name
        }
    }).then(function(data){
        console.log(data[0].dataValues)
        //response.sendStatus(201)
        //response.sendFile(__dirname + "/public/rank.html");
        response.json(data)
    })
})



// registering '/user' route. e.g. www.google.com/user
app.get('/baby-names', function(request, response) {
    database.babyName.findAll().then(function(data) {
        response.json(data)
    })
})

// registering '/baby-names/top-ten'. e.g. www.google.com/user
app.get('/baby-names/top-ten', function(request, response) {
    database.babyName.findAll({
        order: [['count', 'DESC']],
        limit: 20
    }).then(function(data){
        response.json(data)
    })
})




app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})