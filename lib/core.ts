import * as User from './user'
import * as Topic from './topic'
import * as Comment from './comment'

export default {
  get $User() {
    return User
  },

  get $Topic() {
    return Topic
  },

  get $Comment() {
    return Comment
  }
}