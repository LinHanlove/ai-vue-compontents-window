/**
 * AI 请求配置接口
 */
export interface AIRequestConfig {
  /** API 密钥 */
  apiKey: string;
  /** API 基础URL */
  baseURL?: string;
  /** 请求超时时间 */
  timeout?: number;
  /** 重试次数 */
  retries?: number;
}

/**
 * AI 响应错误接口
 */
export interface AIError extends Error {
  /** 错误代码 */
  code?: string;
  /** 错误状态 */
  status?: number;
  /** 原始错误信息 */
  raw?: unknown;
}

/**
 * AI 响应接口
 */
export interface AIResponse<T = unknown> {
  /** 响应数据 */
  data: T;
  /** 响应状态码 */
  status: number;
  /** 响应头 */
  headers: Headers;
}

export interface FileMetadata {
  selection: string[];
}

export interface ProviderMetadata {
  files: FileMetadata;
}

export interface AIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface Document {
  id: string;
  content: string;
  metadata?: {
    title?: string;
    source?: string;
    timestamp?: string;
    type?: string;
  };
}

export interface KnowledgeBase {
  documents: Document[];
  addDocument: (doc: Document) => void;
  search: (query: string) => Promise<Document[]>;
}
