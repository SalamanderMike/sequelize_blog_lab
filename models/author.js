function Author(sequelize, DataTypes){
	var author = sequelize.define('author', {
		firstname: DataTypes.STRING(10),
		lastname: DataTypes.STRING(10),
	},
		{
			classMethods:{ // can tell author that he hasMany posts
				associate: function(db){
					author.hasMany(db.post);
				}
			}
		}); // author doesn't need foreignKey because it is 'one'
	return author;
};

module.exports = Author;

// sequelize.define(modelName, attributes, options) creates a model

// var author scope is limited to this function