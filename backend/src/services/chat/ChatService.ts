import { MongoClient } from "mongodb";
import { connectDB, client, dbName } from "../../config/mongoDb";
import { ChatMessage, TypingIndicator } from "../../types/ChatTypes";
import { pusher } from "../../index";

class ChatService {
  constructor() {}

  async fetchMessages(groupId: string): Promise<ChatMessage[]> {
    try {
        console.log(groupId)
      const db = client.db(dbName);
      const collection = db.collection<ChatMessage>("chats");

      const messages = await collection.find({ groupId }).sort({ timestamp: 1 }).toArray();

      return messages;
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  }

  async sendMessage(message: ChatMessage): Promise<string> {
    try {
      const db = client.db(dbName);
      const collection = db.collection<ChatMessage>("chats");
      const result = await collection.insertOne(message);

      if (result.insertedId) {
        pusher.trigger(message.groupId, 'message', message);
        return "Message sent successfully";
      } else {
        throw new Error("Message sending failed");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      throw new Error("Internal server error");
    }
  }

  async sendTypingIndicator(typingIndicator: TypingIndicator): Promise<void> {
    try {
      pusher.trigger(typingIndicator.groupId, 'typing', typingIndicator);
    } catch (error) {
      console.error("Error sending typing indicator:", error);
      throw new Error("Internal server error");
    }
  }
}

export default new ChatService();
