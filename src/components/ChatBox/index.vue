<script setup lang="ts">
import { Icon } from '@iconify/vue';
import UserMessage from '../Message/UserMessage.vue';
import AIMessage from '../Message/AIMessage.vue';
import ChatInput from '../ChatInput/index.vue';
import { ref, nextTick } from 'vue';
import { chatCompletion } from '@/ai/chat';

interface ChatBoxProps {
  title: string;
  welcomeMessage?: string;
}

const props = withDefaults(defineProps<ChatBoxProps>(), {
  welcomeMessage:''
});

defineEmits<{
  (e: 'close'): void;
}>();

interface ChatMessage {
  type: 'ai' | 'user';
  content: string;
  time: string;
}

const messages = ref<ChatMessage[]>([
  {
    type: 'ai',
    content: props.welcomeMessage,
    time: new Date().toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }
]);

const loading = ref(false);

const messagesContainer = ref<HTMLElement | null>(null);

const scrollToBottom = async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

const handleSend = async (content: string) => {
  const time = new Date().toLocaleTimeString('zh-CN', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  messages.value.push({
    type: 'user',
    content,
    time
  });
  await scrollToBottom();

  messages.value.push({
    type: 'ai',
    content: '',
    time: new Date().toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  });

  try {
    loading.value = true;
    const response = await chatCompletion(content);
    
    messages.value[messages.value.length - 1] = {
      type: 'ai',
      content: response || '抱歉，我现在无法回答这个问题。',
      time: new Date().toLocaleTimeString('zh-CN', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  } catch (error) {
    console.error('Chat error:', error);
    messages.value[messages.value.length - 1] = {
      type: 'ai',
      content: '抱歉，发生了一些错误，请稍后再试。',
      time: new Date().toLocaleTimeString('zh-CN', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  } finally {
    loading.value = false;
    await scrollToBottom();
  }
};
</script>

<template>
  <div class="chat-box">
    <!-- 标题栏 -->
    <div class="header">
      <div class="header-content">
        <div class="title-group">
          <div class="avatar">
            <Icon icon="solar:bot-bold" width="20" />
          </div>
          <div class="info">
            <h3>{{ title }}</h3>
            <span class="status">在线</span>
          </div>
        </div>
        <button class="close" @click="$emit('close')">
          <Icon icon="solar:close-circle-bold" width="20" />
        </button>
      </div>
    </div>

    <!-- 消息列表 -->
    <div class="messages" ref="messagesContainer">
      <template v-for="(msg, index) in messages" :key="index">
        <UserMessage
          v-if="msg.type === 'user'"
          :content="msg.content"
          :time="msg.time"
        />
        <AIMessage
          v-else
          :content="msg.content"
          :time="msg.time"
          :loading="loading && index === messages.length - 1"
        />
      </template>
    </div>

    <!-- 输入框 -->
    <ChatInput :loading="loading" @send="handleSend" />
  </div>
</template>

<style lang="scss" scoped>
.chat-box {
  @apply h-full flex flex-col;

  .header {
    @apply shrink-0;
    border-bottom-width: 1px;

    .header-content {
      @apply flex items-center justify-between p-4;

      .title-group {
        @apply flex items-center gap-3;

        .avatar {
          @apply w-10 h-10 rounded-full flex items-center justify-center;
        }

        .info {
          h3 {
            @apply text-base font-medium;
          }

          .status {
            @apply text-xs block;
            opacity: 0.6;
          }
        }
      }

      .close {
        @apply p-2 rounded-lg transition-all duration-200;
        opacity: 0.6;

        &:hover {
          opacity: 1;
        }
      }
    }
  }

  .messages {
    @apply flex-1 overflow-y-auto p-4 space-y-6;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
      @apply w-2;
    }

    &::-webkit-scrollbar-track {
      @apply bg-transparent;
    }

    &::-webkit-scrollbar-thumb {
      @apply bg-black/10 rounded-full;
    }
  }
}
</style> 