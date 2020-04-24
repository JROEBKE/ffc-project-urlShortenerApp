// load environment variables
require('dotenv').config();

// grab our dependencies
const express    = require('express'),
  app            = express(),
  expressLayouts = require('express-ejs-layouts'),
  expressValidator = require('express-validator'),
  bodyParser     = require('body-parser'),
  mongoose       = require('mongoose'),
  session        = require('express-session'),
  cookieParser   = require('cookie-parser'),
  flash          = require('connect-flash'), //error UI
  argv           = require('minimist')(process.argv.slice(2));



// configure our application ===================

// set sessions and cookie parser
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET,
  cookie: { maxAge: 60000 },
  resave: false,    // forces the session to be saved back to the store
  saveUninitialized: false  // dont save unmodified
}));
app.use(flash());

// tell express where to look for static assets
app.use(express.static(__dirname + '/public'));

// set ejs as our templating engine
app.set('view engine', 'ejs');
app.use(expressLayouts);

// connect to database
mongoose
.connect(process.env.DB_URI, {
useUnifiedTopology: true,
useNewUrlParser: true,
})
.then(() => console.log('DB Connected!'))
mongoose.set('useFindAndModify', false);

// use body parser to grab info from a form
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

//Validation
app.use(expressValidator());


//Set var port = 8080 as default;
var   port = process.env.PORT || 8080;
if(argv.port !== undefined)
    port = argv.port;
else
    console.log('No --port=xxx specified, taking default port ' + port + '.')

//Set var domain = localhost as default;
var domain =  process.env.DOMAIN || 'localhost';
if(argv.domain !== undefined)
    domain = argv.domain;
else
    console.log('No --domain=xxx specified, taking default hostname "localhost".')

// Set and display the application URL
var applicationUrl = 'http://' + domain + ':' + port;
  console.log('server running on ' + applicationUrl);

// set the routes =============================
app.use(require('./app/routes'));

// start our server ===========================
app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
