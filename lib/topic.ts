import { Topic } from '../models'

// 新建一个话题
export const addTopic = (data: any) => {
  return Topic.create(data)
}

// 通过id获取一个话题,并增加pv 1
export const getTopicById = (id: string) => {
  return Topic.findByIdAndUpdate(id, {$inc: {pv: 1}}).exec()
}

// 通过标签和页码获取10个话题
// export const getTopicsByTab = (tab: string, pageNum: number) => {
//   let query: any = {}
//   if (tab) { query.tab = tab; }
//   return Topic.find(query).skip((pageNum - 1) * 10).sort('-updated_at').limit(10).select('-content').exec()
// }

// 通过id增加一个话题的评论数
// exports.incCommentById = async(id: number) => {
//   return Topic.findByIdAndUpdate(id, {$inc: { comment: 1 }}).exec()
// }