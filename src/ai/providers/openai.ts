import { AIProvider } from "./types";
import { AI_MODELS } from "../config";

export class OpenAIProvider implements AIProvider {
  name = "openai";

  async chat(message: string): Promise<string> {
    const response = await fetch(
      `${import.meta.env.VITE_OPENAI_BASE_URL}/chat/completions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: import.meta.env.VITE_OPENAI_MODEL || AI_MODELS.GPT35,
          messages: [{ role: "user", content: message }],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: { choices: Array<{ message: { content: string } }> } =
      await response.json();
    return data.choices[0].message.content;
  }
}
