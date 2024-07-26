import chatService from "../../services/chat/ChatService";
import { Request, Response } from "express";
import { ChatMessage, TypingIndicator } from "../../types/ChatTypes";

class ChatController {
  constructor() {}

  async fetchMessages(req: Request, res: Response): Promise<Response> {
    try {
      const { groupId } = req.params;

      if (!groupId) {
        return res.status(400).json({ message: "Group ID parameter is required" });
      }

      const messages = await chatService.fetchMessages(groupId);

      if (messages.length > 0) {
        return res.status(200).json(messages);
      } else {
        return res.status(404).json({ message: "No messages found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async sendMessage(req: Request, res: Response): Promise<Response> {
    try {
      const { message, user, groupId, timestamp } = req.body;

      if (!message || !user || !groupId) {
        return res.status(400).json({ message: "Missing parameters" });
      }

      const chatMessage: ChatMessage = { message, user, groupId, timestamp: timestamp || new Date() };

      const result = await chatService.sendMessage(chatMessage);

      if (result === "Message sent successfully") {
        return res.status(200).json({ message: "Message sent successfully" });
      } else {
        return res.status(500).json({ message: "Message sending failed" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async sendTypingIndicator(req: Request, res: Response): Promise<Response> {
    try {
      const { user, groupId } = req.body;

      if (!user || !groupId) {
        return res.status(400).json({ message: "Missing parameters" });
      }

      const typingIndicator: TypingIndicator = { user, groupId };

      await chatService.sendTypingIndicator(typingIndicator);

      return res.status(200).json({ message: "Typing indicator sent" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new ChatController();
