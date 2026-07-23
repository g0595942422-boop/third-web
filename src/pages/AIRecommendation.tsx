import {
  Card,
  Col,
  Row,
  Space,
  Typography,
  Input,
  Button,
  Avatar,
  Tag
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

type WorkflowStep={
  name:string;
  status:string;
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
      content:"你好，我是赛智通AI竞赛智能体，请告诉我你的专业、年级、技能和竞赛目标。"
    }
  ]);

  const [workflow,setWorkflow]=useState<WorkflowStep[]>([]);

  const [profile,setProfile]=useState<Profile>({});

  const [recommendations,setRecommendations]=useState<any[]>([]);


  const handleSend=async()=>{

    if(!input.trim()) return;

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

      const response=await fetch(
        "http://localhost:8000/chat",
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            message:userInput
          })
        }
      );


      const data=await response.json();


      setMessages(prev=>[
        ...prev,
        {
          role:"assistant",
          content:
          data.answer||
          "AI分析完成"
        }
      ]);


      setWorkflow(
        data.workflow||[]
      );


      setProfile(
        data.profile||{}
      );


      const formattedRecommendations=
      (data.recommendations||[])
      .map(
        (item:any,index:number)=>({
          id:item.id||String(index),
          name:item.name||item.title||"未知竞赛",
          status:item.status||"推荐",
          difficulty:item.difficulty||"未知",
          summary:item.summary||item.description||"",
          tags:item.tags||[],
          deadline:item.deadline||"待确认",
          reason:item.reason||"",
          officialUrl:item.officialUrl||"#"
        })
      );


      setRecommendations(
        formattedRecommendations
      );


    }catch(error){

      setMessages(prev=>[
        ...prev,
        {
          role:"assistant",
          content:"无法连接智能体服务，请确认后端接口已经启动。"
        }
      ]);

    }


    setLoading(false);


    setTimeout(()=>{
      inputRef.current?.focus();
    },100);

  }
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
          md={10}
        >
          <Space
            direction="vertical"
            size="large"
            style={{
              width:"100%"
            }}
          >
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
              <Card
                size="small"
                style={{
                  marginBottom:16
                }}
              >
                <Typography.Text strong>
                  用户画像
                </Typography.Text>

                <div style={{marginTop:12}}>
                  <Tag color="blue">
                    专业：
                    {profile.major||"等待分析"}
                  </Tag>

                  <Tag color="green">
                    年级：
                    {profile.grade||"等待分析"}
                  </Tag>
                </div>

                <div style={{marginTop:10}}>
                  <Typography.Text type="secondary">
                    技能：
                    {
                      profile.skills?.join("、")
                      ||
                      "等待分析"
                    }
                  </Typography.Text>
                </div>
              </Card>

              <AgentWorkflow
                steps={workflow}
              />

            </Card>


            <Card
              title="与智能体交流"
              style={{
                borderRadius:designTokens.borderRadius,
                boxShadow:designTokens.boxShadow
              }}
            >

              <div
                style={{
                  maxHeight:350,
                  overflowY:"auto",
                  marginBottom:16
                }}
              >

                {
                  messages.map(
                    (message,index)=>(
                      <div
                        key={index}
                        style={{
                          marginBottom:12
                        }}
                      >

                        <Space align="start">

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
                          >
                            {message.content}
                          </Card>

                        </Space>

                      </div>
                    )
                  )
                }

              </div>


              <Input.TextArea
                ref={inputRef}
                rows={4}
                value={input}
                onChange={
                  e=>setInput(e.target.value)
                }
                placeholder="例如：我是经济学大二学生，会Python，想参加AI创新创业类竞赛"
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
                {
                  loading
                  ?
                  "AI正在分析..."
                  :
                  "发送给AI"
                }
              </Button>

            </Card>

          </Space>
        </Col>


        <Col
          xs={24}
          md={14}
        >

          <Card
            title="AI决策中心"
            style={{
              height:"100%",
              borderRadius:designTokens.borderRadius,
              boxShadow:designTokens.boxShadow
            }}
          >

            <Typography.Paragraph
              type="secondary"
            >
              智能体会根据用户输入动态执行任务，并生成竞赛推荐方案。
            </Typography.Paragraph>


            <Card
              size="small"
              title="Agent任务状态"
              style={{
                marginBottom:20
              }}
            >

              {
                workflow.length===0
                ?
                <Typography.Text type="secondary">
                  等待用户输入，智能体尚未启动。
                </Typography.Text>
                :
                workflow.map(
                  (step,index)=>(
                    <p key={index}>
                      {
                        step.status==="done"
                        ?
                        "✅"
                        :
                        step.status==="running"
                        ?
                        "🔵"
                        :
                        "⚪"
                      }
                      {" "}
                      {step.name}
                    </p>
                  )
                )
              }

            </Card>


            <Typography.Title
              level={4}
            >
              AI推荐竞赛
            </Typography.Title>


            <Row
              gutter={[16,16]}
            >

              {
                recommendations.length===0
                ?
                <Col span={24}>
                  <Typography.Text type="secondary">
                    等待智能体生成推荐结果。
                  </Typography.Text>
                </Col>
                :
                recommendations.map(
                  item=>(
                    <Col
                      xs={24}
                      sm={12}
                      key={item.id}
                    >
                      <CompetitionCard
                        competition={item}
                      />
                    </Col>
                  )
                )
              }

            </Row>


          </Card>

        </Col>

      </Row>

    </Space>
  );
}
