import * as Koa from 'koa'
import * as passport from 'koa-passport'
import Models from '../lib/core'
import { IFlashContext } from '../types/flash'

let $User = Models.$User

export const get = async function(ctx: Koa.Context) {
  await ctx.render('signin', {
    title: '登录页',
    ctx: ctx
  })
}

interface IRequestBody {
  name: string
  password: string
}

export const post = async (ctx: IFlashContext, next: any) => {
  return passport.authenticate('local', {}, (err, user, info, status) => {
    if (user) {
      ctx.login(user)
      ctx.flash = { success: '登陆成功' }
      ctx.redirect('/user/' + user.name)
    } else {
      ctx.flash = { error: '用户名或密码错误!' }
      return ctx.redirect('back')
    }
  })(ctx, next)
  
  // let data = <IRequestBody>ctx.request.body

  // let userInfo: any = await $User.getUserByName(data.name)
  
  // if (!userInfo || (userInfo.password !== data.password)) {
  //   ctx.flash = { error: '用户名或密码错误!' }
  //   return ctx.redirect('back')
  // }

  // ctx.session.user = {
  //   name: userInfo.name,
  //   email: userInfo.email
  // }

  // ctx.flash = { success: '登陆成功' }
  // ctx.redirect('/user/' + userInfo.name)
}