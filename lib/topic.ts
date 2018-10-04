import { Schema } from 'mongoose'
import { Topic } from '../models'

// 新建一个话题
export const addTopic = (data: any) => {
  return Topic.create(data)
}

// 通过id获取一个话题,并增加pv 1
export const getTopicById = (id: Schema.Types.ObjectId) => {
  return Topic.findByIdAndUpdate(id, {$inc: { pv: 1 }}).exec()
}

// 获取5条最新未评论的话题
export const getNoReplyTopics = () => {
  return Topic.find({ comment: 0 }).sort('-updated_at').limit(5).select('title').exec()
}

// 获取用户所有话题
export const getTopicsByName = (name: string) => {
  return Topic.find({ 'user.name': name }).sort('-updated_at').exec()
}

// 通过标签和页码获取10个话题
export const getTopicsByTab = (tab: string, pageNum: number) => {
  let query: any = {}
  if (tab) { query.tab = tab }
  return Topic.find(query).skip((pageNum - 1) * 10).sort('-updated_at').limit(10).select('-content').exec()
}

// 通过id增加一个话题的评论数
export const incCommentById = (id: Schema.Types.ObjectId) => {
  return Topic.findByIdAndUpdate(id, {$inc: { comment: 1 }}).exec()
}

// 获取不同标签的话题数
export const getTopicsCount = (tab: string) => {
  let query: any = {}
  if (tab) { query.tab = tab }
  return Topic.countDocuments(query).exec()
}