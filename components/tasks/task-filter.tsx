"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Filter, Search } from "lucide-react"

export function TaskFilter() {
  const [statusFilter, setStatusFilter] = useState<string[]>([])

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:w-64">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder="搜索任务..." className="w-full pl-8" />
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9">
              <Filter className="mr-2 h-4 w-4" />
              筛选
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>状态筛选</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={statusFilter.includes("pending")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setStatusFilter([...statusFilter, "pending"])
                } else {
                  setStatusFilter(statusFilter.filter((s) => s !== "pending"))
                }
              }}
            >
              待处理
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={statusFilter.includes("in-progress")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setStatusFilter([...statusFilter, "in-progress"])
                } else {
                  setStatusFilter(statusFilter.filter((s) => s !== "in-progress"))
                }
              }}
            >
              进行中
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={statusFilter.includes("completed")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setStatusFilter([...statusFilter, "completed"])
                } else {
                  setStatusFilter(statusFilter.filter((s) => s !== "completed"))
                }
              }}
            >
              已完成
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={statusFilter.includes("overdue")}
              onCheckedChange={(checked) => {
                if (checked) {
                  setStatusFilter([...statusFilter, "overdue"])
                } else {
                  setStatusFilter(statusFilter.filter((s) => s !== "overdue"))
                }
              }}
            >
              已逾期
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" size="sm" className="h-9">
          最近更新
        </Button>
      </div>
    </div>
  )
}

