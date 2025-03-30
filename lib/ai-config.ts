// AI配置存储
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AIConfig {
  baseURL: string
  apiKey: string
  retryCount: number
  modelName: string
  updateBaseURL: (url: string) => void
  updateApiKey: (key: string) => void
  updateRetryCount: (count: number) => void
  updateModelName: (model: string) => void
  resetToDefaults: () => void
}

// 默认配置
const DEFAULT_CONFIG = {
  baseURL: "https://oneapi.deepwisdom.ai/v1",
  apiKey: "sk-wkrOfwj4YxzAsqWa577e28702a05495c921414157e9c4c27",
  retryCount: 3,
  modelName: "gpt-4o",
}

export const useAIConfig = create<AIConfig>()(
  persist(
    (set) => ({
      baseURL: DEFAULT_CONFIG.baseURL,
      apiKey: DEFAULT_CONFIG.apiKey,
      retryCount: DEFAULT_CONFIG.retryCount,
      modelName: DEFAULT_CONFIG.modelName,

      updateBaseURL: (url: string) => set({ baseURL: url }),
      updateApiKey: (key: string) => set({ apiKey: key }),
      updateRetryCount: (count: number) => set({ retryCount: count }),
      updateModelName: (model: string) => set({ modelName: model }),
      resetToDefaults: () => set(DEFAULT_CONFIG),
    }),
    {
      name: "gittodo-ai-config",
    },
  ),
)

