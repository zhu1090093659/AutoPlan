"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy } from "lucide-react";
import { calculateUserLevel } from "@/lib/achievement-helpers";
import { useTaskStore } from "@/lib/store";

export function UserLevel() {
  const achievements = useTaskStore((state) => state.achievements);
  const [levelData, setLevelData] = useState(() => calculateUserLevel());
  
  // Recalculate level when achievements change
  useEffect(() => {
    setLevelData(calculateUserLevel());
  }, [achievements]);
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">用户等级</CardTitle>
        <Trophy className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">Level {levelData.level}</div>
        <p className="text-xs text-muted-foreground">成就点数: {levelData.points}</p>
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1 text-xs">
            <span>进度</span>
            <span>{levelData.percentage}%</span>
          </div>
          <Progress value={levelData.percentage} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}