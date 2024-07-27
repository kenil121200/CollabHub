import { Schema, model } from 'mongoose';

interface IChat {
  message: string;
  user: string;
  group: string;
  timestamp: Date;
}

const chatSchema = new Schema<IChat>({
  message: { type: String, required: true },
  user: { type: String, required: true },
  group: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default model<IChat>('Chat', chatSchema);
