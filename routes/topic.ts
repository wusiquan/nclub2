import Models from '../lib/core'

const $Topic = Models.$Topic
const $User = Models.$User

// NOTE: 这个页面需要用户登陆
export const get = async(ctx: any) => {
  let id: string = ctx.params.id
  const user = ctx.session.user
  
  await ctx.render('topic', {
    topic: await $Topic.getTopicById(id),
    userInfo: await $User.getUserByName(user.name),
    ctx: ctx
    // comments: $Comment.getCommentsByTopicId(id)
  })
}