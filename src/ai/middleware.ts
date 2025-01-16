/**
 * 中间件配置接口
 */
interface MiddlewareConfig {
  /** 请求超时时间（毫秒） */
  timeout?: number;
  /** 重试次数 */
  retries?: number;
}

/**
 * 创建请求中间件
 * @param {MiddlewareConfig} config - 中间件配置
 * @returns {Function} 中间件函数
 */
export const createMiddleware = (config: MiddlewareConfig = {}) => {
  const { timeout = 30000, retries = 3 } = config;

  /**
   * 请求中间件
   * @param {Request} request - 原始请求
   * @returns {Promise<Response>} 处理后的响应
   * @throws {Error} 当请求失败或超时时抛出错误
   */
  return async (request: Request): Promise<Response> => {
    let lastError: Error | null = null;

    for (let i = 0; i < retries; i++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(request, {
          signal: controller.signal,
        });

        clearTimeout(timeoutId);
        return response;
      } catch (error: unknown) {
        lastError = error as Error;
        if (error instanceof Error && error.name === "AbortError") {
          throw new Error("Request timeout");
        }
      }
    }

    throw lastError || new Error("Request failed");
  };
};
