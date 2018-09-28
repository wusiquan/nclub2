
declare module 'koa-better-error-handler' {
  function errorHandler(): (err: Error) => void

  namespace errorHandler {}

  export = errorHandler
}