import type { Document, KnowledgeBase } from "./types";

class LocalKnowledgeBase implements KnowledgeBase {
  public documents: Document[] = [];

  addDocument(doc: Document) {
    this.documents.push(doc);
  }

  async search(query: string): Promise<Document[]> {
    // 简单的关键词匹配，实际项目中可以使用更复杂的搜索算法
    return this.documents.filter((doc) =>
      doc.content.toLowerCase().includes(query.toLowerCase())
    );
  }
}

export const knowledgeBase = new LocalKnowledgeBase();
