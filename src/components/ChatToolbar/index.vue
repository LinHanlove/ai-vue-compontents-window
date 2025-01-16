<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { knowledgeBase } from '@/ai/knowledge';
import type { Document } from '@/ai/types';

interface ToolbarEmits {
  (e: 'emoji'): void;
  (e: 'image'): void;
  (e: 'file'): void;
}

const handleKnowledgeUpload = async (event:any) => {
  const input = event.target ;
  const file = input.files?.[0];
  if (!file) return;

  const content = await file.text();
  const doc: Document = {
    id: crypto.randomUUID(),
    content,
    metadata: {
      title: file.name,
      timestamp: new Date().toISOString(),
      type: file.type,
    }
  };

  knowledgeBase.addDocument(doc);
  console.log('文档已添加到知识库:', doc.metadata?.title);
};

defineEmits<ToolbarEmits>();
</script>

<template>
  <div class="chat-toolbar">
    <button class="tool-btn" title="选择表情" @click="$emit('emoji')">
      <Icon icon="solar:emoji-funny-square-bold" width="20" />
    </button>
    <button class="tool-btn" title="发送图片" @click="$emit('image')">
      <Icon icon="solar:gallery-add-bold" width="20" />
    </button>
    <button class="tool-btn" title="发送文件" @click="$emit('file')">
      <Icon icon="solar:folder-with-files-bold" width="20" />
    </button>
    <input
      type="file"
      ref="fileInput"
      @change="handleKnowledgeUpload"
      accept=".txt,.md,.pdf"
      class="hidden"
    />
    <button class="tool-btn" title="添加到知识库" @click="$refs.fileInput?.click()">
      <Icon icon="solar:book-bookmark-bold" width="20" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.chat-toolbar {
  @apply flex gap-1;

  .tool-btn {
    @apply p-2 rounded-lg transition-all duration-200 flex items-center justify-center;
    opacity: 0.6;

    &:hover {
      opacity: 1;
    }
  }
}
</style> 