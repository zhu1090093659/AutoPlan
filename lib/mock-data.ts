import type { Task, Subtask } from "./types"

// 模拟任务数据
export const mockTasks: Task[] = [
  {
    id: "1",
    title: "设计网站首页",
    description: "设计一个现代化、响应式的网站首页，包括导航栏、轮播图和产品展示区域。",
    status: "in-progress",
    dueDate: "2023-04-15",
    createdAt: "2023-04-01",
    updatedAt: "2023-04-02",
  },
  {
    id: "2",
    title: "实现用户认证功能",
    description: "实现用户注册、登录和密码重置功能，确保安全性和用户体验。",
    status: "pending",
    dueDate: "2023-04-20",
    createdAt: "2023-04-02",
    updatedAt: "2023-04-02",
  },
  {
    id: "3",
    title: "优化数据库查询",
    description: "分析并优化现有数据库查询，提高应用性能和响应速度。",
    status: "completed",
    dueDate: "2023-04-10",
    createdAt: "2023-03-25",
    updatedAt: "2023-04-08",
  },
  {
    id: "4",
    title: "编写API文档",
    description: "为所有API端点编写详细的文档，包括请求参数、响应格式和示例。",
    status: "overdue",
    dueDate: "2023-04-05",
    createdAt: "2023-03-28",
    updatedAt: "2023-04-06",
  },
  {
    id: "5",
    title: "实现支付集成",
    description: "集成第三方支付服务，支持信用卡和移动支付方式。",
    status: "in-progress",
    dueDate: "2023-04-25",
    createdAt: "2023-04-05",
    updatedAt: "2023-04-07",
  },
]

// 模拟子任务数据
const mockSubtasks: Subtask[] = [
  {
    id: "101",
    taskId: "1",
    title: "设计导航栏",
    steps: ["分析用户需求和网站结构", "创建导航栏线框图", "设计导航栏的视觉样式", "确保导航栏在移动设备上响应良好"],
    estimatedTime: 3,
    status: "completed",
    createdAt: "2023-04-01",
    updatedAt: "2023-04-03",
  },
  {
    id: "102",
    taskId: "1",
    title: "设计轮播图",
    steps: ["收集和准备轮播图内容", "设计轮播图的视觉效果", "添加轮播控制和指示器", "确保轮播图在不同设备上显示正常"],
    estimatedTime: 4,
    status: "in-progress",
    createdAt: "2023-04-01",
    updatedAt: "2023-04-04",
  },
  {
    id: "103",
    taskId: "1",
    title: "设计产品展示区域",
    steps: ["确定产品展示的布局和结构", "设计产品卡片的样式", "添加产品筛选和排序功能", "确保产品展示区域响应式设计"],
    estimatedTime: 5,
    status: "pending",
    createdAt: "2023-04-01",
    updatedAt: "2023-04-01",
  },
  {
    id: "201",
    taskId: "2",
    title: "实现用户注册功能",
    steps: ["设计注册表单", "实现表单验证", "创建用户账户", "发送验证邮件"],
    estimatedTime: 6,
    status: "pending",
    createdAt: "2023-04-02",
    updatedAt: "2023-04-02",
  },
  {
    id: "202",
    taskId: "2",
    title: "实现用户登录功能",
    steps: ["设计登录表单", "实现表单验证", "验证用户凭据", "创建和管理用户会话"],
    estimatedTime: 4,
    status: "pending",
    createdAt: "2023-04-02",
    updatedAt: "2023-04-02",
  },
]

// 模拟获取任务详情
export function mockGetTaskById(id: string): Task | undefined {
  const task = mockTasks.find((task) => task.id === id)
  if (task) {
    return {
      ...task,
      subtasks: mockSubtasks.filter((subtask) => subtask.taskId === id),
    }
  }
  return undefined
}

// 模拟获取子任务
export function mockGetSubtasksByTaskId(taskId: string): Subtask[] {
  return mockSubtasks.filter((subtask) => subtask.taskId === taskId)
}

// 模拟按日期获取任务
export function mockGetTasksByDate(date: Date): Task[] {
  const dateStr = date.toISOString().split("T")[0]
  return mockTasks.filter((task) => task.dueDate === dateStr)
}

