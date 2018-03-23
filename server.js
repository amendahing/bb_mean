var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

var app = express();
mongoose.Promise = global.Promise
app.use(bodyParser.json());

// static content
app.use(express.static( __dirname + '/angular/dist' ));
mongoose.connect('mongodb://localhost/bb_mean');

var RestaurantSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        minlength: [3, "Restaurant name must be at least 3 letters"]
    },
    cuisine: {
        type: String,
        required: true,
        minlength: [3, "Cuisine type must be at least 3 letters"]
    },
    reviews: [{customer: {type: String}, star: {type: Number}, cont: {type: String}}]


})


mongoose.model('Restaurant', RestaurantSchema);
var Restaurant = mongoose.model('Restaurant')

// RETRIEVE ALL
app.get('/restaurants', function(req, res){
    Restaurant.find({}, function(err, data){
        if(err){
            console.log("Error hit", err);
            res.json({message: "Error", data: err})
        }else{
            // console.log("Success!", data);
            res.json({message: "Success", data: data})
        }
    })
})

// CREATE NEW RESTAURANT
app.post('/restaurants/new', function(req, res){
    console.log("hit the server! new restaurant:", req.body);
    console.log(req.body.restaurant + ":", req.body.cuisine)

    var restaurant = new Restaurant ({name: req.body.restaurant, cuisine: req.body.cuisine});
    restaurant.save(function(err, data){
        if(err){
            console.log("New restaurant was not added.");
            res.json({message: "Restaurant and cuisine name must be at least 3 characters", error: err})
        }
        else {
            console.log("Successfully added restaurant", req.body.restaurant)
            res.json(data);
        }
    })
})


// RETRIEVE ONE RESTAURANT
app.get("/restaurants/:id", function(req, res){
    Restaurant.findOne({_id: req.params.id}, function(err, data){
        if (err) {
            console.log("Returned error", err);
            res.json({message: "Error", error: err})
        }
        else {
            res.json({message:"Display", data: data})
        }
    })
})

// UPDATE RESTAURANT NAME AND CUISINE
app.put('/restaurants/update/:id', function(req, res) {
    console.log("ABOUT TO EDIT +++++++++", req.params.id)
    console.log(req.body.name);
    console.log(req.body.cuisine);

    Restaurant.find({_id: req.params.id}, function(err, data) {
        if (err) {
            res.json({message: "Error", error: err})
        }
        else {
            if (req.body.name.length < 3) {
                console.log("Restaurant's name must be at least 3 chars to edit");
                res.json({errors: "Name needs to be at least 3 characters."});
            }
            else {
                Restaurant.update({_id: req.params.id}, {name: req.body.name, cuisine: req.body.cuisine}, function(err, data){
                    if (err) {
                        console.log('something went wrong');
                        res.json({message: "Error", error: err})
                    }
                    else {
                        console.log(data);
                        res.json({message: "Updated", full_name: req.body.name})
                    }
                })
            }
        }
    })
})


app.delete('/restaurants/delete/:id', function(req, res) {
    // console.log("deleting..", req.params.id);
    Restaurant.remove({_id: req.params.id}, function(err, data) {
        if (err) {
            console.log('something went wrong');
            res.json({message: "Error", error: err});
        }
        else {
            console.log('removed', req.params.id);
            res.json({message:"Removed"})
        }
    })
})


app.put("/restaurant_review/new/:id", function(req, res){
    console.log("+++++++MADE IT TO THE SERVER++++++++++++")
    console.log(req.params.id, req.body.customer, req.body.star, req.body.cont)
    Restaurant.findOne({_id: req.params.id}, function (err, data) {
        if(err){
            console.log(err)
            res.status(500).send(err)
        }
        else {
            console.log(data.reviews)
            data.reviews.push({cont: req.body.cont, customer: req.body.customer, star: req.body.star})
            data.save()
            res.json(data);
        }
    })
})



app.all("*", (req, res, next) => { res.sendFile(path.resolve("./client/dist/index.html"))});

// listen on this port
app.listen(8000, function(){
    console.log("you are browsin' on port 8000");
})
