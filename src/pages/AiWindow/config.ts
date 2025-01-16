/**
 * 窗口配置
 * @description 定义了 AI 聊天窗口的基本配置
 */
export const windowConfig = {
  /** 默认窗口标题 */
  title: "AI 助手",

  /** 默认欢迎消息 */
  welcomeMessage: "你好！我是 AI 助手，有什么我可以帮你的吗？",

  /** 窗口尺寸配置 */
  size: {
    width: 400,
    height: 600,
    minWidth: 320,
    minHeight: 400,
  },

  /** 动画持续时间（毫秒） */
  animationDuration: 300,
} as const;

/**
 * 主题配置
 * @description 定义了支持的主题类型
 */
export type Theme = "light" | "dark";

/**
 * 默认主题
 * @description 根据系统偏好设置默认主题
 */
export const defaultTheme: Theme = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches
  ? "dark"
  : "light";

/**
 * 动画类型
 */
export type AnimationType = "bounce" | "slide" | "scale" | "fade";

/**
 * 动画配置映射
 */
export const animationMap = {
  bounce: { enter: "bounce", leave: "fade", duration: 300 },
  slide: { enter: "slide-up", leave: "slide-down", duration: 400 },
  scale: { enter: "scale-up", leave: "scale-down", duration: 300 },
  fade: { enter: "fade-in", leave: "fade-out", duration: 200 },
} as const;

/**
 * 窗口配置接口
 */
export interface WindowConfig {
  title?: string;
  width?: string;
  height?: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  animation?: AnimationType;
  isOpen?: boolean;
  welcomeMessage?: string;
}

/**
 * 默认配置
 */
export const defaultConfig: Required<WindowConfig> = {
  title: "AI Chat",
  width: "380px",
  height: "600px",
  position: "bottom-right",
  animation: "scale",
  isOpen: false,
  welcomeMessage: windowConfig.welcomeMessage,
};

/**
 * 图标配置
 * @description 定义了应用中使用的所有图标
 */
export const iconConfig = {
  /** 窗口图标 */
  window: {
    close: "solar:close-circle-bold",
    minimize: "solar:minimize-square-bold",
    bot: "solar:bot-bold",
  },

  /** 消息图标 */
  message: {
    bot: "fluent:bot-24-filled",
    user: "solar:user-bold",
    copy: "solar:copy-linear",
    loading: "svg-spinners:pulse-3",
  },

  /** 工具栏图标 */
  toolbar: {
    send: "solar:arrow-up-linear",
    emoji: "solar:emoji-funny-square-linear",
    file: "solar:file-text-linear",
    image: "solar:gallery-linear",
  },
} as const;
