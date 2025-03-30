import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import { CalendarView } from "@/components/calendar/calendar-view"

export const metadata: Metadata = {
  title: "日历 | GitTodo AI",
  description: "在日历上查看您的任务",
}

export default function CalendarPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">日历</h1>
          <p className="text-muted-foreground">在日历上查看您的任务安排</p>
        </div>

        <CalendarView />
      </div>
    </DashboardLayout>
  )
}

