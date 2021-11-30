import mongoose from 'mongoose'

const { Schema, model } = mongoose

const schema = new Schema({
   name: { type: String, requires: true, unique: true },
   password: { type: String, requires: true }
})

const modelSchema = model(`Room`, schema)

export { modelSchema as Room }