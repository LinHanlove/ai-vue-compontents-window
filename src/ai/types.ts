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
