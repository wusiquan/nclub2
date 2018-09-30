import * as Koa from 'koa'
import Models from '../lib/core'

// let $Topic = Models.$Topic
const $User = Models.$User

export const get = async function(ctx: Koa.Context) {
  let name = ctx.session.user && ctx.session.user.name
  let userInfo = {}
  if (name) {
    userInfo = await $User.getUserByName(name)
  }
  await ctx.render('create', {
    title: '发表话题页',
    ctx: ctx,
    userInfo: userInfo
  })
}