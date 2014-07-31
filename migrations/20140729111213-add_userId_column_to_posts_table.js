// adding a foreign key to pre-existing tables

module.exports = {
  up: function(migration, DataTypes, done) {
  	migration.addColumn(
  		'posts', 
  		'userId', 
  		{
  			type: DataTypes.INTEGER,
  			foreignKey: true // constraint
  		}
  	).complete(done);
  },
  down: function(migration, DataTypes, done) {
  	migration.removeColumn('posts','userId').complete(done);
  }
}
