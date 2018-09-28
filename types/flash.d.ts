import * as Koa from 'koa'

interface IFlashObj {
  error?: string
  success?: string
}

export interface IFlashContext extends Koa.Context {
  flash: IFlashObj
}