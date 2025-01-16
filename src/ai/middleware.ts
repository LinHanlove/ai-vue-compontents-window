import type { ChatMessage } from "./config";

export const chatMiddleware = {
  beforeRequest: (messages: ChatMessage[]) => {
    console.log("Sending:", messages);
    return messages;
  },

  afterResponse: (response: string) => {
    console.log("Received:", response);
    return response;
  },
};
