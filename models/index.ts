import * as mongoose from 'mongoose'
import config from '../configs/default'

mongoose.connect(config.mongodb.url, { useNewUrlParser: true }, err => {
  if (err) {
    console.error('connect to %s error: ', config.mongodb.url, err.message)
    process.exit(1)
  }
})

export { default as User } from './user'