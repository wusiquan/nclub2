
declare module 'koa-404-handler' {
  import Koa = require('koa')

  function koa404Handler(): (ctx: Koa.Context, next: Function) => void

  namespace koa404Handler {}

  export = koa404Handler
}