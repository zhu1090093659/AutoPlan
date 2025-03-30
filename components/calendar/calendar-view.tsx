"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { zhCN } from "date-fns/locale"
import { format } from "date-fns"
import type { Task } from "@/lib/types"
import { useTaskStore } from "@/lib/store"

export function CalendarView() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const tasks = useTaskStore((state) => state.tasks)

  // Generate task date map
  const tasksDateMap: Record<string, number> = {}
  tasks.forEach((task) => {
    const dateStr = format(new Date(task.dueDate), "yyyy-MM-dd")
    tasksDateMap[dateStr] = (tasksDateMap[dateStr] || 0) + 1
  })

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setDate(date)
      const dateStr = format(date, "yyyy-MM-dd")
      const tasksOnDate = tasks.filter((task) => {
        const taskDate = format(new Date(task.dueDate), "yyyy-MM-dd")
        return taskDate === dateStr
      })
      setSelectedTasks(tasksOnDate)
      setIsDialogOpen(true)
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            locale={zhCN}
            className="mx-auto"
            modifiers={{
              booked: (date) => {
                const dateStr = format(date, "yyyy-MM-dd")
                return dateStr in tasksDateMap
              },
            }}
            modifiersStyles={{
              booked: {
                fontWeight: "bold",
                backgroundColor: "hsl(var(--primary) / 0.1)",
                color: "hsl(var(--primary))",
              },
            }}
            components={{
              DayContent: (props) => {
                const dateStr = format(props.date, "yyyy-MM-dd")
                const taskCount = tasksDateMap[dateStr]

                return (
                  <div className="flex flex-col items-center justify-center">
                    <div>{props.date.getDate()}</div>
                    {taskCount && <Badge variant="outline" className="mt-1 h-1 w-1 rounded-full bg-primary p-0" />}
                  </div>
                )
              },
            }}
          />
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{date ? format(date, "yyyy年MM月dd日", { locale: zhCN }) : ""} 的任务</DialogTitle>
            <DialogDescription>该日期的所有任务</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {selectedTasks.length === 0 ? (
              <p className="text-center text-muted-foreground">该日期没有任务</p>
            ) : (
              selectedTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <div className="font-medium">{task.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {task.status === "completed" ? "已完成" : "进行中"} ·
                      {new Date(task.dueDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    查看
                  </Button>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

