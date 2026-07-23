import {
  Card,
  Col,
  Row,
  Space,
  Typography,
  Input,
  Button,
  Tag,
  Avatar,
 Divider
} from "antd";

import {
  SendOutlined,
  RobotOutlined,
  UserOutlined,
  BulbOutlined,
  ThunderboltOutlined,
  ArrowRightOutlined
} from "@ant-design/icons";

import {
  useRef,
  useState,
  useEffect
} from "react";

import { CompetitionCard } from "../components/CompetitionCard";
import { competitions } from "../services/competitions";
import { sendMessage } from "../services/agent";
import { designTokens } from "../styles/tokens";


type Message = {
  role: "user" | "assistant";
  content: string;
};

// 快捷提示词
const SUGGESTIONS = [
  "我是计算机专业大二学生，对AI感兴趣",
  "推荐几个适合新手的入门竞赛",
  "我想找团队赛，有创新类推荐吗",
  "数学专业，想参加建模类竞赛"
];

// 从用户输入中提取关键词（增强版：支持更多专业/兴趣/目标关键词）
function extractKeywords(text: string): { major: string; interests: string[]; goal: string } {
  // 常见专业（支持模糊匹配）
  const majorMap: Record<string, string> = {
    "计算机": "计算机", "软件": "软件工程", "数学": "数学", "应用数学": "数学",
    "物理": "物理", "电子": "电子", "机械": "机械", "土木": "土木",
    "化工": "化工", "生物": "生物", "医学": "医学", "金融": "金融",
    "经济": "经济", "管理": "管理学", "文学": "文学", "法学": "法学",
    "艺术": "艺术", "设计": "设计", "人工智能": "人工智能", "大数据": "大数据",
    "统计": "统计学", "会计": "会计", "通信": "通信", "自动化": "自动化",
    "电气": "电气", "材料": "材料", "环境": "环境", "建筑": "建筑"
  };

  // 兴趣关键词（覆盖更多方向）
  const interestKeywords = [
    "AI", "人工智能", "算法", "编程", "创新", "创业", "建模", "大数据",
    "安全", "游戏", "前端", "后端", "全栈", "产品", "设计", "开发",
    "机器学习", "深度学习", "数据挖掘", "视觉", "自然语言", "物联网",
    "区块链", "云计算", "嵌入式", "机器人", "图像", "音频", "视频"
  ];

  // 目标关键词分类匹配（返回更友好的展示文本）
  // 按优先级排序：国奖类 > 省奖类 > 名次类 > 能力提升类 > 入门前置类
  const goalRules: { keywords: string[]; label: string; priority: number }[] = [
    { keywords: ["国奖", "国家级", "国家一等奖", "国家二等奖", "国家三等奖", "全国一等奖", "全国二等奖", "全国三等奖"], label: "国家级奖项", priority: 1 },
    { keywords: ["省奖", "省级", "省一", "省二", "省三", "省级一等奖", "省级二等奖", "省级三等奖"], label: "省级奖项", priority: 2 },
    { keywords: ["一等奖", "二等奖", "三等奖", "金奖", "银奖", "铜奖", "最高奖", "特等奖"], label: "高名次奖项", priority: 3 },
    { keywords: ["保研", "综测", "加分", "奖学金", "简历", "留学", "考研", "就业", "找工作"], label: "升学就业", priority: 4 },
    { keywords: ["提升经验", "参与", "体验", "锻炼", "能力", "技能", "实践机会", "增长见识", "涨经验"], label: "能力提升", priority: 5 },
    { keywords: ["奖金", "奖励", "奖品", "现金"], label: "奖金奖励", priority: 6 },
    { keywords: ["入门", "新手", "小白", "零基础", "初级", "基础", "尝试"], label: "入门尝试", priority: 7 },
    { keywords: ["进阶", "挑战", "突破", "提升", "拔高", "高难度"], label: "进阶挑战", priority: 8 },
  ];

  // 匹配专业（从长到短匹配，避免"计算"误匹配"计算机"）
  let major = "";
  const sortedMajors = Object.entries(majorMap).sort((a, b) => b[0].length - a[0].length);
  for (const [key, value] of sortedMajors) {
    if (text.includes(key)) {
      major = value;
      break;
    }
  }

  // 以"专业"、"系"等结尾的词也尝试提取
  const majorPattern = /([\u4e00-\u9fa5]{2,6})(?:专业|系|方向)/;
  const majorMatch = text.match(majorPattern);
  if (!major && majorMatch) {
    const potential = majorMatch[1];
    for (const [key, value] of sortedMajors) {
      if (potential.includes(key) || key.includes(potential)) {
        major = value;
        break;
      }
    }
  }

  // 兴趣匹配（大小写不敏感）
  const interests = interestKeywords.filter(k => {
    if (k === "AI") return text.includes("AI") || text.includes("人工智能");
    return text.includes(k);
  });

  // 目标匹配（按优先级返回最匹配的目标类别）
  let goal = "";
  for (const rule of goalRules) {
    if (rule.keywords.some(k => text.includes(k))) {
      goal = rule.label;
      break;
    }
  }

  return { major, interests, goal };
}


export function AIRecommendation() {
  const inputRef = useRef<any>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [typingText, setTypingText] = useState("");
  const [typingIndex, setTypingIndex] = useState(-1);

const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "你好！我是 **赛智通 AI 竞赛智能体** 🤖\n\n我可以帮你分析专业背景、推荐适合的竞赛、规划参赛路线。\n\n**请告诉我：**\n• 你的专业是什么？\n• 你对哪些方向感兴趣？\n• 你想达到什么目标？"
    }
  ]);

  // Agent 状态管理 - 动态生成
  const [agentSteps, setAgentSteps] = useState([
    { label: "等待用户输入", status: "wait" as "wait" | "running" | "done", detail: "请描述你的背景和需求" },
    { label: "分析用户画像", status: "wait" as "wait" | "running" | "done", detail: "" },
    { label: "匹配竞赛数据库", status: "wait" as "wait" | "running" | "done", detail: "" },
    { label: "评估匹配程度", status: "wait" as "wait" | "running" | "done", detail: "" },
    { label: "生成推荐方案", status: "wait" as "wait" | "running" | "done", detail: "" }
  ]);

  // 用户画像状态 - 动态填充
  const [userProfile, setUserProfile] = useState({
    major: "",
    interests: [] as string[],
    goal: "",
    matched: false
  });

  // 消息容器引用（用于手动控制滚动）
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  // 仅在用户发送消息后滚动到底部
  useEffect(() => {
    if (shouldScroll && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      setShouldScroll(false);
    }
  }, [messages, shouldScroll]);

  const updateAgentStep = (index: number, status: "wait" | "running" | "done", detail?: string) => {
    setAgentSteps(prev => prev.map((step, i) =>
      i === index ? { ...step, status, detail: detail || step.detail } : step
    ));
  };

  const processMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    setShowSuggestions(false);

    // 添加用户消息
    setMessages(prev => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);
    setShouldScroll(true);

    // Step 1: 分析中
    updateAgentStep(0, "done", "用户已发送需求");
    updateAgentStep(1, "running", "正在提取关键词...");
    await new Promise(r => setTimeout(r, 400));

    // 提取用户画像（增量更新：不覆盖已识别的信息）
    const { major, interests, goal } = extractKeywords(text);
    setUserProfile(prev => {
      const newMajor = major || prev.major;
      const newInterests = [...new Set([...prev.interests, ...interests])];
      const newGoal = goal || prev.goal;
      return {
        major: newMajor,
        interests: newInterests,
        goal: newGoal,
        matched: !!(newMajor || newInterests.length > 0 || newGoal)
      };
    });
    updateAgentStep(1, "done", major ? `已识别专业: ${major}` : "继续分析用户输入...");

    // Step 2: 匹配中
    updateAgentStep(2, "running", "正在搜索相关竞赛...");
    await new Promise(r => setTimeout(r, 500));

    try {
      const result = await sendMessage(text);

      // Step 3: 评估中
      updateAgentStep(2, "done", "数据库匹配完成");
      updateAgentStep(3, "running", "正在评估匹配度...");
      await new Promise(r => setTimeout(r, 300));

      // 添加AI回复
      setMessages(prev => [...prev, {
        role: "assistant",
        content: result.answer || "根据你的情况，我推荐关注以下竞赛方向：\n\n1. **AI创新类** — 适合有编程基础的同学\n2. **创新创业类** — 适合有商业想法的团队\n3. **综合实践类** — 适合想全面锻炼能力的同学"
      }]);

      updateAgentStep(3, "done", "评估完成");
      updateAgentStep(4, "running", "生成推荐方案...");
      await new Promise(r => setTimeout(r, 300));
      updateAgentStep(4, "done", "推荐方案已就绪");
    } catch {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "😅 抱歉，AI 暂时无法连接，请稍后再试。你可以先查看下方的竞赛列表。"
      }]);
      updateAgentStep(2, "done", "连接失败，使用本地数据");
      updateAgentStep(3, "done", "已切换至离线模式");
      updateAgentStep(4, "done", "已展示本地推荐");
    }

    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleSend = async () => {
    await processMessage(input);
  };

  const handleSuggestionClick = (text: string) => {
    // 直接发送快捷提示，跳过输入框
    processMessage(text);
  };

  // 根据用户画像过滤竞赛推荐
  const getRecommendedCompetitions = () => {
    let filtered = competitions;

    if (userProfile.matched) {
      // 如果用户有专业或兴趣，按匹配度排序
      if (userProfile.major) {
        // 优先推荐与该专业相关的竞赛
        filtered = [...filtered].sort((a, b) => {
          const aRelevance = a.tags.some(t => t.includes(userProfile.major) || userProfile.interests.some(i => t.includes(i))) ? 1 : 0;
          const bRelevance = b.tags.some(t => t.includes(userProfile.major) || userProfile.interests.some(i => t.includes(i))) ? 1 : 0;
          return bRelevance - aRelevance;
        });
      }
    }

    return filtered;
  };

  const recommendedCompetitions = getRecommendedCompetitions();

  return (
    <Space
      direction="vertical"
      size="large"
      style={{ width: "100%" }}
    >
      {/* 页面标题 */}
      <div>
        <Typography.Title level={2} style={{ marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}>
          <RobotOutlined style={{ color: designTokens.colorPrimary }} />
          赛智通 AI竞赛智能体
        </Typography.Title>
        <Typography.Text type="secondary" style={{ fontSize: 15 }}>
          智能分析你的背景，自动规划最优竞赛路线
        </Typography.Text>
      </div>

      {/* 主区域：左右两列等高 */}
      <Row gutter={24} style={{ minHeight: 580 }}>
        {/* 左侧：对话区 */}
        <Col xs={24} md={16}>
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              background: "#fff",
              borderRadius: designTokens.borderRadius,
              boxShadow: "0 12px 40px rgba(15, 23, 42, 0.08)",
              overflow: "hidden",
              border: "1px solid rgba(22, 119, 255, 0.08)"
            }}
          >
            {/* 对话头部 */}
            <div
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid rgba(15, 23, 42, 0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "linear-gradient(135deg, rgba(22,119,255,0.03) 0%, rgba(22,119,255,0.08) 100%)"
              }}
            >
              <Space align="center" size={10}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: `linear-gradient(135deg, ${designTokens.colorPrimary}, #4096ff)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <RobotOutlined style={{ color: "#fff", fontSize: 16 }} />
                </div>
                <div>
                  <Typography.Text strong style={{ fontSize: 15 }}>AI 智能对话</Typography.Text>
                  <div>
                    <Tag
                      color={loading ? "processing" : "success"}
                      style={{ fontSize: 11, lineHeight: "18px", padding: "0 6px", margin: 0 }}
                    >
                      {loading ? "AI 正在推理中" : "等待输入"}
                    </Tag>
                  </div>
                </div>
              </Space>
              <BulbOutlined style={{ color: designTokens.colorPrimary, fontSize: 18, opacity: 0.6 }} />
            </div>

            {/* 消息区域 */}
            <div
              ref={messagesContainerRef}
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "20px",
                background: "#f8faff"
              }}
            >
              {/* 快捷提示 - 仅在对话开始时显示 */}
              {showSuggestions && messages.length <= 1 && (
                <div style={{ marginBottom: 20, textAlign: "center" }}>
                  <Typography.Text type="secondary" style={{ fontSize: 13, display: "block", marginBottom: 12 }}>
                    试试这些提问
                  </Typography.Text>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
                    {SUGGESTIONS.map((s, i) => (
                      <Button
                        key={i}
                        size="small"
                        type="default"
                        style={{
                          borderRadius: 20,
                          borderColor: "rgba(22, 119, 255, 0.3)",
                          color: designTokens.colorPrimary,
                          fontSize: 13,
                          padding: "4px 16px"
                        }}
                        onClick={() => handleSuggestionClick(s)}
                      >
                        {s}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* 消息列表 */}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                    marginBottom: 16,
                    gap: 10
                  }}
                >
                  {msg.role === "assistant" && (
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: `linear-gradient(135deg, ${designTokens.colorPrimary}, #4096ff)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: 4
                      }}
                    >
                      <RobotOutlined style={{ color: "#fff", fontSize: 14 }} />
                    </div>
                  )}

                  <div
                    style={{
                      position: "relative",
                      maxWidth: "78%",
                      padding: "14px 18px",
                      borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                      background: msg.role === "user"
                        ? "linear-gradient(135deg, #1677ff 0%, #4096ff 100%)"
                        : "#ffffff",
                      color: msg.role === "user" ? "#fff" : "inherit",
                      border: msg.role === "assistant" ? "1px solid rgba(22, 119, 255, 0.12)" : "none",
                      boxShadow: msg.role === "assistant" ? "0 4px 12px rgba(15, 23, 42, 0.06)" : "0 4px 12px rgba(22, 119, 255, 0.2)",
                      whiteSpace: "pre-wrap",
                      lineHeight: 1.7,
                      overflow: "hidden",
                    }}
                  >
                    {/* AI消息 - 呼吸光晕效果 */}
                    {msg.role === "assistant" && (
                      <div
                        style={{
                          position: "absolute",
                          top: -1,
                          left: -1,
                          right: -1,
                          bottom: -1,
                          borderRadius: "19px 19px 19px 5px",
                          background: "linear-gradient(135deg, transparent 30%, rgba(22,119,255,0.08) 60%, transparent 90%)",
                          opacity: 0.5 + Math.sin(Date.now() / 800) * 0.25,
                          zIndex: 0,
                          pointerEvents: "none",
                        }}
                      />
                    )}
                    <Typography.Text style={{ color: msg.role === "user" ? "#fff" : "rgba(15,23,42,0.85)", fontSize: 14, position: "relative", zIndex: 1 }}>
                      {msg.content}
                    </Typography.Text>
                  </div>

                  {msg.role === "user" && (
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: "#e8f0fe",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: 4
                      }}
                    >
                      <UserOutlined style={{ color: designTokens.colorPrimary, fontSize: 14 }} />
                    </div>
                  )}
                </div>
              ))}

              {/* AI 加载动画 */}
              {loading && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginBottom: 16,
                    gap: 10
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: `linear-gradient(135deg, ${designTokens.colorPrimary}, #4096ff)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 4
                    }}
                  >
                    <RobotOutlined style={{ color: "#fff", fontSize: 14 }} />
                  </div>
                  <div
                    style={{
                      padding: "14px 20px",
                      borderRadius: "18px 18px 18px 4px",
                      background: "#ffffff",
                      border: "1px solid rgba(22, 119, 255, 0.12)",
                      boxShadow: "0 4px 12px rgba(15, 23, 42, 0.06)"
                    }}
                  >
                    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                      <span style={{
                        width: 8, height: 8, borderRadius: "50%",
                        background: designTokens.colorPrimary,
                        animation: "loadingPulse 1.2s ease-in-out infinite",
                        animationDelay: "0s"
                      }} />
                      <span style={{
                        width: 8, height: 8, borderRadius: "50%",
                        background: designTokens.colorPrimary,
                        animation: "loadingPulse 1.2s ease-in-out infinite",
                        animationDelay: "0.3s"
                      }} />
                      <span style={{
                        width: 8, height: 8, borderRadius: "50%",
                        background: designTokens.colorPrimary,
                        animation: "loadingPulse 1.2s ease-in-out infinite",
                        animationDelay: "0.6s"
                      }} />
                    </div>
                    <Typography.Text type="secondary" style={{ fontSize: 13, marginTop: 6, display: "block" }}>
                      AI 正在分析你的需求...
                    </Typography.Text>
                  </div>
                </div>
              )}

            </div>

            {/* 输入区域 */}
            <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(15, 23, 42, 0.06)", background: "#fff" }}>
              <Input.TextArea
                ref={inputRef}
                value={input}
                rows={2}
                placeholder="输入你的专业、兴趣和竞赛目标..."
                onChange={e => setInput(e.target.value)}
                onPressEnter={e => {
                  if (!e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                style={{
                  borderRadius: 12,
                  resize: "none",
                  fontSize: 14,
                  padding: "10px 14px"
                }}
              />
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  loading={loading}
                  style={{ borderRadius: 10, height: 38, padding: "0 20px" }}
                  onClick={handleSend}
                >
                  {loading ? "AI 分析中" : "发送"}
                </Button>
              </div>
            </div>
          </div>
        </Col>

        {/* 右侧：Agent 状态 + 用户画像 */}
        <Col xs={24} md={8}>
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 16
            }}
          >
            {/* Agent 运行状态卡片 */}
            <Card
              title={
                <Space align="center" size={8}>
                  <ThunderboltOutlined style={{ color: designTokens.colorPrimary }} />
                  <span>Agent 运行状态</span>
                </Space>
              }
              styles={{ body: { padding: "12px 16px" } }}
              style={{
                borderRadius: designTokens.borderRadius,
                boxShadow: "0 12px 40px rgba(15, 23, 42, 0.08)",
                border: "1px solid rgba(22, 119, 255, 0.08)",
                flex: 1
              }}
            >
              <Space direction="vertical" size={0} style={{ width: "100%" }}>
                {agentSteps.map((step, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 0",
                      borderBottom: index < agentSteps.length - 1 ? "1px solid rgba(15, 23, 42, 0.06)" : undefined,
                      opacity: step.status === "wait" ? 0.5 : 1,
                      transition: "all 0.3s ease"
                    }}
                  >
                    {/* 状态图标 */}
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        flexShrink: 0,
                        background: step.status === "done"
                          ? "#52c41a"
                          : step.status === "running"
                          ? designTokens.colorPrimary
                          : "rgba(15,23,42,0.12)",
                        color: "#fff",
                        transition: "all 0.3s ease"
                      }}
                    >
                      {step.status === "done" ? "✓" : step.status === "running" ? "◉" : "○"}
                    </div>

                    {/* 文本 */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Typography.Text
                        strong
                        style={{
                          fontSize: 13,
                          color: step.status === "done"
                            ? "#52c41a"
                            : step.status === "running"
                            ? designTokens.colorPrimary
                            : "rgba(15,23,42,0.65)",
                          transition: "color 0.3s ease"
                        }}
                      >
                        {step.label}
                      </Typography.Text>
                      {step.detail && (
                        <div>
                          <Typography.Text
                            type="secondary"
                            style={{ fontSize: 12 }}
                          >
                            {step.detail}
                          </Typography.Text>
                        </div>
                      )}
                    </div>

                    {/* 状态标签 */}
                    <Tag
                      color={step.status === "done" ? "success" : step.status === "running" ? "processing" : "default"}
                      style={{ fontSize: 11, lineHeight: "18px", padding: "0 6px", margin: 0, flexShrink: 0 }}
                    >
                      {step.status === "done" ? "完成" : step.status === "running" ? "进行中" : "待执行"}
                    </Tag>
                  </div>
                ))}
              </Space>
            </Card>

            {/* 用户画像卡片 */}
            <Card
              title={
                <Space align="center" size={8}>
                  <UserOutlined style={{ color: designTokens.colorPrimary }} />
                  <span>用户画像</span>
                </Space>
              }
              styles={{ body: { padding: "12px 16px" } }}
              style={{
                borderRadius: designTokens.borderRadius,
                boxShadow: "0 12px 40px rgba(15, 23, 42, 0.08)",
                border: "1px solid rgba(22, 119, 255, 0.08)",
                flex: 1
              }}
            >
              <Space direction="vertical" size="small" style={{ width: "100%" }}>
                <div>
                  <Typography.Text style={{ fontSize: 13, color: "rgba(15,23,42,0.5)" }}>专业</Typography.Text>
                  <div style={{ marginTop: 2 }}>
                    <Tag
                      color={userProfile.major ? "blue" : "default"}
                      style={{ borderRadius: 6, fontSize: 12, padding: "2px 10px" }}
                    >
                      {userProfile.major || (userProfile.matched ? "AI 分析中..." : "等待输入...")}
                    </Tag>
                  </div>
                </div>
                <Divider style={{ margin: "6px 0" }} />
                <div>
                  <Typography.Text style={{ fontSize: 13, color: "rgba(15,23,42,0.5)" }}>兴趣方向</Typography.Text>
                  <div style={{ marginTop: 2, display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {userProfile.interests.length > 0
                      ? userProfile.interests.map((tag, i) => (
                          <Tag key={i} color="green" style={{ borderRadius: 6, fontSize: 12, padding: "2px 10px" }}>
                            {tag}
                          </Tag>
                        ))
                      : (
                        <Tag color="default" style={{ borderRadius: 6, fontSize: 12, padding: "2px 10px" }}>
                          {userProfile.matched ? "AI 分析中..." : "等待输入..."}
                        </Tag>
                      )}
                  </div>
                </div>
                <Divider style={{ margin: "6px 0" }} />
                <div>
                  <Typography.Text style={{ fontSize: 13, color: "rgba(15,23,42,0.5)" }}>竞赛目标</Typography.Text>
                  <div style={{ marginTop: 2 }}>
                    <Tag
                      color={userProfile.goal ? "purple" : "default"}
                      style={{ borderRadius: 6, fontSize: 12, padding: "2px 10px" }}
                    >
                      {userProfile.goal || (userProfile.matched ? "AI 分析中..." : "等待输入...")}
                    </Tag>
                  </div>
                </div>
                <Divider style={{ margin: "6px 0" }} />
                <div>
                  <Typography.Text style={{ fontSize: 13, color: "rgba(15,23,42,0.5)" }}>推荐倾向</Typography.Text>
                  <div style={{ marginTop: 2 }}>
                    <Tag color="gold" style={{ borderRadius: 6, fontSize: 12, padding: "2px 10px" }}>
                      {userProfile.interests.includes("AI") || userProfile.interests.includes("人工智能")
                        ? "AI创新类"
                        : userProfile.interests.includes("创业") || userProfile.interests.includes("创新")
                        ? "创新创业类"
                        : userProfile.interests.some(i => ["建模", "算法", "大数据"].includes(i))
                        ? "数理建模类"
                        : userProfile.major.includes("数学") || userProfile.major.includes("统计")
                        ? "数理建模类"
                        : "综合实践类"}
                    </Tag>
                  </div>
                </div>
              </Space>
            </Card>
          </div>
        </Col>
      </Row>

      {/* 推荐竞赛方案区域 */}
      <Card
        title={
          <div>
            <Typography.Title level={4} style={{ margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
              <BulbOutlined style={{ color: designTokens.colorPrimary }} />
              AI 为你推荐的竞赛方案
            </Typography.Title>
            <Typography.Text type="secondary" style={{ fontSize: 13 }}>
              {userProfile.matched
                ? `基于你的背景（${[userProfile.major, ...userProfile.interests].filter(Boolean).join("、")}），已为你筛选出最契合的竞赛`
                : "完成对话后，AI将根据你的情况推荐最适合的竞赛"}
            </Typography.Text>
          </div>
        }
        style={{
          borderRadius: designTokens.borderRadius,
          boxShadow: "0 12px 40px rgba(15, 23, 42, 0.08)",
          border: "1px solid rgba(22, 119, 255, 0.08)"
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 16
          }}
        >
          {recommendedCompetitions.slice(0, 10).map((item, index) => (
            <div key={item.id} style={{ position: "relative" }}>
              {/* AI 匹配度标签 */}
              {userProfile.matched && (
                <div
                  style={{
                    position: "absolute",
                    top: -6,
                    right: -6,
                    zIndex: 10,
                    background: `linear-gradient(135deg, ${designTokens.colorPrimary}, #4096ff)`,
                    color: "#fff",
                    fontSize: 11,
                    padding: "2px 10px",
                    borderRadius: 12,
                    boxShadow: "0 2px 8px rgba(22, 119, 255, 0.3)"
                  }}
                >
                  AI 推荐 #{index + 1}
                </div>
              )}
              <CompetitionCard competition={item} />
            </div>
          ))}
        </div>
      </Card>
    </Space>
  );
}

// 