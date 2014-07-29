var fs        = require('fs')
  , path      = require('path')
  , Sequelize = require('sequelize')
  , lodash    = require('lodash')
  , Author    = require('Author') // Connect Author and Blog
  , Blog      = require('Blog')   // into document?
  , env       = process.env.NODE_ENV || 'development'
  , config    = require(__dirname + '/../config/config.json')[env]
  , sequelize = new Sequelize(config.database, config.username, config.password, config)
  , db        = {}

fs
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

// Instanciate Constructors?
var person = new Author(sequelize, DataTypes);
var post = new Blog(sequelize, DataTypes);


// Associations
db.person.hasMany(db.post);
db.post.belongsTo(db.person);

// add blog to author
db.post.create({post: "Across The Universe - Blahblahblah"})
  .success(function (post){
    db.person.find(1).success(function (person){
      person.setposts([post])
        .success(function (person){
         console.log(person)
      })
    });
});

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
