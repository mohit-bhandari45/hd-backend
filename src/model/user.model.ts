import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  dob: Date;
  contents: mongoose.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dob: { type: Date, required: true },
    contents: [
      {
        type: Schema.Types.ObjectId,
        ref: "Content",
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);
