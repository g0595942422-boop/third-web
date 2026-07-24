import { useState, useEffect, useRef, useCallback } from "react";
import { extractKeywords } from "../utils/extractKeywords";
import { recommendCompetitions } from "../utils/recommendCompetitions";
import { sendMessage } from "../../../services/agent";
import { competitions } from "../../../services/competitions";
import type { Message, AgentStep, UserProfile } from "../types";

export function useAgentChat() {
  const inputRef = useRef<any>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "你好！我是 **赛智通 AI 竞赛智能体** 🤖\n\n我可以帮你分析专业背景、推荐适合的竞赛、规划参赛路线。\n\n**请告诉我：**\n• 你的专业是什么？\n• 你对哪些方向感兴趣？\n• 你想达到什么目标？",
    },
  ]);

  const [agentSteps, setAgentSteps] = useState<AgentStep[]>([
    { label: "等待用户输入", status: "wait", detail: "请描述你的背景和需求" },
    { label: "分析用户画像", status: "wait", detail: "" },
    { label: "匹配竞赛数据库", status: "wait", detail: "" },
    { label: "评估匹配程度", status: "wait", detail: "" },
    { label: "生成推荐方案", status: "wait", detail: "" },
  ]);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    major: "",
    interests: [],
    goal: "",
    matched: false,
  });

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  // 仅在用户发送消息后滚动到底部
  useEffect(() => {
    if (shouldScroll && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
      setShouldScroll(false);
    }
  }, [messages, shouldScroll]);

  const updateAgentStep = (
    index: number,
    status: "wait" | "running" | "done",
    detail?: string,
  ) => {
    setAgentSteps((prev) =>
      prev.map((step, i) =>
        i === index ? { ...step, status, detail: detail || step.detail } : step,
      ),
    );
  };

  const processMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    setShowSuggestions(false);

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);
    setShouldScroll(true);

    updateAgentStep(0, "done", "用户已发送需求");
    updateAgentStep(1, "running", "正在提取关键词...");
    await new Promise((r) => setTimeout(r, 400));

    const { major, interests, goal } = extractKeywords(text);
    setUserProfile((prev) => {
      const newMajor = major || prev.major;
      const newInterests = [...new Set([...prev.interests, ...interests])];
      const newGoal = goal || prev.goal;
      return {
        major: newMajor,
        interests: newInterests,
        goal: newGoal,
        matched: !!(newMajor || newInterests.length > 0 || newGoal),
      };
    });
    updateAgentStep(
      1,
      "done",
      major ? `已识别专业: ${major}` : "继续分析用户输入...",
    );

    updateAgentStep(2, "running", "正在搜索相关竞赛...");
    await new Promise((r) => setTimeout(r, 500));

    try {
      const result = await sendMessage(text);

      updateAgentStep(2, "done", "数据库匹配完成");
      updateAgentStep(3, "running", "正在评估匹配度...");
      await new Promise((r) => setTimeout(r, 300));

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            result.answer ||
            "根据你的情况，我推荐关注以下竞赛方向：\n\n1. **AI创新类** — 适合有编程基础的同学\n2. **创新创业类** — 适合有商业想法的团队\n3. **综合实践类** — 适合想全面锻炼能力的同学",
        },
      ]);

      updateAgentStep(3, "done", "评估完成");
      updateAgentStep(4, "running", "生成推荐方案...");
      await new Promise((r) => setTimeout(r, 300));
      updateAgentStep(4, "done", "推荐方案已就绪");
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "😅 抱歉，AI 暂时无法连接，请稍后再试。你可以先查看下方的竞赛列表。",
        },
      ]);
      updateAgentStep(2, "done", "连接失败，使用本地数据");
      updateAgentStep(3, "done", "已切换至离线模式");
      updateAgentStep(4, "done", "已展示本地推荐");
    }

    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleSend = useCallback(async () => {
    await processMessage(input);
  }, [input]);

  const handleSuggestionClick = useCallback((text: string) => {
    processMessage(text);
  }, []);

  const recommendedCompetitions = recommendCompetitions(competitions, userProfile);

  return {
    input,
    setInput,
    loading,
    showSuggestions,
    messages,
    agentSteps,
    userProfile,
    inputRef,
    messagesContainerRef,
    handleSend,
    handleSuggestionClick,
    recommendedCompetitions,
  };
}
