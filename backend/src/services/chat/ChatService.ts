// Author: Jay Patel

import { MongoClient } from "mongodb";
import { connectDB, client, dbName } from "../../config/mongoDb";
import { ChatMessage, TypingIndicator } from "../../types/ChatTypes";
import { pusher } from "../../index";
import { Group } from '../../types/GroupTypes';
import { ObjectId } from 'mongodb';

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

async fetchGroupsByContributorEmail(contributorEmail: string): Promise<{ projectId: string; projectName: string; }[]> {
  const db = client.db(dbName);
  const groupsCollection = db.collection<Group>('groups');

  // Query to find all groups where the contributorEmail is in the memberList
  const groups = await groupsCollection.find({ memberList: contributorEmail }).toArray();

  // Map the results to an array of objects containing projectId and projectName
  return groups.map(group => ({
    projectId: group.projectId,
    projectName: group.projectName,
  }));
};

  async leaveGroup(groupId: string, userEmail: string): Promise<ChatMessage> {
    try {
      const db = client.db(dbName);
      const groupsCollection = db.collection<Group>('groups');

      // Remove the user email from the memberList
      const updateResult = await groupsCollection.updateOne(
        { projectId: groupId },
        { $pull: { memberList: userEmail } }
      );

      if (updateResult.modifiedCount === 0) {
        throw new Error('Failed to leave group');
      }

      const leaveMessage: ChatMessage = {
        message: `${userEmail} has left the group`,
        groupId: groupId,
        user: { username: 'system', name: 'System' },
        timestamp: new Date(),
      };

      const chatsCollection = db.collection<ChatMessage>('chats');
      const result = await chatsCollection.insertOne(leaveMessage);

      if (result.insertedId) {
        pusher.trigger(groupId, 'message', leaveMessage);
        return leaveMessage;
      } else {
        throw new Error('Message sending failed');
      }
    } catch (error) {
      console.error('Error leaving group:', error);
      throw new Error('Internal server error');
    }
  }
}

export default new ChatService();
