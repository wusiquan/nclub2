import * as mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true},
  password: { type: String, required: true },
  gender: { type: String, required: true },
  signature: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, { autoIndex: false })

UserSchema.index({ name: 1 })

export default mongoose.model('User', UserSchema)