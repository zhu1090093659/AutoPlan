import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import TaskList from "@/components/tasks/task-list"
import { TaskFilter } from "@/components/tasks/task-filter"
import { CreateTaskButton } from "@/components/tasks/create-task-button"

export const metadata: Metadata = {
  title: "任务 | AutoPlan",
  description: "查看和管理您的所有任务",
}

export default function TasksPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">任务</h1>
            <p className="text-muted-foreground">查看和管理您的所有任务</p>
          </div>
          <CreateTaskButton />
        </div>

        <TaskFilter />

        <TaskList />
      </div>
    </DashboardLayout>
  )
}
