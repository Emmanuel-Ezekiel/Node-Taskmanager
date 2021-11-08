# Node Express Mongo sample app 
* This app and readme is meant to help beginners learn the basics of Node, Express and Mongo

# commands
* express nodetest1
* cd nodetest1
* open package.json
	* defines our dependencies for the project
* add following to it to use mongodb
	"mongodb": "~2.0.33",
	"monk": "~1.0.1"
* npm install
	* this creates a node_modules directory which contains all of our dependencies
* mkdir data
	* That's where we store our MongoDB data. If that directory doesn't exist, the database server will choke.
* npm start
	* http://localhost:3000/
	* Running our own Node JS webserver, with the Express engine and Jade HTML preprocessor installed. 

	* to run it on a specific port
		* PORT=8080 npm start

* open up a new terminal tab
	* mongod --dbpath /Users/pavankatepalli/Desktop/git/nodetest1/data
* open up a new terminal tab
	* cd /Users/pavankatepalli/Desktop/git/nodetest1/data
	* mongo
		* it'll say connecting to test - it default tries to connect to a database called test - but since there isn't one - it doesn't actually connect to it
		* this opens up the mongo console
		* inside here:
			* use nodetest1
				* this creates a mongo db called nodetest1
			* db.usercollection.insert({ "username" : "testuser1", "email" : "testuser1@testdomain.com" })
				* adds a user in
				* "db" stands for our database, which we've defined as "nodetest1". 
				* The "usercollection" part is our collection. Note that there wasn't a step where we created the "usercollection" collection. That's because the first time we add to it, it's going to be auto-created.
			* db.usercollection.find().pretty()
				- shows the usercollection 
			* let's add more users

				* newstuff = [{ "username" : "testuser2", "email" : "testuser2@testdomain.com" }, { "username" : "testuser3", "email" : "testuser3@testdomain.com" }]

				* db.usercollection.insert(newstuff);

				* db.usercollection.find().pretty()




# notes

* /public - static directories suchs as /images
* /routes - route files for tutorial project
* /views - views for tutorial project
* README.md - this file
* app.js - central app file for tutorial project
* package.json - package info for tutorial project

* when to restart the server
	* changes to Jade templates do not require a server restart, but whenever you change a js file, such as app.js or the route files, you'll need to restart to see changes.

* in app.js
	* Routes are kind of like a combination of models and controllers in this setup – they direct traffic and also contain some programming logic (you can establish a more traditional MVC architecture with Express if you like. That's outside of the scope of this app)

	* var app = express();
		* This instantiates Express and assigns our app variable to it. 
		* We this variable to configure a bunch of Express stuff.
	* 	app.set('views', path.join(__dirname, 'views')); app.set('view engine', 'jade');
		* this says where the views directory is an that we're going to use jade to process them

	* app.use(express.static(path.join(__dirname, 'public')));
		* this makes it so:
			* the images directory is /Users/pavankatepalli/Desktop/git/nodetest1/public/images … but it is accessed at http://localhost:3000/images

	* module.exports = app;

		* A core part of Node is that basically all modules export an object which can easily be called elsewhere in the code. Our master app exports its app object.

	* var mongo = require('mongodb'); var monk = require('monk'); var db = monk('localhost:27017/nodetest1');
		* These lines tell our app we want to talk to MongoDB, we're going to use Monk to do it, and our database is located at localhost:27017/nodetest1. Note that 27017 is the default port your MongoDB instance should be running on. 

	* app.use(function(req,res,next){req.db = db; next(); });
		
		* If we don't put this above the routing stuff (app.use('/', routes);), our app won't work

		* We already defined "db" when we added Mongo and Monk to app.js. It's our Monk connection object. By adding this function to app.use, we're adding that object to every HTTP request (ie: "req") our app makes. 

		* Note: this is probably sub-optimal for performance but, again, we're going quick-n-dirty here.

* in routes/index.js
	* Basically we're requiring our Express functionality, then attaching a "router" variable to Express's router method, then using that method when an attempt is made to HTTP get the top level directory of our website. Finally we export our router function back to our app.

	* for the /userlist route
		* Looks complicated. All it's really doing, though, is extracting the "db" object we passed to our http request, and then using that db connection to fill our "docs" variable with database documents, ie: user data. Then we do a page render just like the other two "gets" in this route file.

		* Basically, we tell our app which collection we want to use ('usercollection') and do a find, then return the results as the variable "docs". Once we have those documents, we then do a render of userlist (which will need a corresponding Jade template), giving it the userlist variable to work with, and passing our database documents to that variable.


