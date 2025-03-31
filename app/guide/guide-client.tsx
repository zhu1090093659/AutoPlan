"use client"

import DashboardLayout from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { 
  BookOpen, 
  HelpCircle,
  CheckSquare, 
  Calendar, 
  BarChart3, 
  Sparkles, 
  Trophy, 
  GitBranch, 
  Info, 
  Clock, 
  AlertTriangle
} from "lucide-react"

export default function GuideClient() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">使用指南</h1>
          <p className="text-muted-foreground">了解如何使用 AutoPlan 提高您的任务管理效率</p>
        </div>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>快速入门</AlertTitle>
          <AlertDescription>
            AutoPlan 是一个基于 AI 的任务管理应用，能够帮助您分解复杂任务、跟踪进度并提高工作效率。所有数据保存在浏览器本地，保障您的隐私安全。
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="dashboard">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <CheckSquare className="h-4 w-4" /> 仪表盘
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" /> AI 任务分解
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <GitBranch className="h-4 w-4" /> 任务管理
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" /> 日历视图
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" /> 数据分析
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" /> 成就系统
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>仪表盘使用指南</CardTitle>
                <CardDescription>
                  仪表盘是您的任务管理中心，提供任务概览和统计信息
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-medium mb-2">主要功能</h3>
                    <ul className="list-disc ml-5 space-y-1">
                      <li>任务统计卡片：显示总任务、已完成、进行中和逾期任务数量</li>
                      <li>待办任务列表：展示所有未完成的任务</li>
                      <li>用户等级：显示当前用户等级和升级进度</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">使用技巧</h3>
                    <ul className="list-disc ml-5 space-y-1">
                      <li>点击任务卡片快速查看任务详情</li>
                      <li>使用统计卡片了解任务完成率和工作效率</li>
                      <li>通过用户等级了解您的成就解锁进度</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>AI 任务分解指南</CardTitle>
                <CardDescription>
                  利用 AI 将复杂任务分解为可管理的子任务，提高工作效率
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="step1">
                    <AccordionTrigger>步骤 1：准备任务描述</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <p>在开始任务分解前，准备一个详细的任务描述，包括：</p>
                        <ul className="list-disc ml-5 space-y-1">
                          <li>任务的目标和期望结果</li>
                          <li>任务的范围和限制</li>
                          <li>相关资源和参考信息</li>
                          <li>特殊要求或考虑因素</li>
                        </ul>
                        <Alert className="mt-4">
                          <Info className="h-4 w-4" />
                          <AlertTitle>提示</AlertTitle>
                          <AlertDescription>
                            任务描述越详细，AI 分解的结果就越准确。建议提供具体信息，避免过于模糊的描述。
                          </AlertDescription>
                        </Alert>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="step2">
                    <AccordionTrigger>步骤 2：设置截止日期和时间</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <p>为任务设置合理的截止日期和时间，帮助 AI 更好地规划子任务的时间分配：</p>
                        <ul className="list-disc ml-5 space-y-1">
                          <li>选择一个现实可行的截止日期</li>
                          <li>设置具体的截止时间</li>
                          <li>确保留有足够的缓冲时间</li>
                        </ul>
                        <Alert className="mt-4" variant="destructive">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertTitle>注意</AlertTitle>
                          <AlertDescription>
                            设置的截止时间应该考虑到任务的复杂度和实际可用时间，过于紧张的时间安排可能导致任务无法按时完成。
                          </AlertDescription>
                        </Alert>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="step3">
                    <AccordionTrigger>步骤 3：使用 AI 分解任务</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <p>完成以上准备工作后，点击"使用 AI 分解任务"按钮：</p>
                        <ul className="list-disc ml-5 space-y-1">
                          <li>系统会调用 AI 服务处理您的任务描述</li>
                          <li>AI 会根据任务描述和时间限制自动分解任务</li>
                          <li>生成包含执行步骤和预估时间的子任务列表</li>
                        </ul>
                        <Alert className="mt-4">
                          <Clock className="h-4 w-4" />
                          <AlertTitle>处理时间</AlertTitle>
                          <AlertDescription>
                            AI 分解过程通常需要几秒钟时间，复杂任务可能需要更长时间。请耐心等待处理完成。
                          </AlertDescription>
                        </Alert>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="step4">
                    <AccordionTrigger>步骤 4：查看和调整分解结果</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <p>AI 完成任务分解后，您可以查看和调整结果：</p>
                        <ul className="list-disc ml-5 space-y-1">
                          <li>检查任务标题是否准确反映任务内容</li>
                          <li>查看每个子任务的标题、执行步骤和预估时间</li>
                          <li>确认子任务的逻辑顺序是否合理</li>
                          <li>根据需要手动调整子任务内容</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="step5">
                    <AccordionTrigger>步骤 5：保存分解结果</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <p>确认分解结果无误后，点击"保存所有子任务"按钮：</p>
                        <ul className="list-disc ml-5 space-y-1">
                          <li>系统会创建主任务和所有子任务</li>
                          <li>任务会自动添加到您的任务列表中</li>
                          <li>可以在任务页面查看和管理这些任务</li>
                          <li>使用 AI 分解功能将解锁相关成就</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <Alert className="mt-4">
                  <Sparkles className="h-4 w-4" />
                  <AlertTitle>AI 配置</AlertTitle>
                  <AlertDescription>
                    您可以在设置页面自定义 AI 服务参数，包括 Base URL、API Key、模型名称和重试次数。如果您使用公共 AI 服务，可能需要提供自己的 API Key。
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>任务管理指南</CardTitle>
                <CardDescription>
                  学习如何创建、编辑、删除和跟踪任务
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-medium mb-2">任务操作</h3>
                    <ul className="list-disc ml-5 space-y-1">
                      <li><strong>创建任务：</strong> 点击"新建任务"按钮，填写任务信息并保存</li>
                      <li><strong>编辑任务：</strong> 在任务卡片中点击编辑图标，修改任务信息</li>
                      <li><strong>删除任务：</strong> 在任务卡片中点击删除图标，确认后删除</li>
                      <li><strong>更改状态：</strong> 通过任务详情页的"更改状态"按钮更新任务状态</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">子任务管理</h3>
                    <ul className="list-disc ml-5 space-y-1">
                      <li><strong>查看子任务：</strong> 在任务详情页查看关联的子任务</li>
                      <li><strong>完成子任务：</strong> 点击子任务前的复选框标记为已完成</li>
                      <li><strong>查看子任务步骤：</strong> 点击"执行步骤"查看详细步骤</li>
                      <li><strong>使用 AI 分解：</strong> 通过 AI 任务分解功能创建子任务</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">任务状态说明</h3>
                  <div className="grid gap-2 md:grid-cols-4">
                    <Card className="p-3">
                      <h4 className="font-medium">待处理</h4>
                      <p className="text-sm text-muted-foreground">尚未开始的任务</p>
                    </Card>
                    <Card className="p-3">
                      <h4 className="font-medium">进行中</h4>
                      <p className="text-sm text-muted-foreground">正在处理的任务</p>
                    </Card>
                    <Card className="p-3">
                      <h4 className="font-medium">已完成</h4>
                      <p className="text-sm text-muted-foreground">已完成的任务</p>
                    </Card>
                    <Card className="p-3">
                      <h4 className="font-medium">已逾期</h4>
                      <p className="text-sm text-muted-foreground">超过截止日期的任务</p>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>日历视图指南</CardTitle>
                <CardDescription>
                  使用日历视图管理任务时间和规划
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-medium mb-2">日历功能</h3>
                    <ul className="list-disc ml-5 space-y-1">
                      <li>查看按日期排列的任务</li>
                      <li>通过日历导航到不同月份</li>
                      <li>有任务的日期会显示特殊标记</li>
                      <li>点击日期查看当天任务列表</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">使用技巧</h3>
                    <ul className="list-disc ml-5 space-y-1">
                      <li>点击日期查看该日期的全部任务</li>
                      <li>在日期弹窗中快速访问任务详情</li>
                      <li>使用日历规划未来任务时间</li>
                      <li>关注有特殊标记的日期，这表示有待办任务</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>数据分析指南</CardTitle>
                <CardDescription>
                  了解如何使用数据分析功能评估您的任务执行情况
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">统计摘要</h3>
                  <p className="mb-2">分析页面顶部的统计卡片提供了关键指标的概览：</p>
                  <ul className="list-disc ml-5 space-y-1">
                    <li><strong>总任务数：</strong> 所有时间内创建的任务总数</li>
                    <li><strong>已完成任务：</strong> 已标记为完成的任务数量</li>
                    <li><strong>完成率：</strong> 任务完成的百分比</li>
                    <li><strong>平均任务时间：</strong> 每个任务的平均完成时间</li>
                    <li><strong>生产力得分：</strong> 综合考虑任务完成率和及时性的得分</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">时间范围分析</h3>
                  <p className="mb-2">使用时间范围选项卡切换不同的分析视图：</p>
                  <ul className="list-disc ml-5 space-y-1">
                    <li><strong>每周：</strong> 查看本周的任务完成情况</li>
                    <li><strong>每月：</strong> 查看本月的任务统计和趋势</li>
                    <li><strong>每年：</strong> 查看全年任务数据和生产力分析</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">图表解读</h3>
                  <ul className="list-disc ml-5 space-y-1">
                    <li><strong>任务完成率：</strong> 显示选定时间段内的任务完成百分比</li>
                    <li><strong>任务分布：</strong> 按状态分类的任务数量分布</li>
                    <li><strong>工作时间：</strong> 基于预估时间的工作负荷</li>
                    <li><strong>任务完成趋势：</strong> 任务完成的时间趋势</li>
                  </ul>
                </div>
                
                <Alert className="mt-4">
                  <Info className="h-4 w-4" />
                  <AlertTitle>数据用途</AlertTitle>
                  <AlertDescription>
                    利用分析数据调整您的工作习惯，找出效率低下的环节，持续改进您的任务管理方式。定期查看分析页面可以帮助您了解自己的工作模式和进步情况。
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>成就系统指南</CardTitle>
                <CardDescription>
                  了解如何解锁成就并提升您的用户等级
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-medium mb-2">成就类别</h3>
                    <ul className="list-disc ml-5 space-y-2">
                      <li>
                        <strong>任务完成：</strong> 
                        <span className="text-sm text-muted-foreground block">完成一定数量的任务</span>
                      </li>
                      <li>
                        <strong>连续完成：</strong> 
                        <span className="text-sm text-muted-foreground block">连续多天完成任务</span>
                      </li>
                      <li>
                        <strong>效率：</strong> 
                        <span className="text-sm text-muted-foreground block">提前完成任务</span>
                      </li>
                      <li>
                        <strong>AI使用：</strong> 
                        <span className="text-sm text-muted-foreground block">使用AI功能分解任务</span>
                      </li>
                      <li>
                        <strong>任务管理：</strong> 
                        <span className="text-sm text-muted-foreground block">创建和管理子任务</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">成就等级</h3>
                    <ul className="list-disc ml-5 space-y-2">
                      <li>
                        <strong>铜级：</strong> 
                        <span className="text-sm text-muted-foreground block">入门级成就，提供1点等级积分</span>
                      </li>
                      <li>
                        <strong>银级：</strong> 
                        <span className="text-sm text-muted-foreground block">中级成就，提供2点等级积分</span>
                      </li>
                      <li>
                        <strong>金级：</strong> 
                        <span className="text-sm text-muted-foreground block">高级成就，提供3点等级积分</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">用户等级系统</h3>
                  <p className="mb-2">用户等级基于您解锁的成就数量：</p>
                  <ul className="list-disc ml-5 space-y-1">
                    <li>每解锁一个成就，您将获得相应等级的积分</li>
                    <li>积累足够的积分后，您的用户等级将提升</li>
                    <li>当前等级和升级进度显示在仪表盘上</li>
                    <li>更高的等级代表您在任务管理方面的专业程度</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">如何解锁成就</h3>
                  <ul className="list-disc ml-5 space-y-1">
                    <li>通过日常使用应用完成各种任务</li>
                    <li>定期查看成就页面了解解锁条件</li>
                    <li>解锁成就时会收到通知提醒</li>
                    <li>在成就页面查看所有成就及进度</li>
                  </ul>
                </div>
                
                <Alert className="mt-4">
                  <Trophy className="h-4 w-4" />
                  <AlertTitle>成就解锁技巧</AlertTitle>
                  <AlertDescription>
                    尝试使用应用的各种功能，如AI任务分解、任务管理和日历规划，可以帮助您快速解锁更多成就。保持连续使用习惯可以解锁连续完成类成就。
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>常见问题解答</CardTitle>
            <CardDescription>
              快速了解使用过程中可能遇到的问题
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="q1">
                <AccordionTrigger>数据存储在哪里？是否安全？</AccordionTrigger>
                <AccordionContent>
                  <p>AutoPlan 的所有数据都存储在浏览器的本地存储（LocalStorage）中，不会上传到云端服务器。这意味着：</p>
                  <ul className="list-disc ml-5 mt-2 space-y-1">
                    <li>您的数据完全保存在您的设备上</li>
                    <li>没有隐私泄露的风险</li>
                    <li>不需要账号即可使用所有功能</li>
                  </ul>
                  <p className="mt-2 text-sm text-muted-foreground">注意：清除浏览器数据或使用不同设备会导致无法访问之前的任务数据。</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="q2">
                <AccordionTrigger>如何配置 AI 服务？需要自己的 API Key 吗？</AccordionTrigger>
                <AccordionContent>
                  <p>AI 任务分解功能需要配置 AI 服务参数：</p>
                  <ul className="list-disc ml-5 mt-2 space-y-1">
                    <li>您可以在"设置"页面配置 AI 服务</li>
                    <li>默认使用公共 AI 服务，但可能需要您提供自己的 API Key</li>
                    <li>支持配置 Base URL、API Key、模型名称和重试次数</li>
                    <li>可以使用任何兼容 OpenAI API 的服务</li>
                  </ul>
                  <p className="mt-2 text-sm text-muted-foreground">建议：如需频繁使用 AI 功能，最好配置自己的 API Key。</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="q3">
                <AccordionTrigger>任务逾期会自动提醒吗？</AccordionTrigger>
                <AccordionContent>
                  <p>当前版本的 AutoPlan 不提供自动提醒功能：</p>
                  <ul className="list-disc ml-5 mt-2 space-y-1">
                    <li>系统会自动标记逾期的任务，但不会主动发送提醒</li>
                    <li>您需要定期查看仪表盘和任务列表来跟踪即将到期的任务</li>
                    <li>可以使用日历视图查看按日期排列的任务</li>
                  </ul>
                  <p className="mt-2 text-sm text-muted-foreground">提示：养成每天检查仪表盘的习惯，可以避免任务逾期。</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="q4">
                <AccordionTrigger>如何将数据备份或迁移到其他设备？</AccordionTrigger>
                <AccordionContent>
                  <p>当前版本尚未提供官方的数据备份和迁移功能，但您可以：</p>
                  <ul className="list-disc ml-5 mt-2 space-y-1">
                    <li>通过浏览器开发工具导出 LocalStorage 中的数据</li>
                    <li>将导出的数据手动导入到其他设备</li>
                  </ul>
                  <Alert className="mt-4" variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>注意</AlertTitle>
                    <AlertDescription>
                      清除浏览器数据将永久删除所有任务和设置。请谨慎操作。
                    </AlertDescription>
                  </Alert>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="q5">
                <AccordionTrigger>应用支持多人协作吗？</AccordionTrigger>
                <AccordionContent>
                  <p>当前版本的 AutoPlan 不支持多人协作功能：</p>
                  <ul className="list-disc ml-5 mt-2 space-y-1">
                    <li>所有数据仅保存在本地，不支持实时共享</li>
                    <li>每个用户需要独立使用自己的设备管理任务</li>
                    <li>未来版本可能会考虑添加团队协作功能</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}