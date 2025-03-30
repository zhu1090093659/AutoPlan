# AutoPlan

AutoPlan 是一个基于 Next.js 和 Shadcn UI 构建的任务管理应用，集成了 AI 功能，帮助用户更高效地管理和分解任务。

![版本](https://img.shields.io/badge/版本-0.1.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black)
![React](https://img.shields.io/badge/React-19-61DAFB)

## 📋 功能特点

- **AI 任务分解**：利用 AI 将复杂任务分解为可管理的子任务
- **任务管理**：创建、编辑、删除和跟踪任务进度
- **仪表盘**：直观展示任务统计和待办事项
- **日历视图**：时间维度上的任务规划
- **数据分析**：任务完成情况的可视化分析
- **本地存储**：所有数据保存在浏览器本地，保护隐私

## 🚀 快速开始

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 开发模式

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
# 或
yarn build
# 或
pnpm build
```

## 🔧 技术栈

- **前端框架**：Next.js 15.2.4
- **UI 组件**：Shadcn UI (基于 Radix UI)
- **状态管理**：Zustand
- **表单处理**：React Hook Form + Zod
- **日期处理**：date-fns
- **数据可视化**：Recharts

## 📱 主要功能模块

### 仪表盘

提供任务概览和统计信息，让用户快速了解当前任务状态和进度。

### 任务管理

- 查看、筛选和创建任务
- 管理任务状态和详情
- 查看和管理子任务

### AI 任务分解

利用 AI 技术，根据任务描述和时间限制自动将复杂任务分解为可管理的子任务，每个子任务包含执行步骤和预估时间。

### 设置中心

- 配置 AI 服务参数
- 管理本地存储数据

## 🔍 使用指南

### AI 任务分解流程

1. 访问 AI 任务分解页面
2. 输入详细的任务描述
3. 设置任务截止日期和时间
4. 点击"使用 AI 分解任务"按钮
5. 查看和调整 AI 生成的子任务列表
6. 保存结果到任务系统

### 任务管理流程

1. 在仪表盘或任务页面查看任务
2. 点击任务查看详情
3. 更新任务状态或管理子任务
4. 完成任务后标记为已完成

## 📝 更多文档

- [详细功能说明](./docs/功能说明.md)

## 📄 许可证

[MIT](LICENSE)
