"use client";

import { useEffect, useRef } from "react";
import { useTaskStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";
import { Achievement } from "@/lib/achievements";
import { Medal } from "lucide-react";

export function AchievementListener() {
  const { toast } = useToast();
  const lastUnlocked = useTaskStore((state) => state.getLatestUnlockedAchievement());
  const lastUnlockedRef = useRef<Achievement | null>(null);
  
  useEffect(() => {
    // Check if there's a new unlocked achievement
    if (lastUnlocked && 
        (!lastUnlockedRef.current || 
         lastUnlocked.id !== lastUnlockedRef.current.id ||
         lastUnlocked.unlockedAt !== lastUnlockedRef.current.unlockedAt)) {
      
      // Show toast notification
      toast({
        title: "🏆 成就解锁!",
        description: `${lastUnlocked.title} - ${lastUnlocked.description}`,
        duration: 5000,
      });
      
      // Update ref to avoid showing the same notification again
      lastUnlockedRef.current = lastUnlocked;
    }
  }, [lastUnlocked, toast]);
  
  return null; // This component doesn't render anything
}