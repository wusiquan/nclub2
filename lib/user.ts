import { Schema } from 'mongoose'
import { User } from '../models'

// 新建一个用户
export const addUser = (data: any) => {
  return User.create(data)
}

// 通过name获取用户
export const getUserByName = (name: string) => {
  return User.findOne({ name: name }).exec()
}

// 通过id获取用户
export const getUserById = (id: Schema.Types.ObjectId) => {
  return User.findById(id).exec()
}