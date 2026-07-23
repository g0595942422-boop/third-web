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
import { useRef, useState } from "react";
import { AgentWorkflow } from "../components/AgentWorkflow";
import { CompetitionCard } from "../components/CompetitionCard";
import { designTokens } from "../styles/tokens";

export function AIRecommendation(){
  const [input,setInput]=useState("");
  const inputRef=useRef<any>(null);
  const [loading,setLoading]=useState(false);
  const [messages,setMessages]=useState([
    {
      role:"assistant",
      content:"你好，我是赛智通AI竞赛智能体。请告诉我你的专业、年级、技能和目标，我会帮你规划竞赛方向。"
    }
  ]);
  const [workflow,setWorkflow]=useState<any[]>([]);
  const [profile,setProfile]=useState<any>({});
  const [recommendations,setRecommendations]=useState<any[]>([]);

  const handleSend=async()=>{
    if(!input.trim())return;
    const text=input;
    setMessages(prev=>[
      ...prev,
      {
        role:"user",
        content:text
      }
    ]);
    setInput("");
    setLoading(true);
    try{
      const res=await fetch("http://localhost:8000/chat",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          message:text
        })
      });
      const data=await res.json();
      setMessages(prev=>[
        ...prev,
        {
          role:"assistant",
          content:data.answer||"AI暂时没有返回结果"
        }
      ]);
      setWorkflow(data.workflow||[]);
      setProfile(data.profile||{});
      setRecommendations(data.recommendations||[]);
    }catch(e){
      setMessages(prev=>[
        ...prev,
        {
          role:"assistant",
          content:"当前无法连接智能体服务，请检查后端接口。"
        }
      ]);
    }
    setLoading(false);
    setTimeout(()=>{
      inputRef.current?.focus();
    },100);
  };

  return(
    <Space direction="vertical" size="large" style={{width:"100%"}}>
      <div>
        <Typography.Title level={2} style={{marginBottom:4}}>
          赛智通 AI竞赛智能体
        </Typography.Title>
        <Typography.Text type="secondary">
          基于用户画像和智能规划的竞赛推荐 Agent
        </Typography.Text>
      </div>
      <Row gutter={24} align="stretch">
        <Col xs={24} md={10}>
          <Space direction="vertical" size="large" style={{width:"100%"}}>
            <Card
              title={
                <>
                  <RobotOutlined/> AI Agent 工作台
                </>
              }
              style={{
                borderRadius:designTokens.borderRadius,
                boxShadow:designTokens.boxShadow
              }}
            >
              <Card size="small" style={{marginBottom:16}}>
                <Typography.Text strong>
                  用户画像
                </Typography.Text>
                <div style={{marginTop:12}}>
                  <Tag color="blue">
                    专业：{profile.major||"等待分析"}
                  </Tag>
                  <Tag color="green">
                    年级：{profile.grade||"等待分析"}
                  </Tag>
                </div>
                <div style={{marginTop:8}}>
                  <Typography.Text type="secondary">
                    技能：
                    {profile.skills?.join("、")||"等待分析"}
                  </Typography.Text>
                </div>
              </Card>
              <AgentWorkflow steps={workflow}/>
            </Card>
                        <Card
              title="与智能体交流"
              style={{
                borderRadius:designTokens.borderRadius,
                boxShadow:designTokens.boxShadow
              }}
            >
              <div style={{maxHeight:420,overflowY:"auto",marginBottom:16}}>
                {
                  messages.map((msg,index)=>(
                    <div key={index} style={{marginBottom:16}}>
                      <Space align="start">
                        <Avatar
                          icon={
                            msg.role==="assistant"
                            ?
                            <RobotOutlined/>
                            :
                            <UserOutlined/>
                          }
                        />
                        <Card
                          size="small"
                          style={{
                            maxWidth:"320px",
                            background:
                            msg.role==="assistant"
                            ?
                            "#f6f8fa"
                            :
                            "#e6f7ff"
                          }}
                        >
                          {msg.content}
                        </Card>
                      </Space>
                    </div>
                  ))
                }
              </div>
              <Input.TextArea
                ref={inputRef}
                rows={4}
                value={input}
                onChange={e=>setInput(e.target.value)}
                placeholder="例如：我是经济学专业大二，会Python，想参加AI创新创业竞赛"
              />
              <Button
                type="primary"
                block
                icon={<SendOutlined/>}
                loading={loading}
                style={{marginTop:12}}
                onClick={handleSend}
              >
                {loading?"AI正在分析...":"发送给AI"}
              </Button>
            </Card>
          </Space>
        </Col>
        <Col xs={24} md={14}>
          <Card
            title="AI决策中心"
            style={{
              height:"100%",
              borderRadius:designTokens.borderRadius,
              boxShadow:designTokens.boxShadow
            }}
          >
            <Typography.Paragraph type="secondary">
              智能体会根据用户输入动态生成分析流程、竞赛方向和参赛建议。
            </Typography.Paragraph>
            <Card
              size="small"
              title="Agent运行状态"
              style={{marginBottom:20}}
            >
              {
                workflow.length===0
                ?
                <Typography.Text type="secondary">
                  等待用户输入，智能体尚未启动。
                </Typography.Text>
                :
                workflow.map((item,index)=>(
                  <p key={index}>
                    {
                      item.status==="done"
                      ?
                      "✅"
                      :
                      item.status==="running"
                      ?
                      "🔵"
                      :
                      "⚪"
                    }
                    {" "}
                    {item.name}
                  </p>
                ))
              }
            </Card>
            <Typography.Title level={4}>
              AI推荐竞赛
            </Typography.Title>
            <Row gutter={[16,16]}>
              {
                recommendations.length===0
                ?
                <Col span={24}>
                  <Typography.Text type="secondary">
                    等待智能体分析后生成推荐。
                  </Typography.Text>
                </Col>
                :
                recommendations.map((item,index)=>(
                  <Col xs={24} sm={12} key={index}>
                    <CompetitionCard competition={item}/>
                  </Col>
                ))
              }
            </Row>
          </Card>
        </Col>
      </Row>
    </Space>
  );
}
