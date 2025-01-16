<template>
<main :data-theme="theme">
  <AiWindow
    title="AI Chat Assistant"
    width="450px"
    height="700px"
    position="bottom-right"
    animation="scale"
    welcome-message="你好！我是你的AI助手，请问有什么我可以帮你的吗？"
  />
</main>
</template>

<script setup lang="ts">
import AiWindow from "@/pages/AiWindow/index.vue";
import { ref } from 'vue';

const theme = ref('light');
</script>