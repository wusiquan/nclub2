import * as Koa from 'koa'

declare module "koa" {
  interface Context {
    flash: any
  }
}

declare function flash(opts?: {
  key?: string,
  defaultValue?: string
}): Koa.Middleware

declare namespace flash {}

export = flash


