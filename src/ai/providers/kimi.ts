import { AIProvider } from "./types";

/**
 * Kimi API 响应接口
 */
interface KimiResponse {
  choices: Array<{
    delta: {
      content: string;
    };
  }>;
}

/**
 * Kimi AI 提供商实现
 * @implements {AIProvider}
 */
export class KimiProvider implements AIProvider {
  name = "kimi";

  /**
   * 发送聊天请求到 Kimi API
   * @param {string} message - 用户消息
   * @returns {Promise<ReadableStream>} AI 响应流
   * @throws {Error} 当 API 请求失败时抛出错误
   */
  async chat(message: string): Promise<ReadableStream> {
    const response = await fetch(
      `${import.meta.env.VITE_KIMI_BASE_URL}/v1/chat/completions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_KIMI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "moonshot-v1-128k",
          messages: [
            {
              role: "user",
              content: message,
            },
          ],
          stream: true, // 启用流式输出
          temperature: 0.3,
        }),
      }
    );

    if (!response.ok) {
      const error = (await response.json()) as { message: string };
      throw new Error(
        `Kimi API Error: ${error.message || response.statusText}`
      );
    }

    return response.body; // 返回可读流
  }
}
