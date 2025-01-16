import { AIProvider } from "./types";

/**
 * OpenAI API 响应接口
 */
interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
  }>;
}

/**
 * OpenAI 提供商实现
 * @implements {AIProvider}
 */
export class OpenAIProvider implements AIProvider {
  name = "openai";

  /**
   * 发送聊天请求到 OpenAI API
   * @param {string} message - 用户消息
   * @returns {Promise<string>} AI 响应内容
   * @throws {Error} 当 API 请求失败时抛出错误
   */
  async chat(message: string): Promise<string> {
    const response = await fetch(
      `${import.meta.env.VITE_OPENAI_BASE_URL}/v1/chat/completions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: message,
            },
          ],
          temperature: 0.7,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as OpenAIResponse;
    return data.choices[0].message.content;
  }
}
