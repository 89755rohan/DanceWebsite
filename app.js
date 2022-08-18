const express = require("express");
const path = require("path");
const app = express();
// const fs = require("fs");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/applypage");
const bodyparser = require("body-parser");
const port = 80;

//Define Schema 
const applySchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    address: String,
    city: String,
    state: String
}); 
var Apply = mongoose.model('Apply',applySchema); 

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    // const con = "This is the best content on the internet so far so use it wisely"
    const params = { }
    res.status(200).render('home.pug', params);
})

app.get('/apply', (req, res)=>{
    const params = { }
    res.status(200).render('apply.pug', params);
})
app.post('/apply', (req, res)=>{
    var myData = new Apply(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved in database");
    }).catch(()=>{
        res.status(400).send("Item was not saved to database");
    });
})

// app.get('/contactus', (req, res)=>{
//     // const con = "This is the best content on the internet so far so use it wisely"
//     const params = { }
//     res.status(200).render('contactus.pug', params);
// })

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});