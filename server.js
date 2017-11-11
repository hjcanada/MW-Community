var ObjectId = require('mongodb').ObjectId;
var MongoClient = require('mongodb').MongoClient;
var jwt = require('jwt-simple');
var bcrypt = require('bcryptjs');
var express = require('express');
var bodyParser = require('body-parser');

var db = null;
var currentUser = null;
var port = 35232;
var SALT_WORK_FACTOR = 10;
var JWT_SECRET = 'mostwanted';
var dbUrl = 'mongodb://localhost:27017/mwshow';

var app = express();

MongoClient.connect(dbUrl, function(err, dbconn) {
	if (err) {
		console.log(err);
	} else {
		console.log('Database connected');
		db = dbconn;
	}
});

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// Get data (mw moment) from db
app.get('/mw', function(req, res, next) {
	db.collection('mw', function(err, mwCollection) {
		if (err) {
			res.send(err);
		} else {
			mwCollection.find().toArray(function(err, mw) {
				if (err) {
					res.send(err);
				} else {
					res.json(mw);
				}
			});
		}
	});
});

// Insert data (mw moment) to db
app.post('/mw', function(req, res, next) {

        var token = req.headers.authorization;
        var user = jwt.decode(token, JWT_SECRET);	
	var timeDate = new Date();

	var newMw = {
		user: user._id,
		username: user.username,
		text: req.body.newMw,
		likes: 0,
		likeUsers: [],
		dislikes: 0,
		dislikeUsers: [],
		comments: 0,
		replies: [],
		date: timeDate.toLocaleDateString(),
		time: timeDate.toLocaleTimeString()
	};

	db.collection('mw', function(err, mwCollection) {
		if (err) {
			res.send(err);
		} else {
			mwCollection.insert(newMw, {w:1}, function(err) {
				if (err) {
					res.send(err);
				} else {
					res.send();
				}
			});
		}
	});

	db.collection('user', function(err, userCollection) {
		if (err) {
			res.send(err);
		} else {
			userCollection.findOne({username: user.username}, function(err, ans) {
				if (err) {
					res.send(err);
				} else if (user == null ) {
					res.status(400).send();
				} else {
					userCollection.update({username: user.username}, {$set: {posts: (ans.posts + 1), points: (ans.points + 4)}});
					res.send();
				}
			});
		}
	});
});

// Update moment info in db (like moment)
app.put('/mw/like', function(req, res, next) {

	var mwId = req.body.mw._id;
	var mwLikes = req.body.mw.likes;

        var token = req.headers.authorization;
        var user = jwt.decode(token, JWT_SECRET);

	db.collection('mw', function(err, mwCollection) {
		if (err) {
			res.send(err);
		} else {
			mwCollection.update({_id: ObjectId(mwId)}, {$set: {likes: (mwLikes + 1)}});
			mwCollection.update({_id: ObjectId(mwId)}, {$push: {likeUsers: user.username}});
			res.send();
		}
	});

	db.collection('user', function(err, userCollection) {
		if (err) {
			res.send(err);
		} else {
			userCollection.findOne({username: user.username}, function(err, ans) {
				if (err) {
					res.send(err);
				} else if (user == null ) {
					res.status(400).send();
				} else {
					userCollection.update({username: user.username}, {$set: {points: (ans.points + 1)}});
					res.send();
				}
			});
		}
	});
});

// Update moment info in db (dislike moment)
app.put('/mw/dislike', function(req, res, next) {

	var mwId = req.body.mw._id;
	var mwDislikes = req.body.mw.dislikes;

        var token = req.headers.authorization;
        var user = jwt.decode(token, JWT_SECRET);

	db.collection('mw', function(err, mwCollection) {
		if (err) {
			res.send(err);
		} else {
			mwCollection.update({_id: ObjectId(mwId)}, {$set: {dislikes: (mwDislikes + 1)}});
			mwCollection.update({_id: ObjectId(mwId)}, {$push: {dislikeUsers: user.username}});
			res.send()
		}
	});

	db.collection('user', function(err, userCollection) {
		if (err) {
			res.send(err);
		} else {
			userCollection.findOne({username: user.username}, function(err, ans) {
				if (err) {
					res.send(err);
				} else if (user == null ) {
					res.status(400).send();
				} else {
					userCollection.update({username: user.username}, {$set: {points: (ans.points + 1)}});
					res.send();
				}
			});
		}
	});
});

//Update moment info in db (comment moment)
app.put('/reply', function(req, res, next) {

        var mwId = req.body.mw._id;
	var mwComment = req.body.mw.comments;
        var replyTitle = req.body.replyTitle;
	var replyBody = req.body.replyBody;

        var token = req.headers.authorization;
        var user = jwt.decode(token, JWT_SECRET);

	var newComment = {
			replyTitle: replyTitle,
			replyBody: replyBody
	};

        db.collection('mw', function(err, mwCollection) {
		if (err) {
			res.send(err);
		} else {
			mwCollection.update({_id: ObjectId(mwId)}, {$push: {replies: newComment}});
			mwCollection.update({_id: ObjectId(mwId)}, {$set: {comments: (mwComment + 1)}});
			res.send();
		}
        });

	db.collection('user', function(err, userCollection) {
		if (err) {
			res.send(err);
		} else {
			userCollection.findOne({username: user.username}, function(err, ans) {
				if (err) {
					res.send(err);
				} else if (user == null ) {
					res.status(400).send();
				} else {
					userCollection.update({username: user.username}, {$set: {comments: (ans.comments + 1), points: (ans.points + 2)}});
					res.send();
				}
			});
		}
	});
});

// Update moment info in db (delete comment)
app.put('/reply/delete', function(req, res, next) {

	var mwId = req.body.mw._id;
	var mwComment = req.body.mw.comments;
	var replyTitle = req.body.replyTitle;
        var replyBody = req.body.replyBody;

	var token = req.headers.authorization;
	var user = jwt.decode(token, JWT_SECRET);

	db.collection('mw', function(err, mwCollection) {
		if (err) {
			res.send(err);
		} else {
			mwCollection.update({_id: ObjectId(mwId), user: user._id}, {$pull: {replies: {replyTitle: replyTitle, replyBody: replyBody}}});
			mwCollection.update({_id: ObjectId(mwId), user: user._id}, {$set: {comments: (mwComment - 1)}});
		}
	});

	db.collection('user', function(err, userCollection) {
		if (err) {
			res.send(err);
		} else {
			userCollection.findOne({username: user.username}, function(err, ans) {
				if (err) {
					res.send(err);
				} else if (user == null ) {
					res.status(400).send();
				} else {
					userCollection.update({username: user.username}, {$set: {comments: (ans.comments - 1), points: (ans.points - 2)}});
					res.send();
				}
			});
		}
	});
});

// Update moment info in db (delete moment)
app.put('/mw/delete', function(req, res, next) {

	var mwId = req.body.mw._id;
	var token = req.headers.authorization;
	var user = jwt.decode(token, JWT_SECRET);

	db.collection('mw', function(err, mwCollection) {
		if (err) {
			res.send(err);
		} else {
			mwCollection.remove({_id: ObjectId(mwId), user: user._id}, {w:1}, function(err) {
				if (err) {
					res.send(err);
				} else {
					res.send();
				}
			});
		}
	});

	db.collection('user', function(err, userCollection) {
		if (err) {
			res.send(err);
		} else {
			userCollection.findOne({username: user.username}, function(err, ans) {
				if (err) {
					res.send(err);
				} else if (user == null ) {
					res.status(400).send();
				} else {
					userCollection.update({username: user.username}, {$set: {posts: (ans.posts - 1), points: (ans.points - 4)}});
					res.send();
				}
			});
		}
	});
});

// Get data (user info) from db
app.get('/user', function(req, res, next) {
	db.collection('user', function(err, userCollection) {
		if (err) {
			res.send(err);
		} else {
			userCollection.findOne({username: currentUser}, function(err, user) {
				if (err) {
					res.send(err);
				} else if (user == null) {
					res.status(400).send();
				} else {
					res.json(user);
				}
			});
		}
	});
});

// Insert data (user info) to db
app.post('/user', function(req, res, next) {

	var timeDate = new Date();

	db.collection('user', function(err, userCollection) {
		userCollection.findOne({username: req.body.username}, function(err, user) {
			if (err) {
				res.send(err);
			} else if (user != null) {
				res.status(400).send();
			} else {
				bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
					bcrypt.hash(req.body.password, salt, function(err, hash) {
						if (err) {
							res.send(err);
						} else {
							var newUser = {
								username: req.body.username,
								password: hash,
								posts: req.body.posts,
								comments: req.body.comments,
								points: req.body.points,
								gender: req.body.gender,
								email: req.body.email,
								facebook: req.body.facebook,
								twitter: req.body.twitter,
								joinDate: timeDate.toLocaleDateString(),
								joinTime: timeDate.toLocaleTimeString(),
								lastDate: timeDate.toLocaleDateString(),
								lastTime: timeDate.toLocaleTimeString()
							};

							currentUser = req.body.username;

							userCollection.insert(newUser, {w:1}, function(err) {
								if (err) {
									res.send(err);
								} else {
									var token = jwt.encode(newUser, JWT_SECRET);
									res.json({token: token});
								}
							});
						}
					});
				});
			}
		});
	});
});


// Update user info in db (log-in)
app.put('/user/login', function(req, res, next) {

	var timeDate = new Date();

	db.collection('user', function(err, userCollection) {
		userCollection.findOne({username: req.body.username}, function(err, user) {
			if (err) {
				res.send(err);
			} else if (user != null) {
				bcrypt.compare(req.body.password, user.password, function(err, result) {
					if (result) {

						var token = jwt.encode(user, JWT_SECRET);
						var lastDate = timeDate.toLocaleDateString();
						var lastTime = timeDate.toLocaleTimeString();

						currentUser = req.body.username;

						userCollection.update({username: req.body.username}, {$set: {lastDate: lastDate, lastTime: lastTime}});
						res.json({
							token: token,
							username: user.username,
							posts: user.posts,
							comments: user.comments,
							points: user.points,
							email: user.email,
							joinDate: user.joinDate,
							joinTime: user.joinTime,
							lastDate: lastDate,
							lastTime: lastTime,
						});
					} else {
						res.status(400).send();
					}
				});
			} else {
				res.status(400).send();
			}
		});
	});
});

// Update data (user gender) to db
app.put('/user/gender', function(req, res, next) {

	var gender = req.body.gender;
	var operator = req.body.op;

	var token = req.headers.authorization;
	var user = jwt.decode(token, JWT_SECRET);

	db.collection('user', function(err, userCollection) {
		if (err) {
			res.send(err);
		} else {
			userCollection.findOne({username: user.username}, function(err, user) {
				if (err) {
					res.send(err);
				} else if (user == null) {
					res.status(400).send();
				} else {
					// rules: add = 0, delete = 1
					if (operator == 0) {
						userCollection.update({username: user.username}, {$set: {gender: gender}});
					} else if (operator == 1) {
						userCollection.update({username: user.username}, {$set: {gender: ''}});
					}
					res.send();
				}
			});
		}
	});
});	

// Update data (user email) to db
app.put('/user/email', function(req, res, next) {

	var email = req.body.email;
	var operator = req.body.op;

	var token = req.headers.authorization;
	var user = jwt.decode(token, JWT_SECRET);

	db.collection('user', function(err, userCollection) {
		if (err) {
			res.send(err);
		} else {
			userCollection.findOne({username: user.username}, function(err, user) {
				if (err) {
					res.send(err);
				} else if (user == null) {
					res.status(400).send();
				} else {
					// rules: add = 0, delete = 1
					if (operator == 0) {
						userCollection.update({username: user.username}, {$set: {email: email}});
					} else if (operator == 1) {
						userCollection.update({username: user.username}, {$set: {email: ''}});
					}
					res.send();
				}
			});
		}
	});
});	

// Update data (user facebook) to db
app.put('/user/facebook', function(req, res, next) {

	var facebook = req.body.facebook;
	var operator = req.body.op;

	var token = req.headers.authorization;
	var user = jwt.decode(token, JWT_SECRET);

	db.collection('user', function(err, userCollection) {
		if (err) {
			res.send(err);
		} else {
			userCollection.findOne({username: user.username}, function(err, user) {
				if (err) {
					res.send(err);
				} else if (user == null) {
					res.status(400).send();
				} else {
					// rules: add = 0, delete = 1
					if (operator == 0) {
						userCollection.update({username: user.username}, {$set: {facebook: facebook}});
					} else if (operator == 1) {
						userCollection.update({username: user.username}, {$set: {facebook: ''}});
					}
					res.send();
				}
			});
		}
	});
});	

// Update data (user twitter) to db
app.put('/user/twitter', function(req, res, next) {

	var twitter = req.body.twitter;
	var operator = req.body.op;

	var token = req.headers.authorization;
	var user = jwt.decode(token, JWT_SECRET);

	db.collection('user', function(err, userCollection) {
		if (err) {
			res.send(err);
		} else {
			userCollection.findOne({username: user.username}, function(err, user) {
				if (err) {
					res.send(err);
				} else if (user == null) {
					res.status(400).send();
				} else {
					// rules: add = 0, delete = 1
					if (operator == 0) {
						userCollection.update({username: user.username}, {$set: {twitter: twitter}});
					} else if (operator == 1) {
						userCollection.update({username: user.username}, {$set: {twitter: ''}});
					}
					res.send();
				}
			});
		}
	});
});	

//Insert data (user opinion) to db
app.post('/opinion', function(req, res, next) {
	db.collection('opinion', function(err, opiCollection) {
		if (err) {
			res.send(err);
		} else {
			var opinion = {
				name: req.body.name,
				email: req.body.email,
				message: req.body.message,
			};
			opiCollection.insert(opinion, {w:1}, function(err) {
				if (err) {
					res.send(err);
				} else {
					res.send();
				}
			});
		}
	});
});

/* For Heroku */
/*
app.listen(process.env.PORT, function() {
	console.log('Server is up, listening on Port %d', this.address().port());
});
*/

/* For local test */
app.listen(port, function() {
	console.log('Server is up, listening on Port %d', port);
});
