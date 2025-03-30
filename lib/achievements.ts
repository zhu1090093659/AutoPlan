export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  level: AchievementLevel;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  unlockedAt?: string;
}

export enum AchievementCategory {
  TaskCompletion = "task_completion",
  Streak = "streak",
  Efficiency = "efficiency",
  AIUsage = "ai_usage",
  TaskManagement = "task_management"
}

export enum AchievementLevel {
  Bronze = "bronze",
  Silver = "silver",
  Gold = "gold"
}

// Achievement definitions
export const achievementDefinitions: Omit<Achievement, "progress" | "unlocked" | "unlockedAt">[] = [
  // Task Completion Achievements
  {
    id: "task_complete_1",
    title: "初次完成",
    description: "完成你的第一个任务",
    icon: "CheckCircle",
    category: AchievementCategory.TaskCompletion,
    level: AchievementLevel.Bronze,
    maxProgress: 1
  },
  {
    id: "task_complete_10",
    title: "效率专家",
    description: "完成10个任务",
    icon: "CheckCircle",
    category: AchievementCategory.TaskCompletion,
    level: AchievementLevel.Silver,
    maxProgress: 10
  },
  {
    id: "task_complete_50",
    title: "任务大师",
    description: "完成50个任务",
    icon: "CheckCircle",
    category: AchievementCategory.TaskCompletion,
    level: AchievementLevel.Gold,
    maxProgress: 50
  },

  // Streak Achievements
  {
    id: "streak_3",
    title: "坚持就是胜利",
    description: "连续3天完成任务",
    icon: "Flame",
    category: AchievementCategory.Streak,
    level: AchievementLevel.Bronze,
    maxProgress: 3
  },
  {
    id: "streak_7",
    title: "一周无间断",
    description: "连续7天完成任务",
    icon: "Flame",
    category: AchievementCategory.Streak,
    level: AchievementLevel.Silver,
    maxProgress: 7
  },
  {
    id: "streak_30",
    title: "月度冠军",
    description: "连续30天完成任务",
    icon: "Flame",
    category: AchievementCategory.Streak,
    level: AchievementLevel.Gold,
    maxProgress: 30
  },

  // Efficiency Achievements
  {
    id: "efficiency_1",
    title: "提前完成",
    description: "在截止日期前完成任务",
    icon: "Clock",
    category: AchievementCategory.Efficiency,
    level: AchievementLevel.Bronze,
    maxProgress: 1
  },
  {
    id: "efficiency_5",
    title: "提前规划者",
    description: "在截止日期前至少一天完成5个任务",
    icon: "Clock",
    category: AchievementCategory.Efficiency,
    level: AchievementLevel.Silver,
    maxProgress: 5
  },
  {
    id: "efficiency_20",
    title: "时间管理大师",
    description: "在截止日期前至少一天完成20个任务",
    icon: "Clock",
    category: AchievementCategory.Efficiency,
    level: AchievementLevel.Gold,
    maxProgress: 20
  },

  // AI Usage Achievements
  {
    id: "ai_usage_1",
    title: "AI初体验",
    description: "使用AI功能分解任务",
    icon: "Sparkles",
    category: AchievementCategory.AIUsage,
    level: AchievementLevel.Bronze,
    maxProgress: 1
  },
  {
    id: "ai_usage_10",
    title: "AI助手",
    description: "使用AI功能分解10个任务",
    icon: "Sparkles",
    category: AchievementCategory.AIUsage,
    level: AchievementLevel.Silver,
    maxProgress: 10
  },
  {
    id: "ai_usage_50",
    title: "AI专家",
    description: "使用AI功能分解50个任务",
    icon: "Sparkles",
    category: AchievementCategory.AIUsage,
    level: AchievementLevel.Gold,
    maxProgress: 50
  },

  // Task Management Achievements
  {
    id: "subtask_create_5",
    title: "任务分解者",
    description: "创建5个子任务",
    icon: "GitBranch",
    category: AchievementCategory.TaskManagement,
    level: AchievementLevel.Bronze,
    maxProgress: 5
  },
  {
    id: "subtask_create_20",
    title: "组织专家",
    description: "创建20个子任务",
    icon: "GitBranch",
    category: AchievementCategory.TaskManagement,
    level: AchievementLevel.Silver,
    maxProgress: 20
  },
  {
    id: "subtask_create_100",
    title: "项目经理",
    description: "创建100个子任务",
    icon: "GitBranch",
    category: AchievementCategory.TaskManagement,
    level: AchievementLevel.Gold,
    maxProgress: 100
  },
]