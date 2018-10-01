import * as mongoose from 'mongoose'
import config from '../configs/default'

mongoose.set('useCreateIndex', true)
// DeprecationWarning: collection.findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.
mongoose.set('useFindAndModify', false)
mongoose.connect(config.mongodb.url, {
  useNewUrlParser: true
}, err => {
  if (err) {
    console.error('connect to %s error: ', config.mongodb.url, err.message)
    process.exit(1)
  }
})

export { default as User } from './user'
export { default as Topic } from './topic'