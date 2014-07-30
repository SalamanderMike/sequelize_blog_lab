// one author to many blogs
// create an author table (id:, name:)
// that associates many blogs (id:, post:, createAt:, updateAt:)


module.exports = {
  up: function(migration, DataTypes, done) {
  	migration.createTable('authors', 
	  	{id: {
	  		type: DataTypes.INTEGER,
	  		primaryKey: true,        // constraint
	  		autoIncrement: true      // constraint
	  	},
	  	firstname: DataTypes.STRING(10),
      lastname: DataTypes.STRING(10),
	  	createdAt: DataTypes.DATE,
    	updatedAt: DataTypes.DATE
  	})
  	.complete(done)
  },
  down: function(migration, DataTypes, done) {
  	migration.dropTable('authors').complete(done)
  }
}

