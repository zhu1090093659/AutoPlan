"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Clock,
  MoreVertical,
  Edit,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Calendar,
  GitBranch,
  GitCommit,
} from "lucide-react"
import type { Task } from "@/lib/types"
import { useTaskStore } from "@/lib/store"

interface TaskDetailProps {
  task: Task
}

export function TaskDetail({ task }: TaskDetailProps) {
  const [status, setStatus] = useState(task.status)
  const updateTask = useTaskStore((state) => state.updateTask)

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

  const handleStatusChange = (newStatus: string) => {
    updateTask(task.id, { status: newStatus })
    setStatus(newStatus)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-2xl">{task.title}</CardTitle>
          <div className="mt-2 flex items-center gap-2">
            {getStatusBadge(status)}
            <span className="text-sm text-muted-foreground">
              创建于 {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">更改状态</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleStatusChange("pending")}>待处理</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange("in-progress")}>进行中</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange("completed")}>已完成</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                删除
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">描述</h3>
          <p className="mt-1">{task.description}</p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>
              截止日期: {new Date(task.dueDate).toLocaleDateString()}{" "}
              {new Date(task.dueDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <GitBranch className="h-4 w-4 text-muted-foreground" />
            <span>分支: feature/task-{task.id}</span>
          </div>

          <div className="flex items-center gap-2">
            <GitCommit className="h-4 w-4 text-muted-foreground" />
            <span>提交: 3 次</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

