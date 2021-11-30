import mongoose from 'mongoose'

const { Schema, model } = mongoose

const schema = new Schema({
   userName: { type: String, requires: true, unique: true },
   password: { type: String, requires: true },
   connectedRoom: { type: Schema.Types.ObjectId, ref: 'Room'}
})

const modelSchema = model(`User`, schema)

export { modelSchema as User }