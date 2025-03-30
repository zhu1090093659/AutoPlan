"use client"

import DashboardLayout from "@/components/dashboard/dashboard-layout"
import TaskList from "@/components/tasks/task-list"
import { TaskStats } from "@/components/dashboard/task-stats"
import { useTaskStore } from "@/lib/store"

export default function DashboardPage() {
  const tasks = useTaskStore((state) => state.tasks)

  // 只显示未完成的任务
  const pendingTasks = tasks.filter((task) => task.status !== "completed")

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">仪表盘</h1>
          <p className="text-muted-foreground">管理您的任务，跟踪进度，提高效率</p>
        </div>

        <TaskStats />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">待办任务</h2>
          {pendingTasks.length === 0 ? (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <h3 className="text-lg font-medium">没有待办任务</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                您当前没有待处理的任务，可以点击"新建任务"按钮创建新任务。
              </p>
            </div>
          ) : (
            <TaskList tasks={pendingTasks} />
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

