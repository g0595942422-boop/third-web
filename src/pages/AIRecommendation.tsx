import {
  Card,
  Col,
  Row,
  Space,
  Typography,
  Input,
  Button,
  Tag,
  Avatar
} from "antd";

import {
  SendOutlined,
  RobotOutlined,
  UserOutlined
} from "@ant-design/icons";

import {
  useRef,
  useState
} from "react";

import { CompetitionCard } from "../components/CompetitionCard";
import { competitions } from "../services/competitions";
import { sendMessage } from "../services/agent";
import { designTokens } from "../styles/tokens";


type Message = {
  role: "user" | "assistant";
  content: string;
};


export function AIRecommendation() {
  const inputRef = useRef<any>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "你好，我是赛智通AI竞赛智能体，请告诉我你的专业、兴趣方向和竞赛目标。"
    }
  ]);

  const [agentStatus, setAgentStatus] = useState([
    "✓ 用户背景分析完成",
    "✓ 竞赛数据库匹配完成",
    "◉ 正在评估竞赛价值",
    "○ 生成参赛方案"
  ]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const text = input;
    setMessages(prev => [
      ...prev,
      {
        role: "user",
        content: text
      }
    ]);

    setInput("");
    setLoading(true);

    setAgentStatus([
      "◉ 分析用户画像",
      "○ 搜索竞赛数据库",
      "○ 评估匹配程度",
      "○ 生成竞赛方案"
    ]);

    try {
      const result = await sendMessage(text);

      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content:
            result.answer ||
            "根据你的情况，推荐关注AI创新、创新创业和综合实践类竞赛。"
        }
      ]);

      setAgentStatus([
        "✓ 用户背景分析完成",
        "✓ 竞赛数据库匹配完成",
        "✓ 竞赛价值评估完成",
        "✓ 推荐方案生成完成"
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "AI暂时无法连接，请稍后再试。"
        }
      ]);
    }

    setLoading(false);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  return (
    <Space
      direction="vertical"
      size="large"
      style={{
        width: "100%"
      }}
    >
      <div>
        <Typography.Title
          level={2}
          style={{
            marginBottom: 4
          }}
        >
          赛智通 AI竞赛智能体
        </Typography.Title>

        <Typography.Text type="secondary">
          智能理解你的背景，自动规划最优竞赛路线。
        </Typography.Text>
      </div>

      <Row gutter={24} align="stretch">
        <Col xs={24} md={16}>
          <Card
            title={
              <Space align="center" size={8}>
                <RobotOutlined />
                <span>AI智能对话</span>
              </Space>
            }
            extra={
              <Tag color={loading ? "processing" : "success"}>
                {loading ? "AI正在推理中" : "等待用户输入"}
              </Tag>
            }
            style={{
              borderRadius: designTokens.borderRadius,
              boxShadow: designTokens.boxShadow
            }}
          >
            <div
              style={{
                marginBottom: 16,
                padding: 12,
                borderRadius: designTokens.borderRadiusSmall,
                background: "rgba(22, 119, 255, 0.05)"
              }}
            >
              <Typography.Text type="secondary">
                我会分析你的专业、兴趣和赛道目标，并给出个性化竞赛方案。输入后，AI会逐步完成画像、匹配、评估和方案生成。
              </Typography.Text>
            </div>

            <div
              style={{
                height: 430,
                overflowY: "auto",
                padding: 12,
                borderRadius: designTokens.borderRadiusSmall,
                background: "#f7f9ff",
                border: `1px solid rgba(22, 119, 255, 0.12)`
              }}
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                    marginBottom: 14,
                    gap: 10
                  }}
                >
                  {msg.role === "assistant" && (
                    <Avatar size="small" icon={<RobotOutlined />} />
                  )}

                  <div
                    style={{
                      maxWidth: "75%",
                      padding: "14px 18px",
                      borderRadius: 18,
                      boxShadow: "0 8px 20px rgba(15, 23, 42, 0.04)",
                      background: msg.role === "user" ? "#e8f7ff" : "#ffffff",
                      border: msg.role === "assistant" ? "1px solid rgba(22, 119, 255, 0.16)" : "1px solid rgba(15, 23, 42, 0.06)"
                    }}
                  >
                    <Typography.Text type={msg.role === "assistant" ? "secondary" : undefined}>
                      {msg.content}
                    </Typography.Text>
                  </div>

                  {msg.role === "user" && (
                    <Avatar size="small" icon={<UserOutlined />} />
                  )}
                </div>
              ))}

              {loading && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginTop: 8,
                    padding: 12,
                    borderRadius: 16,
                    background: "rgba(22, 119, 255, 0.08)"
                  }}
                >
                  <Avatar size="small" icon={<RobotOutlined />} />
                  <div>
                    <Typography.Text strong>AI正在理解你的需求</Typography.Text>
                    <div style={{ marginTop: 4 }}>
                      <Typography.Text type="secondary">
                        正在生成个性化竞赛方案，请稍候……
                      </Typography.Text>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Input.TextArea
              ref={inputRef}
              value={input}
              rows={3}
              placeholder="输入你的专业、兴趣和竞赛目标..."
              onChange={e => setInput(e.target.value)}
              onPressEnter={e => {
                if (!e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              style={{
                marginTop: 16,
                borderRadius: designTokens.borderRadiusSmall
              }}
            />

            <Button
              type="primary"
              block
              icon={<SendOutlined />}
              loading={loading}
              style={{
                marginTop: 12,
                borderRadius: designTokens.borderRadiusSmall
              }}
              onClick={handleSend}
            >
              {loading ? "AI分析中" : "发送给AI"}
            </Button>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Card
              title="Agent运行状态"
              style={{
                borderRadius: designTokens.borderRadius,
                boxShadow: designTokens.boxShadow
              }}
            >
              <Space direction="vertical" size={0} style={{ width: "100%" }}>
                {agentStatus.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 0",
                      borderBottom: index < agentStatus.length - 1 ? "1px solid rgba(15, 23, 42, 0.06)" : undefined
                    }}
                  >
                    <Typography.Text>{item}</Typography.Text>
                    <Tag color={item.includes("✓") ? "success" : item.includes("◉") ? "processing" : "default"}>
                      {item.includes("✓") ? "完成" : item.includes("◉") ? "进行中" : "待执行"}
                    </Tag>
                  </div>
                ))}
              </Space>
            </Card>

            <Card
              title="用户画像"
              style={{
                borderRadius: designTokens.borderRadius,
                boxShadow: designTokens.boxShadow
              }}
            >
              <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                <div>
                  <Typography.Text strong>专业</Typography.Text>
                  <div>
                    <Tag color="blue">待分析</Tag>
                  </div>
                </div>
                <div>
                  <Typography.Text strong>技能</Typography.Text>
                  <div>
                    <Tag color="green">待分析</Tag>
                  </div>
                </div>
                <div>
                  <Typography.Text strong>目标</Typography.Text>
                  <div>
                    <Tag color="purple">待分析</Tag>
                  </div>
                </div>
                <div>
                  <Typography.Text strong>推荐倾向</Typography.Text>
                  <div>
                    <Tag color="gold">创新类 / 实践类</Tag>
                  </div>
                </div>
              </Space>
            </Card>
          </Space>
        </Col>
      </Row>

      <Card
        title={
          <div>
            <Typography.Title level={4} style={{ margin: 0 }}>
              智能推荐竞赛方案
            </Typography.Title>
            <Typography.Text type="secondary">
              基于当前任务，AI已为你筛选出最契合的竞赛资源。
            </Typography.Text>
          </div>
        }
        style={{
          borderRadius: designTokens.borderRadius,
          boxShadow: designTokens.boxShadow
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 16
          }}
        >
          {competitions.slice(0, 10).map(item => (
            <CompetitionCard key={item.id} competition={item} />
          ))}
        </div>
      </Card>
    </Space>
  );
}
