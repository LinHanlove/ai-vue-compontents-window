<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

/**
 * 输入框组件属性
 */
defineProps<{
  /** 是否处于加载状态 */
  loading?: boolean;
}>();

/**
 * 组件事件
 */
const emit = defineEmits<{
  /**
   * 发送消息事件
   * @param {string} message - 要发送的消息内容
   */
  (e: 'send', message: string): void;
}>();

const message = ref('');
const loading = ref(false);

/**
 * 处理发送消息
 * 当消息不为空时，触发 send 事件并清空输入框
 */
const handleSend = () => {
  if (message.value.trim()) {
    emit('send', message.value);
    message.value = '';
  }
};

/**
 * 处理键盘事件
 * 当按下 Enter 且没有按住 Shift 时发送消息
 * @param {KeyboardEvent} e - 键盘事件对象
 */
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
};
</script>

<template>
  <div class="chat-input">
    <div class="input-wrapper">
      <textarea
        v-model="message"
        rows="1"
        placeholder="输入消息，Shift + Enter 换行"
        @keydown="handleKeydown"
        :disabled="loading"
      />
      <button 
        class="send-btn"
        :disabled="!message.trim() || loading"
        @click="handleSend"
      >
        <Icon 
          v-if="!loading"
          icon="solar:arrow-up-linear" 
          width="16" 
        />
        <Icon 
          v-else
          icon="svg-spinners:pulse-3" 
          class="text-white"
          width="16" 
        />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat-input {
  @apply p-4 border-t border-gray-200 dark:border-gray-700;

  .input-wrapper {
    @apply relative flex items-end gap-2;

    textarea {
      @apply flex-1 px-4 py-2 rounded-xl resize-none outline-none;
      @apply border border-gray-200 dark:border-gray-700;
      @apply bg-gray-50 dark:bg-gray-800;
      @apply text-sm leading-6;
      @apply focus:ring-1 focus:ring-blue-500/20;
      min-height: 40px;
      max-height: 120px;

      &::-webkit-scrollbar {
        @apply w-2;
      }

      &::-webkit-scrollbar-track {
        @apply bg-transparent;
      }

      &::-webkit-scrollbar-thumb {
        @apply bg-gray-300 dark:bg-gray-600 rounded-full;
        @apply hover:bg-gray-400 dark:hover:bg-gray-500;
      }
    }

    .send-btn {
      @apply w-10 h-10 rounded-xl flex items-center justify-center;
      @apply bg-blue-500 text-white;
      @apply hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-blue-500;
      @apply transition-all duration-200;
      @apply focus:outline-none focus:ring-2 focus:ring-blue-500/20;
    }
  }
}
</style> 