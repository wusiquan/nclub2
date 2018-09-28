import * as Koa from 'koa'
import Models from '../lib/core'
import { IFlashContext } from '../types/flash'

const $User = Models.$User

export const get = async function(ctx: Koa.Context) {
  await ctx.render('signup', {
    title: '注册',
    ctx: ctx
  })
}

interface IRegisterBody {
  name: string,
  email: string
}

export const post = async function(ctx: IFlashContext) {
  let data = <IRegisterBody>ctx.request.body

  let userExist = await $User.getUserByName(data.name)

  if (userExist) {
    ctx.flash = { error: '用户名已存在' }
    return ctx.redirect('back')
  }

  await $User.addUser(data)
  
  ctx.session.user = {
    name: data.name,
    email: data.email
  }

  ctx.redirect('/')
}