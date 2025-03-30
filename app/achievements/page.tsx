import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "成就 | AutoPlan",
  description: "查看您的成就和进度",
};

import AchievementsClient from "./achievements-client";

export default function AchievementsPage() {
  return <AchievementsClient />;
}