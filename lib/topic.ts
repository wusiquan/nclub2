import { Topic } from '../models'

// 新建一个话题
export const addTopic = (data: any) => {
  return Topic.create(data)
}