var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  pg = require('pg'),
  db = require('./models/index.js'),
  app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded());
app.use(methodOverride("_method"));

// PAGES
app.get('/', function (req, res){
	res.redirect('titles/')
})

app.get('/titles', function (req, res){
	db.post.findAll().success(function (posts){
		res.render('titles', {list: posts});
	});
});

app.get('/authors', function (req, res){
	db.author.findAll().success(function (authors){
		res.render('authors', {list: authors});
	});
});

app.get('/new', function (req, res){
	res.render('new');
})

// FUNCTIONS
app.post('/new', function (req, res){
	var owner = req.body.author,
			blog = req.body.post;

db.author.findOrCreate({firstname: owner.firstname}, {lastname: owner.lastname})
  .success(function (author, createdAuthor){
  var newPost = db.post.build({title: blog.title, body: blog.body});
  	if (createdAuthor){
  		createdAuthor.addPost(newPost).success(function(){
      	newPost.save();
      });
  	} else {
  		author.addPost(newPost).success(function(){
      	newPost.save();
      });
    };
  });
	res.redirect('/authors');
});



// app.post("/people/new", function (req, res){
//   var params = req.body.person;
//   Person.create(params, function (err){
//     res.redirect("/people");
//   });
// });





// NODEMON
app.listen(3000, function(){
  console.log('NODEMON RIDING IN THE CODE-VAN localhost:3000');
});