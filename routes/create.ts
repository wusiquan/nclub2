import * as Koa from 'koa'
import Models from '../lib/core'

// let $Topic = Models.$Topic

export const get = async function(ctx: Koa.Context) {
  await ctx.render('create', {
    title: '发表话题页'
  })
}