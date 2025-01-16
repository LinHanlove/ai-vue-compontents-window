import { AIProvider } from "./types";

interface ClaudeResponse {
  completion: string;
}

export class ClaudeProvider implements AIProvider {
  name = "claude";

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
