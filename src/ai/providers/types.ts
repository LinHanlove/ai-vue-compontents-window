export interface AIProvider {
  chat(message: string): Promise<string>;
  name: string;
}

export type ProviderType = "openai" | "claude" | "kimi";
