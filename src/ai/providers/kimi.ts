import { AIProvider } from "./types";

interface KimiResponse {
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
    finish_reason: string;
    index: number;
  }>;
  created: number;
  id: string;
  model: string;
  object: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export class KimiProvider implements AIProvider {
  name = "kimi";

  async chat(message: string): Promise<string> {
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
          stream: false,
          temperature: 0.7,
        }),
      }
    );

    if (!response.ok) {
      const error = (await response.json()) as { message: string };
      throw new Error(
        `Kimi API Error: ${error.message || response.statusText}`
      );
    }

    const data = (await response.json()) as KimiResponse;
    return data.choices[0].message.content;
  }
}
