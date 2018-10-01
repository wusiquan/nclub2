import { Schema } from 'mongoose'
import { Comment } from '../models'

// 添加一条评论
export const addComment = (data: any) => {
  return Comment.create(data)
}

// 根据话题id获取对应评论
export const getCommentsByTopicId = (id: Schema.Types.ObjectId) => {
  return Comment.find({ topic_id: id }).sort('updated_at').exec()
}