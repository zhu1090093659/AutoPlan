import { useTaskStore } from "./store";
import { Achievement, AchievementCategory } from "./achievements";

// Helper function to check and update task completion achievements
export function checkTaskCompletionAchievements() {
  const { tasks, updateAchievementProgress } = useTaskStore.getState();
  
  // Count completed tasks
  const completedTasks = tasks.filter(t => t.status === "completed").length;
  
  // Update achievements
  updateAchievementProgress("task_complete_1", completedTasks);
  updateAchievementProgress("task_complete_10", completedTasks);
  updateAchievementProgress("task_complete_50", completedTasks);
}

// Helper function to check and update efficiency achievements
export function checkEfficiencyAchievements() {
  const { tasks, updateAchievementProgress } = useTaskStore.getState();
  
  // Count tasks completed before deadline
  const earlyTasks = tasks.filter(t => {
    if (t.status !== "completed" || !t.updatedAt) return false;
    return new Date(t.updatedAt) < new Date(t.dueDate);
  }).length;
  
  // Update achievements
  updateAchievementProgress("efficiency_1", Math.min(1, earlyTasks));
  updateAchievementProgress("efficiency_5", earlyTasks);
  updateAchievementProgress("efficiency_20", earlyTasks);
}

// Helper function to check and update streak achievements
export function checkStreakAchievements() {
  const { tasks, updateAchievementProgress } = useTaskStore.getState();
  
  // This is a simplified implementation
  // A real implementation would track daily task completions
  
  // Get unique dates when tasks were completed
  const completedDates = tasks
    .filter(t => t.status === "completed" && t.updatedAt)
    .map(t => new Date(t.updatedAt!).toISOString().split('T')[0])
    .filter((value, index, self) => self.indexOf(value) === index);
    
  // Sort dates
  completedDates.sort();
  
  // Calculate longest streak (simplified)
  let currentStreak = 1;
  let maxStreak = 1;
  
  for (let i = 1; i < completedDates.length; i++) {
    const prevDate = new Date(completedDates[i-1]);
    const currDate = new Date(completedDates[i]);
    
    // Check if dates are consecutive
    const diffTime = currDate.getTime() - prevDate.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    
    if (diffDays === 1) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else if (diffDays > 1) {
      currentStreak = 1;
    }
  }
  
  // Update achievements
  updateAchievementProgress("streak_3", maxStreak);
  updateAchievementProgress("streak_7", maxStreak);
  updateAchievementProgress("streak_30", maxStreak);
}

// Helper function to check and update task management achievements
export function checkTaskManagementAchievements() {
  const { tasks, updateAchievementProgress } = useTaskStore.getState();
  
  // Count total subtasks
  const totalSubtasks = tasks.reduce((count, task) => {
    return count + (task.subtasks?.length || 0);
  }, 0);
  
  // Update achievements
  updateAchievementProgress("subtask_create_5", totalSubtasks);
  updateAchievementProgress("subtask_create_20", totalSubtasks);
  updateAchievementProgress("subtask_create_100", totalSubtasks);
}

// Helper function to track AI usage achievements
export function trackAIUsageAchievement() {
  const { updateAchievementProgress } = useTaskStore.getState();
  
  // Get or initialize AI usage count from localStorage
  const aiUsageCount = localStorage.getItem('aiUsageCount') ? 
    parseInt(localStorage.getItem('aiUsageCount')!) + 1 : 1;
  
  // Update localStorage
  localStorage.setItem('aiUsageCount', aiUsageCount.toString());
  
  // Update achievements
  updateAchievementProgress("ai_usage_1", Math.min(1, aiUsageCount));
  updateAchievementProgress("ai_usage_10", Math.min(10, aiUsageCount));
  updateAchievementProgress("ai_usage_50", Math.min(50, aiUsageCount));
  
  return aiUsageCount;
}

// Function to get achievement stats
export function getAchievementStats() {
  const { achievements } = useTaskStore.getState();
  
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const progressPercentage = Math.round((unlockedCount / totalCount) * 100);
  
  return {
    unlockedCount,
    totalCount,
    progressPercentage
  };
}

// Function to calculate user level based on achievements
export function calculateUserLevel() {
  const { achievements } = useTaskStore.getState();
  
  // Calculate total achievement points
  // Bronze = 1 point, Silver = 2 points, Gold = 3 points
  let points = 0;
  
  achievements.forEach(achievement => {
    if (!achievement.unlocked) return;
    
    switch (achievement.level) {
      case "bronze":
        points += 1;
        break;
      case "silver":
        points += 2;
        break;
      case "gold":
        points += 3;
        break;
    }
  });
  
  // Calculate level - simple formula
  const level = Math.floor(points / 3) + 1;
  
  return {
    level,
    points,
    nextLevelPoints: level * 3,
    percentage: Math.min(100, Math.round((points % 3) * 33.33))
  };
}