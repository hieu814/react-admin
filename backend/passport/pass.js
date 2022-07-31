const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const UserModel = require('../models/users.model');

passport.use(
	new JWTstrategy(
		{
			secretOrKey: process.env.JWT_SECRET_KEY,
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
		},
		async (token, done) => {
			try {
				return done(null, token.id);
			} catch (error) {
				done(error);
			}
		}
	)
);

passport.use(
	'login',
	new localStrategy(
		{
			usernameField: 'email',
			passwordField: 'password'
		},
		async (email, password, done) => {
			console.log("email ", email);
			console.log("password ", password);
			try {
				const user = await UserModel.findOne({ email });

				if (!user) {
					return done(null, false, { message: 'User not found' });
				} else {
					console.log("find OK ", user);
				}

				const isMatch = await user.matchPassword(password)
				console.log("isMatch ", isMatch);
				if (!isMatch) {
					return done(null, false, { message: 'Wrong Password' });
				}

				return done(null, user, { message: 'Logged in Successfully' });
			} catch (error) {
				return done(error);
			}
		}
	)
);