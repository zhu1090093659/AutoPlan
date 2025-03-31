import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";
import { Achievement, AchievementLevel } from "@/lib/achievements";

interface AchievementCardProps {
  achievement: Achievement;
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  // Get the icon component from achievement.icon name
  const IconComponent = (LucideIcons as any)[achievement.icon] || LucideIcons.Medal;
  
  // Calculate progress percentage
  const progressPercentage = Math.min(100, Math.round((achievement.progress / achievement.maxProgress) * 100));
  
  // Determine achievement level style
  const levelStyles = {
    [AchievementLevel.Bronze]: "bg-amber-700 text-amber-100",
    [AchievementLevel.Silver]: "bg-slate-400 text-slate-100",
    [AchievementLevel.Gold]: "bg-yellow-400 text-yellow-900",
  };
  
  return (
    <Card className={cn(
      "transition-all duration-300",
      achievement.unlocked ? "opacity-100" : "opacity-60"
    )}>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full",
          achievement.unlocked ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        )}>
          <IconComponent className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <CardTitle className="flex items-center gap-2 text-base">
            {achievement.title}
            <Badge className={levelStyles[achievement.level] || ""}>
              {achievement.level}
            </Badge>
          </CardTitle>
          <p className="text-sm text-muted-foreground">{achievement.description}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>进度: {achievement.progress}/{achievement.maxProgress}</span>
          <span>{progressPercentage}%</span>
        </div>
        <Progress value={progressPercentage} />
        
        {achievement.unlocked && achievement.unlockedAt && (
          <p className="mt-2 text-xs text-muted-foreground">
            解锁时间: {new Date(achievement.unlockedAt).toLocaleString()}
          </p>
        )}
      </CardContent>
    </Card>
  );
}