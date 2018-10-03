import * as Koa from 'koa'
import Models from '../lib/core'

const $Topic = Models.$Topic
const $User = Models.$User

// NOTE: 这个页面需要用户登陆
export const get = async function(ctx: any) {
  if (!ctx.isAuthenticated()) {
    ctx.flash = { error: '请登录' }
    ctx.redirect('/signin')
    return
  }

  let name = ctx.session.user && ctx.session.user.name
  let userInfo = {}
  if (name) {
    userInfo = await $User.getUserByName(name)
  }
  let noReplyTopics = await $Topic.getNoReplyTopics()

  await ctx.render('create', {
    title: '发表话题页',
    ctx: ctx,
    userInfo: userInfo,
    noReplyTopics
  })
}

export const post = async function(ctx: any) {
  let data: any = ctx.request.body
  data.user = ctx.session.user
  let topic = await $Topic.addTopic(data)
  
  ctx.flash = { success: '发布成功!' }
  ctx.redirect('/topic/' + topic._id)
}