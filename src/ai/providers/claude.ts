import { AIProvider } from "./types";

interface ClaudeResponse {
  completion: string;
}

/**
 * Claude AI 提供商实现
 * @implements {AIProvider}
 */
export class ClaudeProvider implements AIProvider {
  name = "claude";

  /**
   * 发送聊天请求到 Claude API
   * @param {string} message - 用户消息
   * @returns {Promise<string>} AI 响应内容
   * @throws {Error} 当 API 请求失败时抛出错误
   */
  async chat(message: string): Promise<string> {
    const response = await fetch(
      `${import.meta.env.VITE_CLAUDE_BASE_URL}/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_CLAUDE_API_KEY,
        },
        body: JSON.stringify({
          prompt: message,
          max_tokens: 1000,
          temperature: 0.7,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as ClaudeResponse;
    return data.completion;
  }
}
