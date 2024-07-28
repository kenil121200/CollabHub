// Author: Jay Patel

export interface User {
    username: string;
    name: string;
  }
  
  export interface ChatMessage {
    message: string;
    user: User;
    group: string;
    timestamp: Date;
  }
  
  export interface TypingIndicator {
    user: User;
    group: string;
  }
  