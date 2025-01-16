/**
 * AI 提供商配置
 * @type {Record<string, { name: string, apiKey: string, baseURL?: string }>}
 */
export const AI_PROVIDERS = {
  openai: {
    name: "OpenAI",
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  },
  claude: {
    name: "Claude",
    apiKey: import.meta.env.VITE_CLAUDE_API_KEY,
  },
  kimi: {
    name: "Kimi",
    apiKey: import.meta.env.VITE_KIMI_API_KEY,
    baseURL: import.meta.env.VITE_KIMI_BASE_URL,
  },
} as const;

/**
 * 默认的 AI 提供商
 * @type {keyof typeof AI_PROVIDERS}
 */
export const DEFAULT_PROVIDER = "kimi";

/**
 * 支持的 AI 模型列表
 * @type {Record<string, string>}
 */
export const AI_MODELS = {
  GPT35: "gpt-3.5-turbo",
  GPT4: "gpt-4",
} as const;

/**
 * AI 全局配置
 */
export const aiConfig = {
  /** 当前使用的 AI 提供商 */
  provider: import.meta.env.VITE_AI_PROVIDER || "openai",
  /** 温度参数，控制响应的随机性 */
  temperature: 0.7,
  /** 最大令牌数 */
  maxTokens: 1000,
  /** 系统提示词 */
  systemPrompt: "你是一个有帮助的AI助手。",
} as const;

/**
 * 聊天消息接口
 */
export interface ChatMessage {
  /** 消息角色：系统/用户/助手 */
  role: "system" | "user" | "assistant";
  /** 消息内容 */
  content: string;
}
