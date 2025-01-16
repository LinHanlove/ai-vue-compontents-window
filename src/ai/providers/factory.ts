import { AIProvider } from "./types";
import { OpenAIProvider } from "./openai";
import { ClaudeProvider } from "./claude";
import { KimiProvider } from "./kimi";

/**
 * 创建 AI 提供商实例
 * @param {string} provider - AI 提供商名称
 * @returns {AIProvider} AI 提供商实例
 * @throws {Error} 当提供商不存在时抛出错误
 */
export const createAIProvider = (provider: string): AIProvider => {
  switch (provider) {
    case "openai":
      return new OpenAIProvider();
    case "claude":
      return new ClaudeProvider();
    case "kimi":
      return new KimiProvider();
    default:
      throw new Error(`Unknown AI provider: ${provider}`);
  }
};
