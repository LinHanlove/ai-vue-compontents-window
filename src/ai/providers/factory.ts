import { AIProvider, ProviderType } from "./types";
import { OpenAIProvider } from "./openai";
import { ClaudeProvider } from "./claude";
import { KimiProvider } from "./kimi";

export class AIProviderFactory {
  private static provider: AIProvider | null = null;

  static createProvider(type: ProviderType): AIProvider {
    if (this.provider) return this.provider;

    switch (type) {
      case "openai":
        this.provider = new OpenAIProvider();
        break;
      case "claude":
        this.provider = new ClaudeProvider();
        break;
      case "kimi":
        this.provider = new KimiProvider();
        break;
      default:
        this.provider = new OpenAIProvider();
    }

    return this.provider;
  }
}
