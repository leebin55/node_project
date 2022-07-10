import passport from'passport'
import passportLocal from 'passport-local'
import User from '../user/User'
import logger from './logger'

passport.serializeUser((user , done)=>{
	logger.debug("passport serializeUser success")
	done(null, user)
})

passport.deserializeUser((user, done)=>{
	
})