<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import ChatToolbar from '../ChatToolbar/index.vue';

const emit = defineEmits<{
  (e: 'send', message: string): void;
}>();

const message = ref('');

const handleSend = () => {
  if (message.value.trim()) {
    emit('send', message.value);
    message.value = '';
  }
};

const handleToolAction = (action: string) => {
  console.log('Tool action:', action);
  // 处理工具栏动作
};
</script>

<template>
  <div class="chat-input">
    <ChatToolbar
      @emoji="handleToolAction('emoji')"
      @image="handleToolAction('image')"
      @file="handleToolAction('file')"
    />
    <div class="input-group">
      <input
        v-model="message"
        type="text"
        placeholder="输入消息..."
        @keyup.enter="handleSend"
      >
      <button 
        class="send"
        title="发送消息"
        @click="handleSend"
      >
        <Icon icon="material-symbols:send" width="18" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat-input {
  @apply p-4;

  .input-group {
    @apply flex gap-3 mt-3;

    input {
      @apply flex-1 px-4 py-3 rounded-xl outline-none transition-all duration-200;
      
      &::placeholder {
        @apply opacity-50;
      }
    }

    .send {
      @apply p-3.5 rounded-xl transition-all duration-200 flex items-center justify-center;
      
      &:hover {
        transform: scale(1.05);
      }

      &:active {
        transform: scale(0.95);
      }
    }
  }
}
</style> 