"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { AchievementCard } from "@/components/achievements/achievement-card";
import { AchievementListener } from "@/components/achievements/achievement-listener";
import { UserLevel } from "@/components/achievements/user-level"; 
import { useTaskStore } from "@/lib/store";
import { AchievementCategory } from "@/lib/achievements";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Medal, CheckCircle, Flame, Clock, Sparkles, GitBranch } from "lucide-react";
import { getAchievementStats } from "@/lib/achievement-helpers";

export default function AchievementsClient() {
  const achievements = useTaskStore((state) => state.achievements);
  const [activeTab, setActiveTab] = useState<string>("all");
  
  // Filter achievements based on active tab
  const filteredAchievements = activeTab === "all" 
    ? achievements 
    : achievements.filter(a => a.category === activeTab);
  
  // Calculate overall stats
  const { unlockedCount, totalCount, progressPercentage } = getAchievementStats();
  
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">成就系统</h1>
          <p className="text-muted-foreground">跟踪你的进度和解锁的成就</p>
        </div>
        
        <AchievementListener />
        
        <div className="grid gap-4 md:grid-cols-5">
          <div className="col-span-5 md:col-span-1">
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <h2 className="font-medium mb-2">统计</h2>
                <div className="space-y-2">
                  <p className="text-sm">解锁成就: {unlockedCount}/{totalCount}</p>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary" 
                        style={{ width: `${progressPercentage}%` }} 
                      />
                    </div>
                    <span className="text-xs">{progressPercentage}%</span>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg border overflow-hidden">
                <Tabs 
                  orientation="vertical" 
                  value={activeTab} 
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="flex flex-col h-auto rounded-none border-r">
                    <TabsTrigger 
                      value="all" 
                      className="flex justify-start gap-2 rounded-none border-r-2 border-r-transparent data-[state=active]:border-r-primary"
                    >
                      <Medal className="h-4 w-4" />
                      <span>全部</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value={AchievementCategory.TaskCompletion} 
                      className="flex justify-start gap-2 rounded-none border-r-2 border-r-transparent data-[state=active]:border-r-primary"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>任务完成</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value={AchievementCategory.Streak} 
                      className="flex justify-start gap-2 rounded-none border-r-2 border-r-transparent data-[state=active]:border-r-primary"
                    >
                      <Flame className="h-4 w-4" />
                      <span>连续完成</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value={AchievementCategory.Efficiency} 
                      className="flex justify-start gap-2 rounded-none border-r-2 border-r-transparent data-[state=active]:border-r-primary"
                    >
                      <Clock className="h-4 w-4" />
                      <span>效率</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value={AchievementCategory.AIUsage} 
                      className="flex justify-start gap-2 rounded-none border-r-2 border-r-transparent data-[state=active]:border-r-primary"
                    >
                      <Sparkles className="h-4 w-4" />
                      <span>AI使用</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value={AchievementCategory.TaskManagement} 
                      className="flex justify-start gap-2 rounded-none border-r-2 border-r-transparent data-[state=active]:border-r-primary"
                    >
                      <GitBranch className="h-4 w-4" />
                      <span>任务管理</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </div>
          
          <div className="col-span-5 md:col-span-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredAchievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
              
              {filteredAchievements.length === 0 && (
                <div className="col-span-full flex items-center justify-center h-40 border rounded-lg">
                  <p className="text-muted-foreground">暂无成就</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}