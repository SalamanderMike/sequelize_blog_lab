var db = require('./models/index.js')

db.post.find(1).success(function(post){
console.log(post);
})

db.post.create(title: "Hello World!").success(function(post){
console.log(post);
})

;
