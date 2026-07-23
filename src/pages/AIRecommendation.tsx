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
  CheckCircleOutlined,
  LoadingOutlined
} from "@ant-design/icons";
import { useRef, useState } from "react";
import { CompetitionCard } from "../components/CompetitionCard";
import { AgentWorkflow } from "../components/AgentWorkflow";
import { competitions } from "../services/competitions";
import { designTokens } from "../styles/tokens";

export function AIRecommendation(){
  const [input,setInput]=useState("");
  const [analyzing,setAnalyzing]=useState(false);
  const inputRef=useRef<any>(null);

  const handleSend=()=>{
    if(!input.trim()) return;
    setAnalyzing(true);
    setTimeout(()=>{
      setAnalyzing(false);
    },2500);
    setInput("");
    setTimeout(()=>{
      inputRef.current?.focus();
    },100);
  };

  return(
    <div style={{width:"100%"}}>
      <Card
        style={{
          marginBottom:24,
          borderRadius:designTokens.borderRadius,
          boxShadow:designTokens.boxShadow
        }}
      >
        <Space>
          <Avatar
            size={48}
            icon={<RobotOutlined/>}
            style={{
              background:"#111827"
            }}
          />
          <div>
            <Typography.Title
              level={3}
              style={{
                margin:0
              }}
            >
              赛智通 AI Agent
            </Typography.Title>
            <Typography.Text type="secondary">
              智能分析竞赛方向，为你规划最佳参赛路线
            </Typography.Text>
          </div>
          <Tag
            color="success"
            style={{
              marginLeft:20
            }}
          >
            AI在线
          </Tag>
        </Space>
      </Card>

      <Row gutter={20} align="stretch">

        <Col xs={24} lg={6}>
          <Space
            direction="vertical"
            size="large"
            style={{
              width:"100%"
            }}
          >

            <Card
              title="🧠 Agent记忆"
              style={{
                borderRadius:designTokens.borderRadius,
                boxShadow:designTokens.boxShadow
              }}
            >
              <Typography.Text strong>
                用户画像
              </Typography.Text>

              <Divider/>

              <p>
                🎓 专业：
                <Tag>待分析</Tag>
              </p>

              <p>
                📚 年级：
                <Tag>待分析</Tag>
              </p>

              <p>
                🎯 目标：
                <Tag color="blue">
                  竞赛选择
                </Tag>
              </p>

              <p>
                💡 技能：
                <Tag>待补充</Tag>
              </p>

              <Typography.Text type="secondary">
                AI会根据你的输入不断完善用户画像
              </Typography.Text>

            </Card>

            <Card
              title="当前任务"
              style={{
                borderRadius:designTokens.borderRadius,
                boxShadow:designTokens.boxShadow
              }}
            >
              <p>
                <CheckCircleOutlined/>
                {" "}
                分析个人背景
              </p>

              <p>
                <LoadingOutlined/>
                {" "}
                匹配竞赛方向
              </p>

              <p>
                ○ 生成参赛方案
              </p>
            </Card>

          </Space>
        </Col>


        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <RobotOutlined/>
                AI智能对话
              </Space>
            }
            style={{
              height:"100%",
              minHeight:620,
              borderRadius:designTokens.borderRadius,
              boxShadow:designTokens.boxShadow
            }}
          >

            <div
              style={{
                height:380,
                overflow:"auto",
                padding:20,
                background:"#f8fafc",
                borderRadius:12
              }}
            >

              <Card
                size="small"
                style={{
                  marginBottom:16
                }}
              >
                <Space>
                  <Avatar icon={<RobotOutlined/>}/>
                  <div>
                    <Typography.Text strong>
                      赛智通
                    </Typography.Text>

                    <Typography.Paragraph>
                      你好，我是你的竞赛规划 Agent。
                      请告诉我你的专业、技能和目标，
                      我会帮你筛选适合参加的竞赛。
                    </Typography.Paragraph>
                  </div>
                </Space>
              </Card>


              {analyzing&&
                <Card size="small">
                  <Space>
                    <LoadingOutlined/>
                    AI正在分析你的背景并匹配竞赛...
                  </Space>
                </Card>
              }

            </div>


            <Space
              style={{
                width:"100%",
                marginTop:20
              }}
            >

              <Input.TextArea
                ref={inputRef}
                value={input}
                rows={3}
                onChange={e=>setInput(e.target.value)}
                placeholder="例如：我是经济学专业大二学生，想参加AI相关竞赛..."
              />

              <Button
                type="primary"
                icon={<SendOutlined/>}
                onClick={handleSend}
              >
                发送
              </Button>

            </Space>

          </Card>
        </Col>
                <Col xs={24} lg={6}>
          <Space
            direction="vertical"
            size="large"
            style={{
              width:"100%"
            }}
          >

            <Card
              title="⚙️ Agent工作流"
              style={{
                borderRadius:designTokens.borderRadius,
                boxShadow:designTokens.boxShadow
              }}
            >

              <AgentWorkflow/>

            </Card>


            <Card
              title="🏆 推荐竞赛"
              style={{
                borderRadius:designTokens.borderRadius,
                boxShadow:designTokens.boxShadow
              }}
            >

              <Typography.Paragraph
                type="secondary"
              >
                根据你的背景，
                AI筛选高匹配竞赛。
              </Typography.Paragraph>


              <Space
                direction="vertical"
                style={{
                  width:"100%"
                }}
              >

                {
                  competitions
                  .slice(0,2)
                  .map(item=>(
                    <CompetitionCard
                      key={item.id}
                      competition={item}
                    />
                  ))
                }

              </Space>

            </Card>

          </Space>
        </Col>

      </Row>

    </div>
  );
}
