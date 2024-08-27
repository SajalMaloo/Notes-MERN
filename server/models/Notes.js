import mongoose, { Schema } from "mongoose";

const NotesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  }
});

export const NotesModel = mongoose.model('Notes', NotesSchema);