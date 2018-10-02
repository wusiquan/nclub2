import * as passport from 'koa-passport'
import * as passportLocal from 'passport-local'
import Models from '../lib/core'

const $User = Models.$User

const LocalStrategy = passportLocal.Strategy

// ctx.login()触发
passport.serializeUser((user: any, done) => {
  console.log('serializeUser')
  done(null, user.id) 
})

// 请求时, session中存在 "passport": { "user": xx } 触发
passport.deserializeUser((id: any, done) => {
  console.log('deserializeUser:', id)
  return $User.getUserById(id)
    .then(user => {
      done(null, user)
    })
    .catch(err => { 
      done(err) 
    })
})

passport.use(new LocalStrategy({
  usernameField: 'name',  // 默认是username...坑啊
  passwordField: 'password'
}, function(username, password, done) {
  $User.getUserByName(username)
    .then((user: any) => {
      if (username === user.name && password === user.password) {
        done(null, user)
      } else {
        done(null, false)
      }
    })
    .catch((err) => { done(err) })
}))

export default passport

