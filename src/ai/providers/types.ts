/**
 * AI 提供商类型
 */
export type ProviderType = "openai" | "claude" | "kimi";

/**
 * AI 提供商接口
 * 定义了所有 AI 提供商必须实现的方法
 */
export interface AIProvider {
  /** 提供商名称 */
  name: string;

  /**
   * 发送聊天消息并获取响应
   * @param {string} message - 用户输入的消息
   * @returns {Promise<string>} AI 的响应内容
   */
  chat(message: string): Promise<string>;
}
