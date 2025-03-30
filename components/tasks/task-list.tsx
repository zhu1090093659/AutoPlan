"use client"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { zhCN } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Clock, MoreVertical, Edit, Trash2, CheckCircle2, AlertCircle, ArrowUpRight } from "lucide-react"
import { useTaskStore } from "@/lib/store"
import type { Task } from "@/lib/types"

interface TaskListProps {
  tasks?: Task[]
}

export default function TaskList({ tasks }: TaskListProps) {
  const allTasks = useTaskStore((state) => state.tasks)
  const updateTask = useTaskStore((state) => state.updateTask)
  const deleteTask = useTaskStore((state) => state.deleteTask)

  // 使用传入的任务列表或者从store获取所有任务
  const displayTasks = tasks || allTasks

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            已完成
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
            <Clock className="mr-1 h-3 w-3" />
            进行中
          </Badge>
        )
      case "overdue":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
            <AlertCircle className="mr-1 h-3 w-3" />
            已逾期
          </Badge>
        )
      default:
        return <Badge variant="outline">待处理</Badge>
    }
  }

  const toggleTaskStatus = (id: string) => {
    const task = displayTasks.find((task) => task.id === id)
    if (task) {
      updateTask(id, {
        status: task.status === "completed" ? "in-progress" : "completed",
      })
    }
  }

  const handleDeleteTask = (id: string) => {
    if (confirm("确定要删除这个任务吗？此操作不可撤销。")) {
      deleteTask(id)
    }
  }

  if (displayTasks.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <h3 className="text-lg font-medium">没有任务</h3>
        <p className="mt-1 text-sm text-muted-foreground">您当前没有任务，可以点击"新建任务"按钮创建新任务。</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {displayTasks.map((task) => (
        <Card key={task.id}>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-2">
                <Checkbox
                  checked={task.status === "completed"}
                  onCheckedChange={() => toggleTaskStatus(task.id)}
                  className="mt-1"
                />
                <div>
                  <CardTitle className={task.status === "completed" ? "line-through text-muted-foreground" : ""}>
                    {task.title}
                  </CardTitle>
                  <CardDescription className="mt-1">{task.description}</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(task.status)}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      编辑
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteTask(task.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      删除
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>
                截止日期: {new Date(task.dueDate).toLocaleDateString()}{" "}
                {new Date(task.dueDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                {task.status === "overdue" && " (已逾期)"}
              </span>
            </div>
            {task.subtasks && (
              <div className="mt-2 text-sm">
                <span className="text-muted-foreground">子任务: {task.subtasks.length} 个</span>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between pt-0">
            <div className="text-xs text-muted-foreground">
              创建于 {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true, locale: zhCN })}
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/tasks/${task.id}`}>
                <ArrowUpRight className="mr-1 h-4 w-4" />
                查看详情
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

