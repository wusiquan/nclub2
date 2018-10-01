import * as Koa from 'koa'
import Models from '../lib/core'

const $User = Models.$User
const $Topic = Models.$Topic

export default async function(ctx: Koa.Context) {
  let tab = ctx.query.tab
  let p = ctx.query.p || 1
  
  let username = ctx.session.user && ctx.session.user.name

  let topics = await $Topic.getTopicsByTab(tab, p)
  let noReplyTopics = await $Topic.getNoReplyTopics()
  let userInfo = await $User.getUserByName(username)
  let topicCount = await $Topic.getTopicsCount(tab)

  await ctx.render('index', {
    title: '首页',
    ctx,
    topics,
    noReplyTopics,
    userInfo,
    topicCount
  })
}