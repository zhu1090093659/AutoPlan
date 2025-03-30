"use client"

import { useEffect, useState } from "react"
import { useParams, notFound } from "next/navigation"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import { TaskDetail } from "@/components/tasks/task-detail"
import { SubtaskList } from "@/components/tasks/subtask-list"
import { useTaskStore } from "@/lib/store"
import type { Task } from "@/lib/types"

export default function TaskDetailPage() {
  const params = useParams()
  const tasks = useTaskStore((state) => state.tasks)
  const [task, setTask] = useState<Task | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      const foundTask = tasks.find((t) => t.id === params.id)
      setTask(foundTask || null)
      setLoading(false)
    }
  }, [params.id, tasks])

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">加载中...</h1>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!task) {
    notFound()
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <TaskDetail task={task} />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">子任务</h2>
          <SubtaskList taskId={task.id} />
        </div>
      </div>
    </DashboardLayout>
  )
}

