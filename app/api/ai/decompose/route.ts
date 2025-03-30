import { OpenAI } from "openai"

// 示例数据
const EXAMPLE_TASKS = [
  {
    task: "开发一个在线商城网站",
    subtasks: [
      {
        title: "需求分析与规划",
        steps: ["与客户沟通确认网站功能需求", "分析竞争对手网站特点", "制定项目计划和时间表", "确定技术栈和架构"],
        estimatedTime: 8,
      },
      {
        title: "UI/UX设计",
        steps: ["设计网站原型", "创建网站风格指南", "设计主页和产品页面", "设计购物车和结账流程"],
        estimatedTime: 12,
      },
      {
        title: "前端开发",
        steps: [
          "搭建前端项目结构",
          "实现响应式布局",
          "开发用户认证功能",
          "实现产品展示和搜索功能",
          "开发购物车和结账功能",
        ],
        estimatedTime: 20,
      },
      {
        title: "后端开发",
        steps: ["设计数据库结构", "实现用户API", "开发产品管理API", "实现订单处理系统", "集成支付网关"],
        estimatedTime: 25,
      },
      {
        title: "测试与部署",
        steps: ["进行单元测试和集成测试", "执行用户验收测试", "修复发现的问题", "部署到生产环境", "配置监控和日志系统"],
        estimatedTime: 10,
      },
    ],
  },
  {
    task: "组织一次公司年会",
    subtasks: [
      {
        title: "前期规划",
        steps: ["确定年会日期和预算", "成立年会筹备小组", "制定年会主题和议程", "分配任务和责任"],
        estimatedTime: 5,
      },
      {
        title: "场地和供应商选择",
        steps: ["调研并考察潜在场地", "与场地方洽谈并签订合同", "选择餐饮服务提供商", "确定活动设备供应商"],
        estimatedTime: 8,
      },
      {
        title: "活动内容策划",
        steps: ["设计年会流程", "策划团队建设活动", "准备颁奖环节", "安排文艺表演", "设计互动游戏"],
        estimatedTime: 12,
      },
      {
        title: "宣传和邀请",
        steps: ["设计并发送邀请函", "创建年会宣传材料", "跟踪参会人员确认", "准备签到系统"],
        estimatedTime: 6,
      },
      {
        title: "现场执行",
        steps: ["布置会场", "协调各环节流程", "管理现场突发情况", "收集反馈意见", "整理活动总结"],
        estimatedTime: 10,
      },
    ],
  },
]

// 默认子任务模板
const DEFAULT_SUBTASKS = [
  {
    title: "分析任务",
    steps: ["理解任务需求", "确定任务范围", "评估任务难度"],
    estimatedTime: 2,
  },
  {
    title: "规划执行步骤",
    steps: ["分解任务流程", "确定关键路径", "分配资源"],
    estimatedTime: 3,
  },
  {
    title: "执行任务",
    steps: ["按计划实施", "记录进度", "解决问题"],
    estimatedTime: 5,
  },
  {
    title: "评估与总结",
    steps: ["检查完成情况", "总结经验教训", "提出改进建议"],
    estimatedTime: 2,
  },
]

// 创建详细的提示信息
function createDetailedPrompt(task: string, timeInfo?: any) {
  let timeContext = ""

  if (timeInfo) {
    const currentTime = new Date(timeInfo.currentTime)
    const dueDate = new Date(timeInfo.dueDate)
    const totalHoursAvailable = timeInfo.totalHoursAvailable

    // 格式化时间信息
    const currentTimeStr = `${currentTime.getFullYear()}年${currentTime.getMonth() + 1}月${currentTime.getDate()}日 ${currentTime.getHours()}:${currentTime.getMinutes()}`
    const dueDateStr = `${dueDate.getFullYear()}年${dueDate.getMonth() + 1}月${dueDate.getDate()}日 ${dueDate.getHours()}:${dueDate.getMinutes()}`

    timeContext = `
当前时间: ${currentTimeStr}
截止时间: ${dueDateStr}
可用时间: 大约 ${totalHoursAvailable} 小时

请根据当前时间和截止时间，合理安排子任务的预估时间，确保所有子任务的总时间不超过可用时间。`
  }

  return `请将以下复杂任务分解为具体的子任务，每个子任务包括标题、具体执行步骤和预估完成时间（以小时为单位）。

任务: ${task}
${timeContext}

请严格按照以下JSON格式返回，不要添加任何额外的文本或解释:
{
  "subtasks": [
    {
      "title": "子任务标题",
      "steps": ["步骤1", "步骤2", "步骤3", ...],
      "estimatedTime": 小时数(数字)
    },
    ...
  ]
}

以下是两个示例，展示了如何正确分解任务:

示例1:
任务: ${EXAMPLE_TASKS[0].task}
输出:
${JSON.stringify(EXAMPLE_TASKS[0], null, 2)}

示例2:
任务: ${EXAMPLE_TASKS[1].task}
输出:
${JSON.stringify(EXAMPLE_TASKS[1], null, 2)}

请确保你的回答只包含JSON格式的内容，不要添加任何其他文本。每个子任务应该有明确的标题、具体的执行步骤和合理的预估时间。`
}

// 尝试解析JSON，处理各种可能的格式
function tryParseJSON(text: string) {
  try {
    // 尝试直接解析
    return JSON.parse(text)
  } catch (e) {
    try {
      // 尝试提取JSON部分
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }
    } catch (e2) {
      // 继续尝试其他方法
    }

    try {
      // 尝试修复常见的JSON格式问题
      const fixedText = text
        .replace(/(\w+):/g, '"$1":') // 将属性名加上引号
        .replace(/'/g, '"') // 将单引号替换为双引号
        .replace(/,\s*}/g, "}") // 移除对象末尾多余的逗号
        .replace(/,\s*]/g, "]") // 移除数组末尾多余的逗号

      return JSON.parse(fixedText)
    } catch (e3) {
      // 所有尝试都失败
      throw new Error("无法解析返回的数据")
    }
  }
}

export async function POST(req: Request) {
  try {
    // 从请求体中获取任务、时间信息和配置
    const { task, timeInfo, config } = await req.json()

    if (!task || typeof task !== "string") {
      return Response.json({ error: "任务描述不能为空" }, { status: 400 })
    }

    // 使用请求中传递的配置或默认配置
    const apiConfig = config || {
      baseURL: "https://oneapi.deepwisdom.ai/v1",
      apiKey: "sk-wkrOfwj4YxzAsqWa577e28702a05495c921414157e9c4c27",
      modelName: "gpt-4o",
      retryCount: 3,
    }

    // 创建OpenAI客户端
    const openai = new OpenAI({
      apiKey: apiConfig.apiKey,
      baseURL: apiConfig.baseURL,
      dangerouslyAllowBrowser: true,
    })

    // 重试机制
    let lastError = null
    let result = null
    const retryCount = apiConfig.retryCount || 3

    for (let attempt = 0; attempt < retryCount; attempt++) {
      try {
        console.log(`尝试 ${attempt + 1}/${retryCount} 调用AI API...`)

        const response = await openai.chat.completions.create({
          model: apiConfig.modelName || "gpt-4o",
          messages: [
            {
              role: "system",
              content:
                "你是一个任务分解专家，能够将复杂任务分解为具体的子任务。请只返回JSON格式的数据，不要添加任何其他文本。",
            },
            {
              role: "user",
              content: createDetailedPrompt(task, timeInfo),
            },
          ],
          temperature: 0.7,
        })

        // 解析AI返回的JSON
        const text = response.choices[0].message.content || ""
        console.log("AI返回内容:", text)

        // 尝试解析JSON
        const parsed = tryParseJSON(text)

        // 验证结果格式
        if (parsed && parsed.subtasks && Array.isArray(parsed.subtasks)) {
          result = parsed
          break // 成功解析，跳出重试循环
        } else {
          throw new Error("返回数据格式不正确")
        }
      } catch (error) {
        console.error(`尝试 ${attempt + 1} 失败:`, error)
        lastError = error

        // 最后一次尝试失败，使用默认模板
        if (attempt === retryCount - 1) {
          console.log("所有尝试都失败，使用默认模板")
          result = { subtasks: DEFAULT_SUBTASKS }
        }
      }
    }

    // 返回结果
    return Response.json(result || { subtasks: DEFAULT_SUBTASKS })
  } catch (error) {
    console.error("请求处理错误:", error)

    // 返回默认模板
    return Response.json({
      subtasks: DEFAULT_SUBTASKS,
    })
  }
}
