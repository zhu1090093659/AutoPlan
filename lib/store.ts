"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { v4 as uuidv4 } from "uuid"
import type { Task, Subtask } from "./types"
import { Achievement, achievementDefinitions } from "./achievements"
import { 
  checkTaskCompletionAchievements, 
  checkEfficiencyAchievements, 
  checkStreakAchievements,
  checkTaskManagementAchievements 
} from "./achievement-helpers"

interface TaskState {
  tasks: Task[]
  achievements: Achievement[]
  addTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => string
  updateTask: (id: string, task: Partial<Task>) => void
  deleteTask: (id: string) => void
  addSubtasks: (taskId: string, subtasks: Omit<Subtask, "id" | "taskId" | "createdAt" | "updatedAt">[]) => string[]
  updateSubtask: (id: string, subtask: Partial<Subtask>) => void
  deleteSubtask: (id: string) => void
  updateAchievementProgress: (id: string, progress: number) => void
  unlockAchievement: (id: string) => void
  getLatestUnlockedAchievement: () => Achievement | null
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      
      // Initialize achievements from definitions
      achievements: achievementDefinitions.map(achievement => ({
        ...achievement,
        progress: 0,
        unlocked: false
      })),

      addTask: (task) => {
        const id = uuidv4()
        const now = new Date().toISOString()

        const newTask: Task = {
          id,
          ...task,
          createdAt: now,
          updatedAt: now,
        }

        set((state) => ({
          tasks: [...state.tasks, newTask],
        }))

        return id
      },

      updateTask: (id, updatedTask) => {
        const tasks = get().tasks
        const task = tasks.find(t => t.id === id)
        
        if (!task) return
        
        // Check for task completion achievement
        if (updatedTask.status === "completed" && task.status !== "completed") {
          // Check if task was completed before deadline
          const dueDate = new Date(task.dueDate)
          const now = new Date()
          
          if (now < dueDate) {
            checkEfficiencyAchievements()
          }
          
          // Check other achievements
          checkTaskCompletionAchievements()
          checkStreakAchievements()
        }
        
        // Update the task
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updatedTask, updatedAt: new Date().toISOString() } : task,
          ),
        }))
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }))
      },

      addSubtasks: (taskId, subtasks) => {
        const now = new Date().toISOString()

        const newSubtasks = subtasks.map((subtask) => ({
          id: uuidv4(),
          taskId,
          ...subtask,
          status: subtask.status || "pending",
          createdAt: now,
          updatedAt: now,
        }))

        const updatedTasks = get().tasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                subtasks: [...(task.subtasks || []), ...newSubtasks],
                updatedAt: now,
              }
            : task
        )

        console.log("添加子任务前的任务列表:", get().tasks)
        console.log("添加的子任务:", newSubtasks)
        console.log("更新后的任务列表:", updatedTasks)

        set({ tasks: updatedTasks })

        console.log("状态更新后的任务列表:", get().tasks)
        
        // Check task management achievements
        checkTaskManagementAchievements()
        
        return newSubtasks.map(st => st.id)
      },

      updateSubtask: (id, updatedSubtask) => {
        set((state) => ({
          tasks: state.tasks.map((task) => {
            if (!task.subtasks) return task

            const subtaskIndex = task.subtasks.findIndex((st) => st.id === id)

            if (subtaskIndex === -1) return task

            const updatedSubtasks = [...task.subtasks]
            updatedSubtasks[subtaskIndex] = {
              ...updatedSubtasks[subtaskIndex],
              ...updatedSubtask,
              updatedAt: new Date().toISOString(),
            }

            return {
              ...task,
              subtasks: updatedSubtasks,
              updatedAt: new Date().toISOString(),
            }
          }),
        }))
      },

      deleteSubtask: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) => {
            if (!task.subtasks) return task

            const hasSubtask = task.subtasks.some((st) => st.id === id)

            if (!hasSubtask) return task

            return {
              ...task,
              subtasks: task.subtasks.filter((st) => st.id !== id),
              updatedAt: new Date().toISOString(),
            }
          }),
        }))
      },
      
      updateAchievementProgress: (id, progress) => {
        const achievements = get().achievements
        const achievementIndex = achievements.findIndex(a => a.id === id)
        
        if (achievementIndex === -1) return
        
        const achievement = achievements[achievementIndex]
        const newProgress = Math.min(achievement.maxProgress, progress)
        
        // Check if achievement is completed
        const unlocked = newProgress >= achievement.maxProgress && !achievement.unlocked
        
        // Update achievement
        const updatedAchievements = [...achievements]
        updatedAchievements[achievementIndex] = {
          ...achievement,
          progress: newProgress,
          unlocked: unlocked || achievement.unlocked,
          unlockedAt: unlocked ? new Date().toISOString() : achievement.unlockedAt
        }
        
        set({ achievements: updatedAchievements })
      },
      
      unlockAchievement: (id) => {
        const achievements = get().achievements
        const achievementIndex = achievements.findIndex(a => a.id === id)
        
        if (achievementIndex === -1) return
        
        const achievement = achievements[achievementIndex]
        
        // Skip if already unlocked
        if (achievement.unlocked) return
        
        // Update achievement
        const updatedAchievements = [...achievements]
        updatedAchievements[achievementIndex] = {
          ...achievement,
          progress: achievement.maxProgress,
          unlocked: true,
          unlockedAt: new Date().toISOString()
        }
        
        set({ achievements: updatedAchievements })
      },
      
      getLatestUnlockedAchievement: () => {
        const achievements = get().achievements
        const unlockedAchievements = achievements.filter(a => a.unlocked && a.unlockedAt)
        
        if (unlockedAchievements.length === 0) return null
        
        // Sort by unlocked time descending
        unlockedAchievements.sort((a, b) => {
          return new Date(b.unlockedAt!).getTime() - new Date(a.unlockedAt!).getTime()
        })
        
        return unlockedAchievements[0]
      }
    }),
    {
      name: "autoplan-storage",
    }
  )
)