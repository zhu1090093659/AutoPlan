"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { v4 as uuidv4 } from "uuid"
import type { Task, Subtask } from "./types"

interface TaskState {
  tasks: Task[]
  addTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => string
  updateTask: (id: string, task: Partial<Task>) => void
  deleteTask: (id: string) => void
  addSubtasks: (taskId: string, subtasks: Omit<Subtask, "id" | "taskId" | "createdAt" | "updatedAt">[]) => string[]
  updateSubtask: (id: string, subtask: Partial<Subtask>) => void
  deleteSubtask: (id: string) => void
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],

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
    }),
    {
      name: "gittodo-storage",
    },
  ),
)
