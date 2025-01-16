export interface WindowConfig {
  title?: string;
  width?: string;
  height?: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  animation?: string;
  isOpen?: boolean;
  welcomeMessage?: string;
}

// 默认欢迎消息
const DEFAULT_WELCOME_MESSAGE = "您好！我是AI助手，有什么可以帮您的吗？";

export const defaultConfig = {
  title: "AI Chat",
  width: "380px",
  height: "600px",
  position: "bottom-right",
  animation: "scale",
  isOpen: false,
  welcomeMessage: DEFAULT_WELCOME_MESSAGE,
} as const;

// 动画配置映射
const animationMap = {
  bounce: { enter: "bounce", leave: "fade", duration: 300 },
  slide: { enter: "slide-up", leave: "slide-down", duration: 400 },
  scale: { enter: "scale-up", leave: "scale-down", duration: 300 },
  fade: { enter: "fade-in", leave: "fade-out", duration: 200 },
} as const;

export type AnimationType = keyof typeof animationMap;
export { animationMap };
