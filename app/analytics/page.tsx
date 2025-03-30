import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import { AnalyticsCharts } from "@/components/analytics/analytics-charts"
import { AnalyticsSummary } from "@/components/analytics/analytics-summary"

export const metadata: Metadata = {
  title: "分析 | AutoPlan",
  description: "分析您的任务执行情况",
}

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">分析</h1>
          <p className="text-muted-foreground">分析您的任务执行情况和效率</p>
        </div>

        <AnalyticsSummary />
        <AnalyticsCharts />
      </div>
    </DashboardLayout>
  )
}
