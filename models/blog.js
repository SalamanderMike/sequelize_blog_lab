function Blog(sequelize, DataTypes){
	return sequelize.define('blog', {
		post: DataTypes.STRING
	});
};

module.exports = Blog;