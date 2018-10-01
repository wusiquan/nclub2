import { User } from '../models'

// 新建一个用户
export const addUser = (data: any) => {
  return User.create(data)
}

//通过id获取用户
// export const getUserById = function (id) {
//   return User.findbyId(id).exec();
// };

// 通过name获取用户
export const getUserByName = (name: string) => {
  return User.findOne({ name: name }).exec()
}