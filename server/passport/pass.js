const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const UserModel = require('../models/users.model');
var beURL = require('./../config/properties').backEndUrl;
var GoogleStrategy = require('passport-google-oauth20');
const passportConfig = {
    clientID: "593466114236-0qmdm08m9c8v0i6ibdpcal9mrm25goad.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: `/api/auth/google/redirect`
};
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
			// console.log("email ", email);
			// console.log("password ", password);
			try {
				const user = await UserModel.findOne({ email }).select('+password');

				if (!user) {
					return done(null, false, { message: 'User not found' });
				}

				const isMatch = await user.matchPassword(password)
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

// google
passport.use(new GoogleStrategy({
	clientID: passportConfig.clientID,
	clientSecret: passportConfig.clientSecret,
	callbackURL: passportConfig.callbackURL,
	scope: [ 'profile' ],
	state: true
  },
  function verify(accessToken, refreshToken, profile, cb) {
	return cb(null, profile);
  }
));