<script setup lang="ts">
import { Icon } from '@iconify/vue';

interface MessageProps {
  type: 'ai' | 'user';
  content: string;
  time: string;
  loading?: boolean;
}

defineProps<MessageProps>();
</script>

<template>
  <div class="message-group" :class="{ user: type === 'user' }">
    <div class="avatar" :class="{ 'animate-pulse': loading }">
      <Icon 
        v-if="!loading"
        :icon="type === 'ai' ? 'fluent:bot-24-filled' : 'solar:user-bold'" 
        width="16" 
      />
      <Icon 
        v-else
        icon="svg-spinners:pulse-3" 
        class="text-blue-500"
        width="16" 
      />
    </div>
    <div class="message" :class="{ loading }">
      <p>
        <span v-if="loading" class="typing-dots">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <span v-else>{{ content }}</span>
      </p>
      <span class="time">{{ time }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.message-group {
  @apply flex items-start gap-2;

  &.user {
    @apply flex-row-reverse;
  }

  .avatar {
    @apply w-6 h-6 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center shrink-0;
  }

  .message {
    @apply relative px-4 py-2 rounded-2xl max-w-[85%] border border-gray-200 dark:border-gray-700 shadow-sm;
    
    &.loading {
      @apply min-w-[60px];
    }

    p {
      @apply m-0 text-sm leading-relaxed break-words;
      white-space: pre-wrap;
    }

    .time {
      @apply absolute -bottom-5 text-[10px] opacity-60;
      right: var(--time-right, 0);
      left: var(--time-left, auto);
    }
  }

  &.user .message {
    --time-left: 0;
    --time-right: auto;
    @apply rounded-tr-sm;
  }

  &:not(.user) .message {
    @apply rounded-tl-sm;
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

<script lang="ts">
export const Message = {};
</script> 