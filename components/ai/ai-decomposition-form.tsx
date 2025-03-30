"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Sparkles, Calendar, Settings, ExternalLink } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import type { Subtask } from "@/lib/types"
import { useTaskStore } from "@/lib/store"
import { useAIConfig } from "@/lib/ai-config"
import { trackAIUsageAchievement } from "@/lib/achievement-helpers"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AchievementListener } from "@/components/achievements/achievement-listener"

export function AIDecompositionForm() {
  const [task, setTask] = useState("")
  const [loading, setLoading] = useState(false)
  const [subtasks, setSubtasks] = useState<Omit<Subtask, "id" | "taskId" | "createdAt" | "updatedAt">[]>([])
  const { toast } = useToast()
  const router = useRouter()
  const { addTask, addSubtasks } = useTaskStore()
  const [title, setTitle] = useState("")
  const [date, setDate] = useState<Date | null>(null)
  const [hours, setHours] = useState<string>("23");
  const [minutes, setMinutes] = useState<string>("59");

  // AI配置
  const {
    baseURL,
    apiKey,
    retryCount,
    modelName,
    updateBaseURL,
    updateApiKey,
    updateRetryCount,
    updateModelName,
    resetToDefaults,
  } = useAIConfig()
  const [configBaseURL, setConfigBaseURL] = useState(baseURL)
  const [configApiKey, setConfigApiKey] = useState(apiKey)
  const [configRetryCount, setConfigRetryCount] = useState(retryCount.toString())
  const [configModelName, setConfigModelName] = useState(modelName)
  const [showConfigDialog, setShowConfigDialog] = useState(false)

  const handleDecompose = async () => {
    if (!task.trim()) {
      toast({
        title: "请输入任务描述",
        description: "请提供详细的任务描述，以便 AI 更好地分解任务。",
        variant: "destructive",
      })
      return
    }

    if (!date) {
      toast({
        title: "请先设置截止日期",
        description: "为了让 AI 更合理地安排任务时间，请先设置任务的截止日期。",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      // 获取当前时间和截止日期
      const now = new Date()
      const dueDate = new Date(date.getTime())
      dueDate.setHours(parseInt(hours))
      dueDate.setMinutes(parseInt(minutes))
      
      // 计算可用的总时间（小时）
      const totalHoursAvailable = Math.max(1, Math.round((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60)))

      // 将配置作为请求的一部分发送到服务器
      const response = await fetch("/api/ai/decompose", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task,
          timeInfo: {
            currentTime: now.toISOString(),
            dueDate: dueDate.toISOString(),
            totalHoursAvailable: totalHoursAvailable
          },
          config: {
            baseURL,
            apiKey,
            retryCount,
            modelName,
          },
        }),
      })

      // 检查响应状态
      if (!response.ok) {
        const errorText = await response.text()
        console.error("API错误:", errorText)
        throw new Error(`API请求失败: ${response.status} ${response.statusText}`)
      }

      // 解析JSON响应
      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      if (data.subtasks && Array.isArray(data.subtasks)) {
        setSubtasks(
          data.subtasks.map((st) => ({
            ...st,
            status: "pending", // 确保每个子任务都有状态
          })),
        )

        // 如果没有设置标题，使用任务描述的第一行作为标题
        if (!title.trim()) {
          const firstLine = task.split("\n")[0].trim()
          setTitle(firstLine.length > 50 ? firstLine.substring(0, 50) + "..." : firstLine)
        }

        toast({
          title: "任务分解成功",
          description: `AI 已将任务分解为 ${data.subtasks.length} 个子任务。`,
        })
      } else {
        throw new Error("返回数据格式不正确")
      }
    } catch (error) {
      console.error("Error:", error)

      // 显示更友好的错误信息
      toast({
        title: "分解任务时遇到问题",
        description: "我们将使用默认的任务分解模板。您可以根据需要修改。",
        variant: "default",
      })

      // 使用默认的子任务模板
      setSubtasks([
        {
          title: "分析任务",
          steps: ["理解任务需求", "确定任务范围", "评估任务难度"],
          estimatedTime: 2,
          status: "pending",
        },
        {
          title: "规划执行步骤",
          steps: ["分解任务流程", "确定关键路径", "分配资源"],
          estimatedTime: 3,
          status: "pending",
        },
        {
          title: "执行任务",
          steps: ["按计划实施", "记录进度", "解决问题"],
          estimatedTime: 5,
          status: "pending",
        },
        {
          title: "评估与总结",
          steps: ["检查完成情况", "总结经验教训", "提出改进建议"],
          estimatedTime: 2,
          status: "pending",
        },
      ])

      // 如果没有设置标题，使用任务描述的第一行作为标题
      if (!title.trim()) {
        const firstLine = task.split("\n")[0].trim()
        setTitle(firstLine.length > 50 ? firstLine.substring(0, 50) + "..." : firstLine)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSaveSubtasks = () => {
    try {
      if (!title.trim()) {
        toast({
          title: "请填写任务标题",
          description: "任务标题不能为空，请填写一个有意义的标题。",
          variant: "destructive",
        })
        return
      }

      if (!date) {
        toast({
          title: "请选择截止日期",
          description: "请为任务设置一个截止日期。",
          variant: "destructive",
        })
        return
      }

      if (subtasks.length === 0) {
        toast({
          title: "请先分解任务",
          description: "请先使用AI分解任务或手动添加子任务。",
          variant: "destructive",
        })
        return
      }

      console.log("开始保存任务...");

      // 添加任务到存储
      const dueDateTime = new Date(date.getTime());
      dueDateTime.setHours(parseInt(hours));
      dueDateTime.setMinutes(parseInt(minutes));
      
      const taskId = addTask({
        title,
        description: task,
        status: "pending",
        dueDate: dueDateTime.toISOString(),
      });

      console.log("任务已添加，ID:", taskId);

      // 添加子任务
      const subtaskIds = addSubtasks(taskId, subtasks);

      console.log("子任务已添加，共", subtasks.length, "个，ID列表:", subtaskIds);

      // Track AI usage achievement
      const aiUsageCount = trackAIUsageAchievement();
      
      toast({
        title: "保存成功",
        description: `任务和${subtasks.length}个子任务已成功保存。`,
      })
      
      // 使用window.location.href进行导航
      window.location.href = "/tasks";
    } catch (error) {
      console.error("保存失败:", error);
      
      toast({
        title: "保存失败",
        description: `保存过程中发生错误: ${error}`,
        variant: "destructive",
      })
    }
  }

  // 保存AI配置
  const saveAIConfig = () => {
    // 验证输入
    if (!configBaseURL.trim()) {
      toast({
        title: "Base URL不能为空",
        variant: "destructive",
      })
      return
    }

    if (!configApiKey.trim()) {
      toast({
        title: "API Key不能为空",
        variant: "destructive",
      })
      return
    }

    if (!configModelName.trim()) {
      toast({
        title: "模型名称不能为空",
        variant: "destructive",
      })
      return
    }

    const retryNum = Number.parseInt(configRetryCount)
    if (isNaN(retryNum) || retryNum < 1 || retryNum > 10) {
      toast({
        title: "重试次数必须是1-10之间的数字",
        variant: "destructive",
      })
      return
    }

    // 更新配置
    updateBaseURL(configBaseURL)
    updateApiKey(configApiKey)
    updateRetryCount(retryNum)
    updateModelName(configModelName)

    toast({
      title: "AI配置已更新",
      description: "新的配置将在下次调用AI时生效。",
    })

    setShowConfigDialog(false)
  }

  // 重置AI配置
  const resetAIConfig = () => {
    resetToDefaults()
    setConfigBaseURL(baseURL)
    setConfigApiKey(apiKey)
    setConfigRetryCount(retryCount.toString())
    setConfigModelName(modelName)

    toast({
      title: "AI配置已重置为默认值",
    })
  }

  return (
    <div className="space-y-6">
      {/* Achievement listener to detect unlocked achievements */}
      <AchievementListener />
      
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">AI 任务分解</h2>
        <Dialog open={showConfigDialog} onOpenChange={setShowConfigDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              AI 配置
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>AI 配置</DialogTitle>
              <DialogDescription>配置AI服务的连接参数。这些设置将保存在浏览器中。</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="baseURL">Base URL</Label>
                <Input
                  id="baseURL"
                  value={configBaseURL}
                  onChange={(e) => setConfigBaseURL(e.target.value)}
                  placeholder="https://chatwithai.icu/v1"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="apiKey">API Key</Label>
                <Input
                  id="apiKey"
                  value={configApiKey}
                  onChange={(e) => setConfigApiKey(e.target.value)}
                  type="password"
                  placeholder="sk-..."
                />
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <p>需要API Key才能使用AI功能，您可以在</p>
                  <a 
                    href="https://chatwithai.icu" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:underline"
                  >
                    chatwithai.icu
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                  <p>购买</p>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="modelName">模型名称</Label>
                <Input
                  id="modelName"
                  value={configModelName}
                  onChange={(e) => setConfigModelName(e.target.value)}
                  placeholder="gpt-4o"
                />
                <p className="text-xs text-muted-foreground">要使用的AI模型名称，例如gpt-4o、gpt-3.5-turbo等</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="retryCount">重试次数</Label>
                <Input
                  id="retryCount"
                  value={configRetryCount}
                  onChange={(e) => setConfigRetryCount(e.target.value)}
                  type="number"
                  min="1"
                  max="10"
                />
                <p className="text-xs text-muted-foreground">当AI返回格式错误时的重试次数（1-10）</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={resetAIConfig}>
                重置为默认值
              </Button>
              <Button onClick={saveAIConfig}>保存配置</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>任务分解</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="task">任务描述</Label>
              <Textarea
                id="task"
                placeholder="请输入您需要完成的任务..."
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">截止日期和时间</Label>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "flex-1 justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP", { locale: zhCN }) : "选择日期"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={date || undefined}
                      onSelect={(day: Date | undefined) => day && setDate(day)}
                      initialFocus
                      locale={zhCN}
                    />
                  </PopoverContent>
                </Popover>
                
                <div className="flex items-center gap-1">
                  <select 
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="h-10 rounded-md border border-input bg-background px-3 py-2"
                  >
                    {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                      <option key={hour} value={hour.toString().padStart(2, '0')}>
                        {hour.toString().padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                  <span>:</span>
                  <select 
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    className="h-10 rounded-md border border-input bg-background px-3 py-2"
                  >
                    {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                      <option key={minute} value={minute.toString().padStart(2, '0')}>
                        {minute.toString().padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <Button
              onClick={handleDecompose}
              disabled={loading || !task.trim()}
              className="w-full"
            >
              {loading ? (
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
          </div>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>

      {subtasks.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">AI 分解结果</h2>

          <Card>
            <CardHeader>
              <CardTitle>任务信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                        className={cn("flex-1 justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP", { locale: zhCN }) : "选择日期"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={date || undefined}
                        onSelect={(day: Date | undefined) => day && setDate(day)}
                        initialFocus
                        locale={zhCN}
                      />
                    </PopoverContent>
                  </Popover>
                  
                  <div className="flex items-center gap-1">
                    <select 
                      value={hours}
                      onChange={(e) => setHours(e.target.value)}
                      className="h-10 rounded-md border border-input bg-background px-3 py-2"
                    >
                      {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                        <option key={hour} value={hour.toString().padStart(2, '0')}>
                          {hour.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                    <span>:</span>
                    <select 
                      value={minutes}
                      onChange={(e) => setMinutes(e.target.value)}
                      className="h-10 rounded-md border border-input bg-background px-3 py-2"
                    >
                      {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                        <option key={minute} value={minute.toString().padStart(2, '0')}>
                          {minute.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {subtasks.map((subtask, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{subtask.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="mb-2 font-medium">执行步骤:</h3>
                  <ul className="ml-6 list-disc space-y-2">
                    {subtask.steps.map((step, stepIndex) => (
                      <li key={stepIndex}>{step}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <div className="text-sm text-muted-foreground">预估时间: {subtask.estimatedTime} 小时</div>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="flex gap-4">
            <Button onClick={handleSaveSubtasks} className="w-full" variant="default">
              保存所有子任务
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}