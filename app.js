var express = require('express'),
  bodyParser = require('body-parser'),
  passport = require('passport'),
  passportLocal = require('passport-local'),
  cookieParser = require('cookie-parser'),
  cookieSession = require('cookie-session'),
  flash = require('connect-flash'),
  methodOverride = require('method-override'),
  db = require('./models/index.js'),
  pg = require('pg'),
  app = express();

app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(cookieSession({secret: 'thisismysecretkey', 
                      name: 'cookie created by Mike', 
                      maxage: 360000})); // cookie expires in milliseconds
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// prepare our serialize at login
passport.serializeUser(function (user, done){
  done(null, user.id);
});
passport.deserializeUser(function (id, done){
  db.user.find({
    where: {
      id: id
    }
  }).done(function (error, user){
    done(error, user);
  });
});



// PAGES
app.get('/', function (req, res){
	res.redirect('/login')
})

app.get('/login', function (req, res){
  res.render('login');
})

app.get('/signup', function (req, res){
  res.render('signup');
})

app.get('/titles', function (req, res){
	db.post.findAll({order: [['createdAt', 'DESC']]}).success(function (posts){
		res.render('titles', {list: posts});
	});
});

app.get('/users', function (req, res){
	db.user.findAll().success(function (users){
		res.render('users', {list: users});
	});
});

app.get('/new', function (req, res){
	res.render('new');
})

app.get('/profile', function (req, res){
  res.render('profile');
})

// FUNCTIONS
app.post('/new', function (req, res){
	var owner = req.body.user,
			blog = req.body.post;

db.user.findOrCreate({firstname: owner.firstname}, {lastname: owner.lastname})
  .success(function (user, createdUser){
  var newPost = db.post.build({title: blog.title, body: blog.body});
  	if (createdUser){
  		createdUser.addPost(newPost).success(function(){
      	newPost.save();
      });
  	} else {
  		user.addPost(newPost).success(function(){
      	newPost.save();
      });
    };
  });
	res.redirect('/users');
});

app.post('/newUser', function (req, res){
  db.user.createNewUser(
    req.body.username, 
    req.body.password, 
    function (err){
      res.render('signup', {message: err.message, 
                            username: req.body.username});

    }, 
    function (success){
      res.redirect('success', {message: success.message});
    });
});


app.post('/login', passport.authenticate('local', {
  successRedirect: '/users',
  failureRedirect: '/login',
  failureFlash: true
}));


app.post('/profile', function (req, res){


  res.redirect('success');
})


// app.get('/home', function (req, res) { 
//   res.render('home', {
//     isAuthenticated: req.isAuthenticated(),// methods from passport
//     user: req.user//                          allows personalization 
//   });//                                       on home screen
// });






// app.post("/people/new", function (req, res){
//   var params = req.body.person;
//   Person.create(params, function (err){
//     res.redirect("/people");
//   });
// });



app.get('*', function (req, res){
  res.render('404');
})

// NODEMON
app.listen(3000, function(){
  console.log('NODEMON RIDING IN THE CODE-VAN localhost:3000');
});