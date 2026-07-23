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
  CheckCircleOutlined,
  LoadingOutlined
} from "@ant-design/icons";
import { useRef, useState } from "react";
import { AgentWorkflow } from "../components/AgentWorkflow";
import { CompetitionCard } from "../components/CompetitionCard";
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
    },2000);
    setInput("");
    setTimeout(()=>{
      inputRef.current?.focus();
    },100);
  };

  return(
    <Space
      direction="vertical"
      size="large"
      style={{
        width:"100%"
      }}
    >

      <Card
        style={{
          borderRadius:designTokens.borderRadius,
          boxShadow:designTokens.boxShadow
        }}
      >
        <Space>
          <Avatar
            size={46}
            icon={<RobotOutlined/>}
            style={{
              background:"#111827"
            }}
          />
          <div>
            <Typography.Title
              level={2}
              style={{
                margin:0
              }}
            >
              赛智通 AI竞赛智能体
            </Typography.Title>
            <Typography.Text type="secondary">
              智能分析竞赛方向，匹配最佳项目，并生成参赛规划
            </Typography.Text>
          </div>
          <Tag color="success">
            AI在线
          </Tag>
        </Space>
      </Card>


      <Row
        gutter={20}
        align="stretch"
      >

        <Col
          xs={24}
          lg={6}
        >

          <Card
            title="🧠 我的竞赛画像"
            style={{
              height:"100%",
              borderRadius:designTokens.borderRadius,
              boxShadow:designTokens.boxShadow
            }}
          >

            <Typography.Text strong>
              AI当前了解的信息
            </Typography.Text>

            <Divider/>

            <p>
              🎓 专业：
              <Tag>
                待分析
              </Tag>
            </p>

            <p>
              📚 年级：
              <Tag>
                待分析
              </Tag>
            </p>

            <p>
              🎯 目标：
              <Tag color="blue">
                竞赛选择
              </Tag>
            </p>

            <p>
              💡 技能：
              <Tag>
                待补充
              </Tag>
            </p>

            <Typography.Text
              type="secondary"
            >
              AI会根据你的对话持续完善画像
            </Typography.Text>

          </Card>

        </Col>


        <Col
          xs={24}
          lg={12}
        >

          <Card
            title={
              <Space>
                <RobotOutlined/>
                AI智能对话
              </Space>
            }
            style={{
              height:"100%",
              minHeight:500,
              borderRadius:designTokens.borderRadius,
              boxShadow:designTokens.boxShadow
            }}
          >

            <div
              style={{
                minHeight:300,
                padding:16,
                background:"#fafafa",
                borderRadius:12
              }}
            >

              <Card
                size="small"
              >

                <Space align="start">

                  <Avatar
                    icon={<RobotOutlined/>}
                  />

                  <div>

                    <Typography.Text strong>
                      赛智通
                    </Typography.Text>

                    <Typography.Paragraph
                      style={{
                        marginTop:8
                      }}
                    >
                      你好，我是你的竞赛规划智能体。
                      请告诉我你的专业背景、技能和目标，
                      我会帮你寻找适合的竞赛方向。
                    </Typography.Paragraph>

                  </div>

                </Space>

              </Card>


              {
                analyzing&&
                <Card
                  size="small"
                  style={{
                    marginTop:12
                  }}
                >
                  <Space>
                    <LoadingOutlined/>
                    AI正在分析你的信息...
                  </Space>
                </Card>
              }


            </div>


            <Space
              style={{
                width:"100%",
                marginTop:16
              }}
            >

              <Input.TextArea
                ref={inputRef}
                value={input}
                rows={3}
                onChange={
                  e=>setInput(e.target.value)
                }
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


        <Col
          xs={24}
          lg={6}
        >

          <Space
            direction="vertical"
            size="large"
            style={{
              width:"100%"
            }}
          >

            <Card
              title="⚙️ AI分析过程"
              style={{
                borderRadius:designTokens.borderRadius,
                boxShadow:designTokens.boxShadow
              }}
            >

              <AgentWorkflow/>

            </Card>


          </Space>

        </Col>

      </Row>
            <Card
        title="🏆 AI推荐竞赛"
        style={{
          borderRadius:designTokens.borderRadius,
          boxShadow:designTokens.boxShadow
        }}
      >

        <Typography.Paragraph
          type="secondary"
        >
          根据你的专业背景、兴趣方向和发展目标，
          AI筛选高匹配竞赛项目。
        </Typography.Paragraph>


        <Row
          gutter={[16,16]}
        >

          {
            competitions
            .slice(0,4)
            .map(
              competition=>(
                <Col
                  xs={24}
                  sm={12}
                  lg={6}
                  key={competition.id}
                >

                  <CompetitionCard
                    competition={competition}
                  />

                </Col>
              )
            )
          }

        </Row>

      </Card>


    </Space>
  );
}
