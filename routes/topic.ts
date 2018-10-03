import { Schema } from 'mongoose'
import Models from '../lib/core'

const $Topic = Models.$Topic
const $User = Models.$User
const $Comment = Models.$Comment

// NOTE: 这个页面需要用户登陆
export const get = async(ctx: any) => {
  if (!ctx.isAuthenticated()) {
    ctx.flash = { error: '请登录' }
    ctx.redirect('/signin')
    return
  }
  
  let id: Schema.Types.ObjectId = ctx.params.id
  const user = ctx.session.user

  let topic = await $Topic.getTopicById(id)
  let userInfo = await $User.getUserByName(user.name)
  let noReplyTopics = await $Topic.getNoReplyTopics()
  let comments = await $Comment.getCommentsByTopicId(id)
  
  await ctx.render('topic', {
    ctx,
    topic,
    userInfo,
    noReplyTopics,
    comments
  })
}

export const post = async(ctx: any) => {
  let id: Schema.Types.ObjectId = ctx.params.id
  let data = ctx.request.body
  data.user = ctx.session.user
  
  await $Comment.addComment(data)
  await $Topic.incCommentById(id)

  ctx.flash = { success: '回复成功!' }
  ctx.redirect(ctx.query.redirect || 'back')
}