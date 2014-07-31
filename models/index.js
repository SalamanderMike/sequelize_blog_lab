var fs        = require('fs')
  , path      = require('path')
  , Sequelize = require('sequelize')
  , lodash    = require('lodash')
  , env       = process.env.NODE_ENV || 'development'
  , config    = require(__dirname + '/../config/config.json')[env]
  , sequelize = new Sequelize(config.database, config.username, config.password, config)
  , db        = {}

fs // Finds models to import?
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

// Associations
// db.user.hasMany(db.post); // written in user.js as classMethods
// db.post.belongsTo(db.user); // written into post.js as classMethods

// db.user.find(1).success(function(foundUser){
//   var newPost = db.post.build({title: 'Hello Words Again!'});

//   foundUser.addPost(newPost).success(function(){
//       newPost.save().then(function(post){
//         console.log(post);
//     });
//   });
// }); 


// db.user.findOrCreate({firstname: 'Peter'}, {lastname: 'Roessler'})
//   .success(function (newUser){
//   var newPost = db.post.build({title: blog.title, body: blog.body});
//   newUser.addPost(newPost).success(function(){
//       newPost.save().then(function(post){
//         console.log(post);
//     });
//   });
// });


// // Associations
// db.user.hasMany(db.blog);
// db.blog.belongsTo(db.user);

// // add blog to user
// db.blog.create({title: "Across The Universe", body: "BlahbDelahblah"})
//   .success(function (blog){
//     db.user.find(1).success(function (user){
//       user.setblogs([blog])
//         .success(function (user){
//          console.log(user)
//       })
//     });
// });

// db.person.find(1).success (function (person){
//   var blog = db.post.build({post: "Across The Universe - Blahblahblah"});
//   person.setBlogs([post])
//     .success(function (person){
//       blog.save();
//       console.log(person)
//   });
// });

// db.blog.create({post: "My Favorite Things - Blahblahblah"}).success(function(blog){
//   console.log(blog);
// });

module.exports = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db)
