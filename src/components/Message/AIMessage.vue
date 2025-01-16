<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { marked } from 'marked';
import { computed } from 'vue';
import { copyToClipboard } from '@/utils/clipboard';

interface Props {
  content: string;
  time: string;
  loading?: boolean;
}

const props = defineProps<Props>();

const formattedContent = computed(() => {
  return marked(props.content, {
    breaks: true,
    gfm: true,
  });
});

const copyContent = async () => {
  await copyToClipboard(props.content);
};
</script>

<template>
  <div class="message-group">
    <div class="avatar" :class="{ 'animate-pulse': loading }">
      <Icon 
        v-if="!loading"
        icon="fluent:bot-24-filled"
        width="16" 
      />
      <Icon 
        v-else
        icon="svg-spinners:pulse-3" 
        class="text-blue-500"
        width="16" 
      />
    </div>
    <div class="message">
      <div v-if="loading" class="message-content loading">
        <span class="typing-dots">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
      <div v-else class="message-content">
        <div class="markdown-body" v-html="formattedContent" />
        <button class="copy-btn" @click="copyContent" title="复制">
          <Icon icon="solar:copy-linear" width="14" />
        </button>
      </div>
      <span class="time">{{ time }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.message-group {
  @apply flex items-start gap-2;

  .avatar {
    @apply w-6 h-6 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center shrink-0;
  }

  .message {
    @apply relative;

    .message-content {
      @apply relative px-4 py-2 rounded-2xl rounded-tl-sm max-w-[85%] border border-gray-200 dark:border-gray-700 shadow-sm;

      &.loading {
        @apply min-w-[60px];
      }

      .copy-btn {
        @apply absolute right-2 top-2 p-1.5 rounded-lg opacity-0 transition-all duration-200;
        @apply hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-500;
        @apply focus:outline-none focus:ring-2 focus:ring-blue-500/20;
      }

      &:hover .copy-btn {
        @apply opacity-60 hover:opacity-100;
      }
    }

    :deep(.markdown-body) {
      @apply text-sm leading-relaxed;
      
      p { @apply m-0 mb-2 last:mb-0; }
      
      pre {
        @apply my-2 p-3 rounded bg-gray-100 dark:bg-gray-800 overflow-x-auto;
        code { @apply text-xs; }
      }
      
      code {
        @apply px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-sm;
      }
      
      ul, ol {
        @apply pl-6 my-2;
        li { @apply mb-1; }
      }
      
      a {
        @apply text-blue-500 hover:underline;
      }
      
      blockquote {
        @apply pl-3 border-l-4 border-gray-200 dark:border-gray-700 my-2 text-gray-600 dark:text-gray-400;
      }
    }

    .time {
      @apply absolute -bottom-5 right-0 text-[10px] opacity-60;
    }
  }
}

.typing-dots {
  @apply inline-flex gap-1;
  
  span {
    @apply w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500;
    animation: typing 1.4s infinite both;

    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
  }
}

@keyframes typing {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
</style> 