// import * as Koa from 'koa'
import Models from '../lib/core'

const $User = Models.$User
const $Topic = Models.$Topic

const ESC: { [k:string] : string } = {
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;',
  '&': '&amp;'
}

/**
 * 转义4个字符
 */
export function escape(s: string) {
  return s.replace(/[<>"&]/g, (a) => ESC[a] || a)
}

export let get = async function(ctx: any) {
  let name = escape(ctx.params.name)
  let userInfo = await $User.getUserByName(name)
  let noReplyTopics = await $Topic.getNoReplyTopics()
  let topics = await $Topic.getTopicsByName(name)

  await ctx.render('user', {
    title: '用户页',
    ctx: ctx,
    userInfo,
    topics,
    noReplyTopics
  })
}