import * as User from './user'
import * as Topic from './topic'

export default {
  get $User() {
    return User
  },

  get $Topic() {
    return Topic
  }
}