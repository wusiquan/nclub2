import * as Koa from 'koa'
import Models from '../lib/core'

// import * as gravatar from 'gravatar'
import * as moment from 'moment'
// import * as md from 'markdown-it'


let ejsUtil = {
  fromNow(data: any) {
    return moment(data).fromNow()
  },

  githubAvatar(name: string) {
    return `https://github.com/${name}.png?size=60`
  }
}

const $User = Models.$User

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

export let get = async function(ctx: Koa.Context) {
  let name = escape(ctx.params.name)
  let userInfo = await $User.getUserByName(name)

  ctx.state = Object.assign(ctx.state, { ejsUtil })
  
  await ctx.render('user', {
    title: '用户页',
    name: name,
    ctx: ctx,
    userInfo
  })
}