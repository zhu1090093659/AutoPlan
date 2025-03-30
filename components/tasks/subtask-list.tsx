"use client"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle2 } from "lucide-react"
import { useTaskStore } from "@/lib/store"

interface SubtaskListProps {
  taskId: string
}

export function SubtaskList({ taskId }: SubtaskListProps) {
  const tasks = useTaskStore((state) => state.tasks)
  const updateSubtask = useTaskStore((state) => state.updateSubtask)

  const task = tasks.find((t) => t.id === taskId)
  const subtasks = task?.subtasks || []

  const toggleSubtaskStatus = (id: string) => {
    const subtask = subtasks.find((st) => st.id === id)
    if (subtask) {
      updateSubtask(id, {
        status: subtask.status === "completed" ? "pending" : "completed",
      })
    }
  }

  if (subtasks.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <p className="text-center text-muted-foreground">该任务还没有子任务</p>
          <Button className="mt-4">使用 AI 分解任务</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {subtasks.map((subtask) => (
        <Card key={subtask.id}>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-2">
                <Checkbox
                  checked={subtask.status === "completed"}
                  onCheckedChange={() => toggleSubtaskStatus(subtask.id)}
                  className="mt-1"
                />
                <CardTitle className={subtask.status === "completed" ? "line-through text-muted-foreground" : ""}>
                  {subtask.title}
                </CardTitle>
              </div>
              <div className="flex items-center gap-2">
                {subtask.status === "completed" ? (
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                  >
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    已完成
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                    <Clock className="mr-1 h-3 w-3" />
                    进行中
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="steps">
                <AccordionTrigger>执行步骤</AccordionTrigger>
                <AccordionContent>
                  <ul className="ml-6 list-disc space-y-2">
                    {subtask.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
          <CardFooter className="flex justify-between pt-0">
            <div className="text-sm text-muted-foreground">预估时间: {subtask.estimatedTime} 小时</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

