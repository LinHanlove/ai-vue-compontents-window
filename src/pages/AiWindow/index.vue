<script setup lang="ts">
import { Icon } from '@iconify/vue';
import ChatBox from '@/components/ChatBox/index.vue';
import { ref, computed } from 'vue';
import { WindowConfig, defaultConfig, animationMap, AnimationType } from './config';

const props = withDefaults(defineProps<WindowConfig>(), defaultConfig);
const localIsOpen = ref(props.isOpen);

// 根据传入的动画名称获取具体配置
const currentAnimation = computed(() => 
  animationMap[props.animation as AnimationType] || animationMap.bounce
);

const animationStyle = computed(() => ({
  '--duration': `${currentAnimation.value.duration}ms`
}));

const toggleWindow = () => {
  localIsOpen.value = !localIsOpen.value;
};

const getPositionStyle = (pos: string) => {
  const positions = {
    'bottom-right': { bottom: '24px', right: '24px' },
    'bottom-left': { bottom: '24px', left: '24px' },
    'top-right': { top: '24px', right: '24px' },
    'top-left': { top: '24px', left: '24px' }
  };
  return positions[pos as keyof typeof positions];
};
</script>

<template>
  <div>
    <Transition :name="localIsOpen ? currentAnimation.enter : currentAnimation.leave">
      <div v-if="localIsOpen"
        :data-theme="props.theme"
        :style="{
          width,
          height,
          position: 'fixed',
          ...getPositionStyle(position),
          ...animationStyle
        }"
        class="chat-window overflow-hidden rounded-2xl shadow-xl"
      >
        <ChatBox 
          :title="title" 
          :welcome-message="welcomeMessage"
          @close="toggleWindow" 
        />
      </div>
    </Transition>

    <!-- 悬浮按钮 -->
    <Transition :name="!localIsOpen ? currentAnimation.enter : currentAnimation.leave">
      <button v-if="!localIsOpen"
        :style="{
          position: 'fixed',
          ...getPositionStyle(position),
          ...animationStyle
        }"
        class="float-btn w-14 h-14 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all hover:scale-105 active:scale-95"
        @click="toggleWindow"
      >
        <Icon icon="solar:chat-round-dots-bold" width="24" />
      </button>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
