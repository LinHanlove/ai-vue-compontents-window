import { createAIProvider } from "./providers/factory";
import { DEFAULT_PROVIDER } from "./config";

/**
 * 发送聊天请求到当前选择的 AI 提供商
 * @async
 * @param {string} message - 用户输入的消息
 * @returns {Promise<string>} AI 的响应内容
 * @throws {Error} 当 AI 请求失败时抛出错误
 */
export const chatCompletion = async (message: string): Promise<string> => {
  const provider = createAIProvider(DEFAULT_PROVIDER);
  return await provider.chat(message);
};
