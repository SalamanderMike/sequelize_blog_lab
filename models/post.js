function Post(sequelize, DataTypes){
	var post = sequelize.define('post', {
		title: DataTypes.STRING(50),
		body: DataTypes.TEXT,
		authorId: { // only post needs foreignKey because it is 'many'
			type: DataTypes.INTEGER,
			foreignKey: true
		}
	},
		{
			classMethods: {
				associate: function(db){
					post.belongsTo(db.author); 
				}
			}
		});
	return post;
};

module.exports = Post;

// sequelize.define(modelName, attributes, options) creates a model

