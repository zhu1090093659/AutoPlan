export interface Task {
  id: string
  title: string
  description: string
  status: string
  dueDate: string
  createdAt: string
  updatedAt: string
  subtasks?: Subtask[]
}

export interface Subtask {
  id: string
  taskId: string
  title: string
  steps: string[]
  estimatedTime: number
  status: string
  createdAt: string
  updatedAt: string
}

