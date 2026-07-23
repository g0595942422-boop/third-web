import {
  Card,
  Col,
  Row,
  Space,
  Typography,
  Input,
  Button,
  Progress,
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
import { AgentWorkflow } from "../components/AgentWorkflow";
import { CompetitionCard } from "../components/CompetitionCard";
import { competitions } from "../services/competitions";
import { sendMessage } from "../services/agent";
import { designTokens } from "../styles/tokens";
type WorkflowStep={
  name:string;
  status:"done"|"running"|"wait";
};
type Message={
  role:"user"|"assistant";
  content:string;
};
type Profile={
  major?:string;
  grade?:string;
  skills?:string[];
  goal?:string;
};
export function AIRecommendation(){
  const inputRef=useRef<any>(null);
  const [input,setInput]=useState("");
  const [loading,setLoading]=useState(false);
  const [messages,setMessages]=useState<Message[]>([
    {
      role:"assistant",
      content:
      "你好，我是赛智通AI竞赛智能体，请告诉我你的专业、年级、技能和竞赛目标。"
    }
  ]);
  const [workflow,setWorkflow]=useState<WorkflowStep[]>([]);
  const [profile,setProfile]=useState<Profile>({});
  const [recommendations,setRecommendations]=useState<any[]>([]);
  const handleSend=async()=>{
    if(!input.trim()){
      return;
    }
    const userInput=input;
    setMessages(prev=>[
      ...prev,
      {
        role:"user",
        content:userInput
      }
    ]);
    setInput("");
    setLoading(true);
    try{
      const result=await sendMessage(
        userInput
      );
      setMessages(prev=>[
        ...prev,
        {
          role:"assistant",
          content:
          result.answer ||
          "AI分析完成"
        }
      ]);
      setWorkflow(
        result.workflow
      );
      setRecommendations(
        result.recommendations
      );
    }catch(error){
      setMessages(prev=>[
        ...prev,
        {
          role:"assistant",
          content:
          "智能体连接失败，请检查后端服务。"
        }
      ]);
    }
    setLoading(false);
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
      <div>
        <Typography.Title
          level={2}
          style={{
            marginBottom:4
          }}
        >
          赛智通 AI竞赛智能体
        </Typography.Title>
        <Typography.Text type="secondary">
          基于用户画像、任务规划和竞赛匹配的智能 Agent
        </Typography.Text>
      </div>
      <Row
        gutter={24}
        align="stretch"
      >
        <Col
          xs={24}
          md={17}
        >
          <Card
            title={
              <>
                <RobotOutlined/> AI对话中心
              </>
            }
            style={{
              borderRadius:designTokens.borderRadius,
              boxShadow:designTokens.boxShadow
            }}
          >
            <div
              style={{
                height:430,
                overflowY:"auto",
                marginBottom:16
              }}
            >
              {
                messages.map((message,index)=>(
                  <div
                    key={index}
                    style={{
                      display:"flex",
                      gap:10,
                      marginBottom:14,
                      justifyContent:message.role==="user"?"flex-end":"flex-start"
                    }}
                  >
                    <Avatar
                      icon={
                        message.role==="assistant"
                        ?
                        <RobotOutlined/>
                        :
                        <UserOutlined/>
                      }
                    />
                    <Card
                      size="small"
                      style={{
                        maxWidth:"75%"
                      }}
                    >
                      {message.content}
                    </Card>
                  </div>
                ))
              }
            </div>
            <Input.TextArea
              ref={inputRef}
              rows={3}
              value={input}
              onChange={e=>setInput(e.target.value)}
              placeholder="请输入你的竞赛方向、专业和目标..."
            />
            <Button
              type="primary"
              block
              icon={<SendOutlined/>}
              loading={loading}
              style={{
                marginTop:12
              }}
              onClick={handleSend}
            >
              {loading?"AI分析中...":"发送给AI"}
            </Button>
          </Card>
        </Col>
        <Col
          xs={24}
          md={7}
        >
          <Space
            direction="vertical"
            size="large"
            style={{
              width:"100%"
            }}
          >
            <Card
              title="Agent状态"
              style={{
                borderRadius:designTokens.borderRadius,
                boxShadow:designTokens.boxShadow
              }}
            >
              <AgentWorkflow
                steps={workflow}
              />
            </Card>
            <Card
              title="用户画像"
              style={{
                borderRadius:designTokens.borderRadius,
                boxShadow:designTokens.boxShadow
              }}
            >
              <Tag color="blue">
                专业：{profile.major||"等待分析"}
              </Tag>
              <Tag color="green">
                年级：{profile.grade||"等待分析"}
              </Tag>
              <Typography.Paragraph
                style={{
                  marginTop:12
                }}
              >
                技能：
                {profile.skills?.join("、")||"等待分析"}
              </Typography.Paragraph>
            </Card>
          </Space>
        </Col>
      </Row>
      <Card
        title="推荐竞赛 TOP4"
        style={{
          borderRadius:designTokens.borderRadius,
          boxShadow:designTokens.boxShadow
        }}
      >
        <div
          style={{
            display:"flex",
            gap:16,
            overflowX:"auto",
            paddingBottom:8
          }}
        >
          {
            (
              recommendations.length
              ?
              recommendations
              :
              competitions.slice(0,4)
            )
            .map(
              competition=>(
                <div
                  key={competition.id}
                  style={{
                    minWidth:280
                  }}
                >
                  <CompetitionCard
                    competition={competition}
                  />
                </div>
              )
            )
          }
        </div>
      </Card>
    </Space>
  );
}
