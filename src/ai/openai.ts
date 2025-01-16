import { aiConfig } from "./config"; // 导入AI配置
import type { ChatMessage } from "./config"; // 导入聊天消息类型定义
import { chatMiddleware } from "./middleware"; // 导入聊天中间件
import { knowledgeBase } from "./knowledge"; // 导入知识库

/**
 * 处理聊天完成任务的函数
 * @param message 用户输入的消息
 * @returns 一个Promise，resolve为处理后的响应文本
 */
export const chatCompletion = async (message: string) => {
  try {
    // 搜索相关文档
    const relevantDocs = await knowledgeBase.search(message); // 根据用户输入的消息搜索相关文档
    const context = relevantDocs.map((doc) => doc.content).join("\n\n"); // 将搜索到的文档内容连接起来，作为上下文

    // 构建带有上下文的消息
    const messages: ChatMessage[] = [
      { role: "system", content: aiConfig.systemPrompt }, // 系统提示信息
      {
        role: "system",
        content: `相关上下文信息：\n${context}\n\n请基于以上上下文回答用户问题。如果上下文中没有相关信息，请说明无法找到相关信息。`,
      }, // 包含上下文信息的系统消息
      { role: "user", content: message }, // 用户输入的消息
    ];

    const processedMessages = chatMiddleware.beforeRequest(messages); // 通过中间件处理消息

    // 发送请求到OpenAI API
    const response = await fetch(
      `${
        import.meta.env.VITE_OPENAI_BASE_URL || "https://api.openai.com/v1"
      }/chat/completions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: aiConfig.model,
          messages: processedMessages,
          temperature: aiConfig.temperature,
          max_tokens: aiConfig.maxTokens,
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`); // 如果响应不成功，抛出错误
    }

    // 处理响应流
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let content = "";

    while (reader) {
      const { done, value } = await reader.read();
      if (done) break;
      content += decoder.decode(value);
    }

    // 返回处理后的响应文本
    return chatMiddleware.afterResponse(content);
  } catch (error) {
    console.error("AI Error:", error); // 如果发生错误，打印错误信息
    throw error; // 抛出错误
  }
};

export default chatCompletion;
