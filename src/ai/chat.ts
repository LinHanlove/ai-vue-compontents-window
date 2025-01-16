import { AIProviderFactory } from "./providers/factory";
import { aiConfig } from "./config";
import type { ProviderType } from "./providers/types";

export const chatCompletion = async (message: string) => {
  const provider = AIProviderFactory.createProvider(
    aiConfig.provider as ProviderType
  );

  try {
    return await provider.chat(message);
  } catch (error) {
    console.error(`${provider.name} Error:`, error);
    throw error;
  }
};
