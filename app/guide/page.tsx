import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "使用指南 | AutoPlan",
  description: "学习如何使用AutoPlan管理和分解您的任务",
}

import GuideClient from "./guide-client"

export default function GuidePage() {
  return <GuideClient />
}