import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import { AIDecompositionForm } from "@/components/ai/ai-decomposition-form"

export const metadata: Metadata = {
  title: "AI 任务分解 | AutoPlan",
  description: "使用 AI 分解复杂任务",
}

export default function AIDecomposePage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI 任务分解</h1>
          <p className="text-muted-foreground">使用 AI 将复杂任务分解为可管理的子任务</p>
        </div>

        <AIDecompositionForm />
      </div>
    </DashboardLayout>
  )
}
