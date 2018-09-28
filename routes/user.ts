import * as Koa from 'koa'
import Models from '../lib/core'

const $User = Models.$User


const ESC: { [k:string] : string } = {
  '<': '&lt;',
  '>': '&gt;',
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
  
  await ctx.render('user', {
    title: '用户页',
    name: name,
    ctx: ctx,
    userInfo: $User.getUserByName(name)
  })
}