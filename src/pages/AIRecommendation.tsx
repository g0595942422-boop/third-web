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


        <Typography.Text
          type="secondary"
        >

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
                <RobotOutlined/>
                {" "}
                AI Agent 工作台
                </>
              }

              style={{
                borderRadius:
                designTokens.borderRadius,

                boxShadow:
                designTokens.boxShadow
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


                <div
                  style={{
                    marginTop:12
                  }}
                >

                  <Tag color="blue">

                    专业：
                    {profile.major||"等待分析"}

                  </Tag>


                  <Tag color="green">

                    年级：
                    {profile.grade||"等待分析"}

                  </Tag>


                </div>


                <div
                  style={{
                    marginTop:10
                  }}
                >

                  <Typography.Text
                    type="secondary"
                  >

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
                marginTop:20,
                borderRadius:
                designTokens.borderRadius,
                boxShadow:
                designTokens.boxShadow
              }}
            >

              <div
                style={{
                  maxHeight:320,
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
                          display:"flex",
                          gap:10,
                          marginBottom:14
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
                            flex:1,
                            background:
                            message.role==="assistant"
                            ?
                            "#f5f7fa"
                            :
                            "#ffffff"
                          }}
                        >

                          {message.content}

                        </Card>


                      </div>

                    )
                  )
                }


              </div>



              <Input.TextArea

                ref={inputRef}

                rows={3}

                value={input}

                onChange={
                  e=>setInput(e.target.value)
                }

                placeholder="例如：我是经济学大二，想参加AI创新创业竞赛..."

              />



              <Button

                type="primary"

                block

                icon={
                  <SendOutlined/>
                }

                loading={loading}

                style={{
                  marginTop:12
                }}

                onClick={handleSend}

              >

                {
                  loading
                  ?
                  "AI分析中..."
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

              borderRadius:
              designTokens.borderRadius,

              boxShadow:
              designTokens.boxShadow

            }}

          >



            <Typography.Paragraph
              type="secondary"
            >

              AI会根据你的输入动态生成分析流程，
              并匹配适合你的竞赛方向。

            </Typography.Paragraph>



            <Card

              size="small"

              title="AI分析状态"

              style={{
                marginBottom:20
              }}

            >

              {
                workflow.length===0

                ?

                <Typography.Text
                  type="secondary"
                >

                  等待用户输入，智能体即将启动。

                </Typography.Text>

                :

                workflow.map(
                  (item,index)=>(

                    <p
                      key={index}
                    >

                      {
                        item.status==="done"
                        ?
                        "✓"
                        :
                        item.status==="running"
                        ?
                        "◉"
                        :
                        "○"
                      }

                      {" "}

                      {item.name}

                    </p>

                  )
                )

              }


            </Card>




            <Card

              size="small"

              title="匹配能力分析"

              style={{
                marginBottom:20
              }}

            >


              <Typography.Text>
                专业匹配
              </Typography.Text>

              <Progress
                percent={
                  workflow.length
                  ?
                  90
                  :
                  0
                }
              />



              <Typography.Text>
                兴趣匹配
              </Typography.Text>

              <Progress
                percent={
                  workflow.length
                  ?
                  85
                  :
                  0
                }
              />



              <Typography.Text>
                发展价值
              </Typography.Text>

              <Progress
                percent={
                  workflow.length
                  ?
                  88
                  :
                  0
                }
              />


            </Card>





            <Typography.Title
              level={4}
            >

              推荐竞赛 TOP4

            </Typography.Title>




            <Row
              gutter={[16,16]}
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

                  <Col

                    xs={24}

                    sm={12}

                    key={
                      competition.id
                    }

                  >

                    <CompetitionCard

                      competition={
                        competition
                      }

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
