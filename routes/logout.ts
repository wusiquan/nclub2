import * as Koa from 'koa'

export default async function(ctx: Koa.Context) {
  ctx.session = null
  ctx.redirect('back')
}