// 支持的模型列表
export const AI_MODELS = {
  GPT35: "gpt-3.5-turbo",
  GPT4: "gpt-4",
} as const;

// AI配置
export const aiConfig = {
  model: import.meta.env.VITE_OPENAI_MODEL || AI_MODELS.GPT35,
  temperature: 0.7,
  maxTokens: 1000,
  systemPrompt: "你是一个有帮助的AI助手。",
} as const;

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}
