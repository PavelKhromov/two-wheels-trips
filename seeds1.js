var mongoose = require("mongoose");
var Trip = require("./models/trip");
var Comment   = require("./models/comment");
 
var data = [
    {
        //name: "Cloud's Rest", 
        //image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        //description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]
 
function seedDB(){
   //Remove all campgrounds
   Trip.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed trips!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few trips
            data.forEach(function(seed){
                Trip.create(seed, function(err, trip){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a trip");
                        //create a comment
                        Comment.create(
                            {
                                text: "",
                                author: ""
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    trip.comments.push(comment);
                                    trip.save();
                                    console.log("Created new comment");
                                }
                            });
                   }
               });
            });
        });
    }); 

    //add a few comments
}


 
module.exports = seedDB;