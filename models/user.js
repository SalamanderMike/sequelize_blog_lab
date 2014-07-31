var bcrypt = require('bcrypt'),
		salt = bcrypt.genSaltSync(10), // generate salt, length 10 chars
		passport = require('passport'),// genSaltSync() is a bcrypt method
		passportLocal = require('passport-local');


function User(sequelize, DataTypes){
	var User = sequelize.define('user', {
		firstname: DataTypes.STRING(10),
		lastname: DataTypes.STRING(10),
		username: {
			type: DataTypes.STRING(50),
			unique: true,
			validate: {len: [6, 30]}
		}, 
		password: {
			type: DataTypes.STRING,
			validate: {notEmpty: true}
		}
	},
		{classMethods:{ 
			associate: function(db){// tell user that he hasMany posts
				User.hasMany(db.post);
			},
			encryptPass: function(password){
				var hash = bcrypt.hashSync(password, salt);
				return hash;
			},
			comparePass: function(userPass, dbPass){
				return bcrypt.compareSync(userPass, dbPass);
			},
			createNewUser: function(username, password, err, success){
				if (password.length >= 6){
					User.create({	username: username,
												password: User.encryptPass(password)
					}).error(function (error){
						console.log(error);
						if (error.username){
							err({message: 'Username should be more then 6 chars'});
						} else {
							err({message: 'That username already exists'});
						}
					}).success(function (user){
						success({message: 'Account created! Please log in'});
					});
				} else {
					err({message: 'Password should be longer than 6 chars'});
				}
			},
		}
	}); // user doesn't need foreignKey because it is 'one'
	// Passport Authentication
	passport.use(new passportLocal.Strategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	}, function (req, username, password, done){
		User.find({where: {username: username}
		}).done(function (error, user){
			if (error) {
				console.log(error);
				return done(err, req.flash('loginMessage', 'Ack!!! Something wrong went!'));
			}
			if (user === null){
				return done(null, false, req.flash('loginMessage', 'Ack!!! No such username!'));
			}
			if ((User.comparePass(password, user.password)) !== true){
				return done(null, false, req.flash('loginMessage', 'Ack!!! Invalid Password'));
			}
			done(null, user);
		});
	}));
	return User;
};

module.exports = User;

// sequelize.define(modelName, attributes, options) creates a model

// var user scope is limited to this function




