/*jshint globalstrict:true, trailing:false, unused:true, node:true */
"use strict";

var express         = require('express');
var passport        = require('passport');
var OAuth2Strategy  = require('passport-oauth2');
var request         = require('request');

var gitterHost      = process.env.HOST || 'https://gitter.im';
var port            = process.env.PORT || 7000;

// Client OAuth configuration
var clientId        = process.env.GITTER_KEY;
var clientSecret    = process.env.GITTER_SECRET;

// Gitter API client helper
var gitter = {
	fetch: function(path, token, cb) {
		var options = {
			url: gitterHost + path,
			headers: {
				'Authorization': 'Bearer ' + token
			}
		};

		request(options, function (err, res, body) {
			if (err) return cb(err);

			if (res.statusCode === 200) {
				cb(null, JSON.parse(body));
			} else {
				cb('err' + res.statusCode, JSON.parse(body));
			}
		});
	},

	post: function (path, token, data, cb) {
		var options = {
		 url: gitterHost + path,
		 headers: {
			'Authorization': 'Bearer ' + token
		 },
		 method: 'POST',
		 body: data
		};

		request(options, function (err, res, body) {
			if (err) return cb(err);

			if (res.statusCode === 200) {
				cb(null, JSON.parse(body));
			} else {
				cb('err' + res.statusCode, JSON.parse(body));
			}
		});
	},

	fetchCurrentUser: function(token, cb) {
		this.fetch('/api/v1/user/', token, function(err, user) {
			cb(err, user[0]);
		});
	},

	fetchRooms: function(user, token, cb) {
		this.fetch('/api/v1/user/' + user.id + '/rooms', token, function(err, rooms) {
			cb(err, rooms);
		});
	},

	fetchMessages: function (roomId, beforeMessageId, token, cb) {
		this.fetch('/api/v1/rooms/' + roomId + '/chatMessages?limit=50', token, function(err, messages) {
			cb(err, messages);
		});
	},

	sendMessage: function (roomId, messageText, token, cb) {
		var data = { text: messageText };
		this.post('/api/v1/rooms/' + roomId + '/chatMessages', data, token, function(err, response) {
			cb(err, response);
		});
	}
};

var isValidSession = function(req, res) {
	if (!req.session || !req.session.token) { return false; }
	return true;
};

var app = express();

// Middlewares
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static( __dirname + '/public'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: 'keyboard cat'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

// Passport Configuration

passport.use(new OAuth2Strategy({
		authorizationURL:   gitterHost + '/login/oauth/authorize',
		tokenURL:           gitterHost + '/login/oauth/token',
		clientID:           clientId,
		clientSecret:       clientSecret,
		callbackURL:        '/login/callback',
		passReqToCallback:  true
	},
	function(req, accessToken, refreshToken, profile, done) {
		req.session.token = accessToken;
		gitter.fetchCurrentUser(accessToken, function(err, user) {
			return (err ? done(err) : done(null, user));
		});
	}
));

passport.serializeUser(function(user, done) {
	done(null, JSON.stringify(user));
});

passport.deserializeUser(function (user, done) {
	done(null, JSON.parse(user));
});

// Routes
app.get('/login',
	passport.authenticate('oauth2')
);

app.get('/login/callback',
	passport.authenticate('oauth2', {
		successRedirect: '/home',
		failureRedirect: '/'
	})
);

app.get('/logout', function(req,res) {
	req.session.destroy();
	res.redirect('/');
});

app.get('/', function(req, res) {
	res.render('landing');
});

app.get('/home', function(req, res) {
	if (!isValidSession(req, res) || !req.user) { return res.redirect('/'); }

	// Fetch user rooms using the Gitter API
	gitter.fetchRooms(req.user, req.session.token, function(err, rooms) {
		if (err) return res.send(500);

		res.render('home', {
			user: req.user,
			token: req.session.token,
			clientId: clientId,
			rooms: rooms
		});
	});
});

app.get('/rooms/:id', function(req, res) {
	if (!isValidSession(req, res) || !req.params.id) { return res.redirect('/'); }
	// Fetch user rooms using the Gitter APIs
	gitter.fetchMessages(req.params.id, null, req.session.token, function(err, response) {
		if (err) {
			console.log(err, response);
			return res.send(500);
		}

		res.render('home', {
			token: req.session.token,
			clientId: clientId,
			messages: response
		});
	});
});

// Api Routes
app.get('/api/user', function(req, res) {
	gitter.fetchCurrentUser(req.session.token, function(err, user) {
		if (err) return res.send(500);

		var json = JSON.stringify({
			user: user,
			token: req.session.token,
			clientId: clientId
		});
		res.end(json);
	});
});

app.get('/api/rooms', function(req, res) {
	gitter.fetchRooms(req.user, req.session.token, function(err, rooms) {
		if (err) return res.send(500);

		var json = JSON.stringify({
			rooms: rooms
		});
		res.end(json);
	});
});

app.get('/api/rooms/:roomId/messages', function(req, res) {
	var beforeMessageId = req.query.beforeMessageId || null;
	console.log('requesting messages for roomid', req.params.roomId);
	gitter.fetchMessages(req.params.roomId, beforeMessageId, req.session.token, function(err, messages) {
		if (err) return res.send(500);

		var json = JSON.stringify({
			messages: messages
		});
		res.end(json);
	});
});

app.post('/api/messages', function(req, res) {
	gitter.sendMessage(req.roomId, req.messageText, function(err, response) {
		if (err) return res.send(500);
		var json = JSON.stringify(response);
		res.end(json);
	});
});

app.listen(port);
console.log('Gitterminator running at http://localhost:' + port);
