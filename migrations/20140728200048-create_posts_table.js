// one author to many blogs
// create an author table (id:, name:)
// that associates many blogs (id:, post:, createAt:, updateAt:)


module.exports = {
  up: function(migration, DataTypes, done) {
  	migration.createTable('posts', 
	  	{id: {
	  		type: DataTypes.INTEGER,
	  		primaryKey: true,
	  		autoIncrement: true
	  	},
      title: DataTypes.STRING(50),
	  	body: DataTypes.TEXT,
	  	createdAt: DataTypes.DATE, // required
    	updatedAt: DataTypes.DATE // required
  	})
  	.complete(done)
  },
  down: function(migration, DataTypes, done) {
  	migration.dropTable('posts').complete(done)
  }
}

