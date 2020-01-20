var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    flash          = require("connect-flash"),
    moment         = require('moment'),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    Trip           = require("./models/trip"),
    Comment        = require("./models/comment"),
    User           = require("./models/user"),
    mixins         = require('postcss-mixins'),
    seedDB         = require("./seeds")

var commentRoutes  = require("./routes/comments"),
    tripRoutes     = require("./routes/trips"),
    indexRoutes    = require("./routes/index") 

 
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://pavlo:LearnWeb1212@mongodb01-saq2e.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


mongoose.connect("mongodb+srv://pavlo:LearnWeb1212@mongodb01-saq2e.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true, 
    /* useUnifiedTopology: true */
}).then(() => {
    console.log("connect to DB!")
 
}).catch(err => {
    console.log("ERROR", err.message);
});

//01.13. code new
//mongoose.connect('mongodb://127.0.0.1:27017/two_wheels_trips', { useMongoClient: true, promiseLibrary: global.Promise });
// 01.13 coe ends
//mongoose.connect("mongodb+srv://pavlo:mysecretcode2020@cluster0-saq2e.mongodb.net/test");

//mongoose.connect('mongodb+srv://pavlo:LearnWeb1212@cluster0-saq2e.mongodb.net/test?retryWrites=true&w=majority');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
// -- removed seed for now
app.use(flash());
//seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}));
app.locals.moment = require('moment');
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use(indexRoutes);
app.use(tripRoutes);
app.use("/trips/:id/comments", commentRoutes);


var port = process.env.PORT || 8080;

var server=app.listen(port,function() {
console.log("app running on port 8080"); });


    console.log('Server listening 8080');



// var port = process.env.PORT || 3000;
// app.listen(port, function () {
//   console.log("Server Has Started!");
// });