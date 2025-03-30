"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTaskStore } from "@/lib/store"
import {
  getWeeklyTasks,
  getMonthlyTasks,
  getYearlyTasks,
  calculateTaskStats,
  groupTasksByStatus,
} from "@/lib/date-utils"

export function AnalyticsCharts() {
  const tasks = useTaskStore((state) => state.tasks)
  const [activeTab, setActiveTab] = useState("weekly")

  // 根据当前选择的时间范围获取任务
  const getFilteredTasks = () => {
    switch (activeTab) {
      case "weekly":
        return getWeeklyTasks(tasks)
      case "monthly":
        return getMonthlyTasks(tasks)
      case "yearly":
        return getYearlyTasks(tasks)
      default:
        return tasks
    }
  }

  // 获取当前过滤后的任务
  const filteredTasks = getFilteredTasks()

  // 计算统计数据
  const stats = calculateTaskStats(filteredTasks)

  // 获取任务状态分布
  const statusDistribution = groupTasksByStatus(filteredTasks)

  // 获取时间范围描述
  const getTimeRangeDescription = () => {
    switch (activeTab) {
      case "weekly":
        return "本周任务完成情况"
      case "monthly":
        return "本月任务完成情况"
      case "yearly":
        return "本年任务完成情况"
      default:
        return "任务完成情况"
    }
  }

  return (
    <Tabs defaultValue="weekly" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList>
        <TabsTrigger value="weekly">每周</TabsTrigger>
        <TabsTrigger value="monthly">每月</TabsTrigger>
        <TabsTrigger value="yearly">每年</TabsTrigger>
      </TabsList>

      <TabsContent value="weekly" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>任务完成率</CardTitle>
              <CardDescription>{getTimeRangeDescription()}</CardDescription>
            </CardHeader>
            <CardContent className="h-[200px]">
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold">{stats.completionRate}%</div>
                  <div className="text-sm text-muted-foreground">完成率</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>任务分布</CardTitle>
              <CardDescription>按状态分类的任务数量</CardDescription>
            </CardHeader>
            <CardContent className="h-[200px]">
              <div className="flex h-full items-center justify-center">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span>进行中: {statusDistribution.inProgress}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span>已完成: {statusDistribution.completed}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <span>已逾期: {statusDistribution.overdue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-gray-500"></div>
                    <span>待处理: {statusDistribution.pending}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>工作时间</CardTitle>
              <CardDescription>预估工作时间</CardDescription>
            </CardHeader>
            <CardContent className="h-[200px]">
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold">{stats.totalEstimatedHours}</div>
                  <div className="text-sm text-muted-foreground">
                    {activeTab === "weekly" ? "小时/周" : activeTab === "monthly" ? "小时/月" : "小时/年"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>任务完成趋势</CardTitle>
            <CardDescription>
              {activeTab === "weekly"
                ? "过去 7 天的任务完成情况"
                : activeTab === "monthly"
                  ? "本月的任务完成情况"
                  : "本年的任务完成情况"}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {stats.completed} / {stats.total}
                </div>
                <div className="text-sm text-muted-foreground">已完成 / 总任务</div>
                <div className="mt-4 text-sm text-muted-foreground">
                  {filteredTasks.length === 0
                    ? "该时间段内没有任务"
                    : `该时间段内有 ${filteredTasks.length} 个任务，${stats.completed} 个已完成`}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="monthly" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>任务完成率</CardTitle>
              <CardDescription>{getTimeRangeDescription()}</CardDescription>
            </CardHeader>
            <CardContent className="h-[200px]">
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold">{stats.completionRate}%</div>
                  <div className="text-sm text-muted-foreground">完成率</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>任务分布</CardTitle>
              <CardDescription>按状态分类的任务数量</CardDescription>
            </CardHeader>
            <CardContent className="h-[200px]">
              <div className="flex h-full items-center justify-center">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span>进行中: {statusDistribution.inProgress}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span>已完成: {statusDistribution.completed}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <span>已逾期: {statusDistribution.overdue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-gray-500"></div>
                    <span>待处理: {statusDistribution.pending}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>平均任务时间</CardTitle>
              <CardDescription>每个任务的平均预估时间</CardDescription>
            </CardHeader>
            <CardContent className="h-[200px]">
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold">{stats.avgTimePerTask}</div>
                  <div className="text-sm text-muted-foreground">小时/任务</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>月度任务统计</CardTitle>
            <CardDescription>本月任务完成情况</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {stats.completed} / {stats.total}
                </div>
                <div className="text-sm text-muted-foreground">已完成 / 总任务</div>
                <div className="mt-4 text-sm text-muted-foreground">
                  {filteredTasks.length === 0
                    ? "本月没有任务"
                    : `本月有 ${filteredTasks.length} 个任务，${stats.completed} 个已完成`}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">生产力得分: {stats.productivityScore}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="yearly" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>年度完成率</CardTitle>
              <CardDescription>{getTimeRangeDescription()}</CardDescription>
            </CardHeader>
            <CardContent className="h-[200px]">
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold">{stats.completionRate}%</div>
                  <div className="text-sm text-muted-foreground">完成率</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>任务分布</CardTitle>
              <CardDescription>按状态分类的任务数量</CardDescription>
            </CardHeader>
            <CardContent className="h-[200px]">
              <div className="flex h-full items-center justify-center">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span>进行中: {statusDistribution.inProgress}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span>已完成: {statusDistribution.completed}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <span>已逾期: {statusDistribution.overdue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-gray-500"></div>
                    <span>待处理: {statusDistribution.pending}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>总工作时间</CardTitle>
              <CardDescription>年度总预估工作时间</CardDescription>
            </CardHeader>
            <CardContent className="h-[200px]">
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold">{stats.totalEstimatedHours}</div>
                  <div className="text-sm text-muted-foreground">小时/年</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>年度任务统计</CardTitle>
            <CardDescription>本年任务完成情况</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {stats.completed} / {stats.total}
                </div>
                <div className="text-sm text-muted-foreground">已完成 / 总任务</div>
                <div className="mt-4 text-sm text-muted-foreground">
                  {filteredTasks.length === 0
                    ? "本年没有任务"
                    : `本年有 ${filteredTasks.length} 个任务，${stats.completed} 个已完成`}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">年度生产力得分: {stats.productivityScore}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

