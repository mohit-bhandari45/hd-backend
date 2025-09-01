import { Schema, model, Document, Types } from "mongoose";

export interface IContent extends Document {
  title: string;
  body: string;
  tags?: string[];
  isPinned: boolean;
  author: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ContentSchema = new Schema<IContent>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
      trim: true
    },
    body: {
      type: String,
      required: [true, "Body is required"],
      minlength: [1, "Note cannot be empty"]
    },
    tags: {
      type: [String],
      default: []
    },
    isPinned: {
      type: Boolean,
      default: false
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"]
    }
  },
  { timestamps: true }
);

export const Content = model<IContent>("Content", ContentSchema);
