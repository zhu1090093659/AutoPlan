import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, isWithinInterval } from "date-fns"
import { zhCN } from "date-fns/locale"
import type { Task } from "./types"

// 获取当前周的开始和结束日期
export function getCurrentWeekRange() {
  const now = new Date()
  return {
    start: startOfWeek(now, { locale: zhCN }),
    end: endOfWeek(now, { locale: zhCN }),
  }
}

// 获取当前月的开始和结束日期
export function getCurrentMonthRange() {
  const now = new Date()
  return {
    start: startOfMonth(now),
    end: endOfMonth(now),
  }
}

// 获取当前年的开始和结束日期
export function getCurrentYearRange() {
  const now = new Date()
  return {
    start: startOfYear(now),
    end: endOfYear(now),
  }
}

// 按日期范围过滤任务
export function filterTasksByDateRange(tasks: Task[], start: Date, end: Date) {
  return tasks.filter((task) => {
    const taskDate = new Date(task.dueDate)
    return isWithinInterval(taskDate, { start, end })
  })
}

// 获取当前周的任务
export function getWeeklyTasks(tasks: Task[]) {
  const { start, end } = getCurrentWeekRange()
  return filterTasksByDateRange(tasks, start, end)
}

// 获取当前月的任务
export function getMonthlyTasks(tasks: Task[]) {
  const { start, end } = getCurrentMonthRange()
  return filterTasksByDateRange(tasks, start, end)
}

// 获取当前年的任务
export function getYearlyTasks(tasks: Task[]) {
  const { start, end } = getCurrentYearRange()
  return filterTasksByDateRange(tasks, start, end)
}

// 计算任务统计数据
export function calculateTaskStats(tasks: Task[]) {
  const completed = tasks.filter((task) => task.status === "completed").length
  const inProgress = tasks.filter((task) => task.status === "in-progress").length
  const overdue = tasks.filter((task) => task.status === "overdue").length
  const pending = tasks.filter((task) => task.status === "pending").length

  const total = tasks.length
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

  // 计算平均任务时间（基于子任务的预估时间）
  const totalEstimatedHours = tasks.reduce((total, task) => {
    const subtaskHours = (task.subtasks || []).reduce((sum, subtask) => sum + subtask.estimatedTime, 0)
    return total + (subtaskHours || 3) // 如果没有子任务，默认为3小时
  }, 0)

  const avgTimePerTask = total > 0 ? (totalEstimatedHours / total).toFixed(1) : "0"

  // 计算生产力得分（基于完成率和逾期任务比例）
  const overdueRate = total > 0 ? overdue / total : 0
  const productivityScore = Math.max(0, Math.min(100, Math.round(completionRate - overdueRate * 30)))

  return {
    total,
    completed,
    inProgress,
    overdue,
    pending,
    completionRate,
    avgTimePerTask,
    productivityScore,
    totalEstimatedHours,
  }
}

// 按日期分组任务（用于图表）
export function groupTasksByDate(tasks: Task[], dateFormat: (date: Date) => string) {
  const grouped: Record<string, number> = {}

  tasks.forEach((task) => {
    const dateKey = dateFormat(new Date(task.dueDate))
    grouped[dateKey] = (grouped[dateKey] || 0) + 1
  })

  return grouped
}

// 按状态分组任务（用于图表）
export function groupTasksByStatus(tasks: Task[]) {
  return {
    completed: tasks.filter((task) => task.status === "completed").length,
    inProgress: tasks.filter((task) => task.status === "in-progress").length,
    overdue: tasks.filter((task) => task.status === "overdue").length,
    pending: tasks.filter((task) => task.status === "pending").length,
  }
}

