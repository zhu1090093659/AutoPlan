"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import { CalendarIcon, Plus, Sparkles, Loader2 } from "lucide-react"
import { useTaskStore } from "@/lib/store"
import { useToast } from "@/components/ui/use-toast"
import type { Subtask } from "@/lib/types"

export function CreateTaskButton() {
  const router = useRouter()
  const { toast } = useToast()
  const { addTask, addSubtasks } = useTaskStore()

  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [hour, setHour] = useState("12")
  const [minute, setMinute] = useState("00")

  // AI decomposition states
  const [aiTaskDescription, setAiTaskDescription] = useState("")
  const [isDecomposing, setIsDecomposing] = useState(false)
  const [subtasks, setSubtasks] = useState<Omit<Subtask, "id" | "taskId" | "createdAt" | "updatedAt">[]>([])

  const handleBasicSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      toast({
        title: "请输入任务标题",
        variant: "destructive",
      })
      return
    }

    if (!date) {
      toast({
        title: "请选择截止日期",
        variant: "destructive",
      })
      return
    }

    // Combine date and time
    const dueDate = new Date(date)
    dueDate.setHours(Number.parseInt(hour), Number.parseInt(minute))

    // Add task to store
    const taskId = addTask({
      title,
      description,
      status: "pending",
      dueDate: dueDate.toISOString(),
    })

    toast({
      title: "任务创建成功",
      description: "新任务已添加到您的任务列表中",
    })

    setOpen(false)
    resetForm()
    router.refresh()
  }

  const handleAIDecompose = async () => {
    if (!aiTaskDescription.trim()) {
      toast({
        title: "请输入任务描述",
        description: "请提供详细的任务描述，以便 AI 更好地分解任务。",
        variant: "destructive",
      })
      return
    }

    setIsDecomposing(true)

    try {
      const response = await fetch("/api/ai/decompose", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: aiTaskDescription }),
      })

      if (!response.ok) {
        throw new Error("AI 分解任务失败")
      }

      const data = await response.json()
      setSubtasks(data.subtasks)

      // Auto-fill the title if it's empty
      if (!title.trim()) {
        setTitle(aiTaskDescription.split("\n")[0].substring(0, 50))
      }

      toast({
        title: "任务分解成功",
        description: `AI 已将任务分解为 ${data.subtasks.length} 个子任务。`,
      })

      // Switch to review tab
      setActiveTab("review")
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "分解任务失败",
        description: "请稍后重试或尝试提供更详细的任务描述。",
        variant: "destructive",
      })
    } finally {
      setIsDecomposing(false)
    }
  }

  const handleAISubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      toast({
        title: "请输入任务标题",
        variant: "destructive",
      })
      return
    }

    if (!date) {
      toast({
        title: "请选择截止日期",
        variant: "destructive",
      })
      return
    }

    if (subtasks.length === 0) {
      toast({
        title: "请先使用 AI 分解任务",
        variant: "destructive",
      })
      return
    }

    // Combine date and time
    const dueDate = new Date(date)
    dueDate.setHours(Number.parseInt(hour), Number.parseInt(minute))

    // Add task to store
    const taskId = addTask({
      title,
      description: aiTaskDescription,
      status: "pending",
      dueDate: dueDate.toISOString(),
    })

    // Add subtasks
    addSubtasks(taskId, subtasks)

    toast({
      title: "任务创建成功",
      description: `任务及 ${subtasks.length} 个子任务已添加到您的任务列表中`,
    })

    setOpen(false)
    resetForm()
    router.refresh()
  }

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setDate(undefined)
    setHour("12")
    setMinute("00")
    setAiTaskDescription("")
    setSubtasks([])
    setActiveTab("basic")
  }

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"))
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"))

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen)
        if (!newOpen) resetForm()
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          新建任务
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">基本信息</TabsTrigger>
            <TabsTrigger value="ai">AI 分解</TabsTrigger>
            <TabsTrigger value="review" disabled={subtasks.length === 0}>
              预览
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <form onSubmit={handleBasicSubmit}>
              <DialogHeader>
                <DialogTitle>创建新任务</DialogTitle>
                <DialogDescription>添加新任务的详细信息，完成后点击保存。</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">任务标题</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="输入任务标题"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">任务描述</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="输入任务描述"
                    className="min-h-[100px]"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>截止日期和时间</Label>
                  <div className="flex gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP", { locale: zhCN }) : "选择日期"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus locale={zhCN} />
                      </PopoverContent>
                    </Popover>

                    <Select value={hour} onValueChange={setHour}>
                      <SelectTrigger className="w-[80px]">
                        <SelectValue placeholder="时" />
                      </SelectTrigger>
                      <SelectContent>
                        {hours.map((h) => (
                          <SelectItem key={h} value={h}>
                            {h}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <span className="flex items-center">:</span>

                    <Select value={minute} onValueChange={setMinute}>
                      <SelectTrigger className="w-[80px]">
                        <SelectValue placeholder="分" />
                      </SelectTrigger>
                      <SelectContent>
                        {minutes.map((m) => (
                          <SelectItem key={m} value={m}>
                            {m}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setActiveTab("ai")}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  使用 AI 分解
                </Button>
                <Button type="submit">保存</Button>
              </DialogFooter>
            </form>
          </TabsContent>

          <TabsContent value="ai">
            <DialogHeader>
              <DialogTitle>AI 任务分解</DialogTitle>
              <DialogDescription>使用 AI 将复杂任务分解为可管理的子任务</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="ai-task">任务描述</Label>
                <Textarea
                  id="ai-task"
                  value={aiTaskDescription}
                  onChange={(e) => setAiTaskDescription(e.target.value)}
                  placeholder="详细描述您的任务，AI 将帮助您分解..."
                  className="min-h-[150px]"
                />
              </div>

              <Button type="button" onClick={handleAIDecompose} disabled={isDecomposing || !aiTaskDescription.trim()}>
                {isDecomposing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    正在分解任务...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    使用 AI 分解任务
                  </>
                )}
              </Button>

              <div className="grid gap-2">
                <Label htmlFor="title">任务标题</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="输入任务标题" />
              </div>

              <div className="grid gap-2">
                <Label>截止日期和时间</Label>
                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP", { locale: zhCN }) : "选择日期"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus locale={zhCN} />
                    </PopoverContent>
                  </Popover>

                  <Select value={hour} onValueChange={setHour}>
                    <SelectTrigger className="w-[80px]">
                      <SelectValue placeholder="时" />
                    </SelectTrigger>
                    <SelectContent>
                      {hours.map((h) => (
                        <SelectItem key={h} value={h}>
                          {h}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <span className="flex items-center">:</span>

                  <Select value={minute} onValueChange={setMinute}>
                    <SelectTrigger className="w-[80px]">
                      <SelectValue placeholder="分" />
                    </SelectTrigger>
                    <SelectContent>
                      {minutes.map((m) => (
                        <SelectItem key={m} value={m}>
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setActiveTab("basic")}>
                返回
              </Button>
              {subtasks.length > 0 && (
                <Button type="button" onClick={() => setActiveTab("review")}>
                  预览子任务
                </Button>
              )}
            </DialogFooter>
          </TabsContent>

          <TabsContent value="review">
            <form onSubmit={handleAISubmit}>
              <DialogHeader>
                <DialogTitle>预览任务</DialogTitle>
                <DialogDescription>查看 AI 分解的子任务并保存</DialogDescription>
              </DialogHeader>
              <div className="max-h-[300px] overflow-y-auto py-4">
                <div className="mb-4">
                  <h3 className="font-medium">主任务: {title}</h3>
                  <p className="text-sm text-muted-foreground">
                    截止日期: {date ? `${format(date, "PPP", { locale: zhCN })} ${hour}:${minute}` : "未设置"}
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium">子任务列表:</h3>
                  {subtasks.map((subtask, index) => (
                    <div key={index} className="rounded-lg border p-3">
                      <h4 className="font-medium">{subtask.title}</h4>
                      <div className="mt-1 text-sm">
                        <p>预估时间: {subtask.estimatedTime} 小时</p>
                        <details className="mt-1">
                          <summary className="cursor-pointer text-sm font-medium">
                            执行步骤 ({subtask.steps.length})
                          </summary>
                          <ul className="mt-1 list-inside list-disc space-y-1 pl-2 text-sm">
                            {subtask.steps.map((step, stepIndex) => (
                              <li key={stepIndex}>{step}</li>
                            ))}
                          </ul>
                        </details>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setActiveTab("ai")}>
                  返回
                </Button>
                <Button type="submit">保存任务和子任务</Button>
              </DialogFooter>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

