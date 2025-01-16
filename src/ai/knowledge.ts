import type { Document, KnowledgeBase } from "./types";

/**
 * 知识库服务
 * @implements {KnowledgeBase}
 */
class KnowledgeService implements KnowledgeBase {
  public documents: Document[] = [];

  /**
   * 添加文档到知识库
   * @param {Document} doc - 要添加的文档
   */
  addDocument(doc: Document): void {
    this.documents.push(doc);
  }

  /**
   * 搜索知识库
   * @param {string} query - 搜索关键词
   * @returns {Promise<Document[]>} 匹配的文档列表
   */
  async search(query: string): Promise<Document[]> {
    return this.documents.filter((doc) =>
      doc.content.toLowerCase().includes(query.toLowerCase())
    );
  }
}

export const knowledgeBase = new KnowledgeService();
