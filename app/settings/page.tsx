"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useAIConfig } from "@/lib/ai-config"

export default function SettingsPage() {
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
  const { toast } = useToast()

  // 当存储的值变化时更新状态
  useEffect(() => {
    setConfigBaseURL(baseURL)
    setConfigApiKey(apiKey)
    setConfigRetryCount(retryCount.toString())
    setConfigModelName(modelName)
  }, [baseURL, apiKey, retryCount, modelName])

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
  }

  // 重置AI配置
  const resetAIConfig = () => {
    resetToDefaults()

    toast({
      title: "AI配置已重置为默认值",
    })
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">设置</h1>
          <p className="text-muted-foreground">管理应用程序设置和配置</p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>AI 配置</CardTitle>
              <CardDescription>配置AI服务的连接参数。这些设置将保存在浏览器中。</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="baseURL">Base URL</Label>
                <Input
                  id="baseURL"
                  value={configBaseURL}
                  onChange={(e) => setConfigBaseURL(e.target.value)}
                  placeholder="https://api.example.com/v1"
                />
                <p className="text-xs text-muted-foreground">AI服务的基础URL，例如OpenAI API的URL</p>
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
                <p className="text-xs text-muted-foreground">用于访问AI服务的API密钥</p>
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
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={resetAIConfig}>
                重置为默认值
              </Button>
              <Button onClick={saveAIConfig}>保存配置</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>数据管理</CardTitle>
              <CardDescription>管理应用程序数据和存储</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">本地存储</h3>
                <p className="text-sm text-muted-foreground">
                  当前所有任务和设置都存储在浏览器的本地存储中。清除浏览器数据将删除所有任务。
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="destructive">清除所有数据</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

