import {
  Card,
  Col,
  Row,
  Space,
  Typography,
  Input,
  Button
} from "antd";

import {
  SendOutlined,
  RobotOutlined
} from "@ant-design/icons";

import { useRef, useState } from "react";

import { AgentWorkflow } from "../components/AgentWorkflow";
import { CompetitionCard } from "../components/CompetitionCard";
import { competitions } from "../services/competitions";
import { designTokens } from "../styles/tokens";


export function AIRecommendation(){

  const [input,setInput]=useState("");

  const inputRef=useRef<any>(null);


  const [analyzing,setAnalyzing]=useState(false);



  const handleSend=()=>{

    if(!input.trim()) return;


    setAnalyzing(true);


    setTimeout(()=>{

      setAnalyzing(false);

    },1500);



    setInput("");


    setTimeout(()=>{

      inputRef.current?.focus();

    },100);


  };



  return (

    <Space
      direction="vertical"
      size={designTokens.spacing.xl}
      style={{
        width:"100%"
      }}
    >


      <Typography.Title level={2}>
        AI竞赛规划助手
      </Typography.Title>



      <Row
        gutter={[
          designTokens.spacing.lg,
          designTokens.spacing.lg
        ]}
        align="stretch"
      >



        {/* 左侧 Agent */}

        <Col
          xs={24}
          md={10}
        >


          <Card

            title={
              <>
                <RobotOutlined/>
                {" "}竞赛智能体
              </>
            }

            style={{

              height:720,

              borderRadius:
                designTokens.borderRadius,

              boxShadow:
                designTokens.boxShadow

            }}

          >


            <Space

              direction="vertical"

              size="large"

              style={{
                width:"100%"
              }}

            >



              <Card
                size="small"
              >

                <Typography.Text strong>
                  当前任务
                </Typography.Text>


                <Typography.Paragraph
                  style={{
                    marginTop:10,
                    marginBottom:0
                  }}
                >

                  根据你的专业背景、
                  兴趣方向以及目标，
                  推荐最适合参加的竞赛。

                </Typography.Paragraph>


              </Card>



              <AgentWorkflow />



              <Card
                size="small"
                title="输入需求"
              >


                <Input.TextArea

                  ref={inputRef}

                  rows={4}

                  value={input}

                  onChange={
                    e=>setInput(e.target.value)
                  }


                  placeholder=
                  "输入你的专业、兴趣和竞赛目标..."

                />



                <Button

                  type="primary"

                  icon={
                    <SendOutlined/>
                  }

                  block

                  style={{
                    marginTop:12
                  }}

                  onClick={handleSend}

                >

                  {
                    analyzing
                    ?
                    "AI正在分析..."
                    :
                    "发送给AI分析"
                  }


                </Button>


              </Card>



            </Space>


          </Card>



        </Col>






        {/* 右侧结果 */}

        <Col
          xs={24}
          md={14}
        >


          <Card

            title="AI决策结果"

            style={{

              height:720,

              borderRadius:
                designTokens.borderRadius,

              boxShadow:
                designTokens.boxShadow

            }}

          >



            <Typography.Paragraph
              type="secondary"
            >

              AI根据你的背景和目标，
              分析竞赛方向并生成推荐方案。

            </Typography.Paragraph>




            <Card
              size="small"
              style={{
                marginBottom:20
              }}
            >

              <Typography.Text strong>
                AI分析状态
              </Typography.Text>


              <br/>

              <Typography.Text>
                ✓ 已分析个人背景
              </Typography.Text>


              <br/>


              <Typography.Text>
                ✓ 已匹配竞赛数据库
              </Typography.Text>


              <br/>


              <Typography.Text>
                ◉ 正在评估竞赛价值
              </Typography.Text>


              <br/>


              <Typography.Text
                type="secondary"
              >
                ○ 生成参赛方案
              </Typography.Text>


            </Card>





            <Typography.Title
              level={4}
            >

              推荐竞赛 TOP4

            </Typography.Title>




            <div

              style={{

                height:390,

                overflowY:"auto",

                paddingRight:8

              }}

            >


              <Row

                gutter={[
                  designTokens.spacing.lg,
                  designTokens.spacing.lg
                ]}

              >


                {

                  competitions
                  .slice(0,4)
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


                  ))

                }


              </Row>


            </div>



          </Card>



        </Col>



      </Row>



    </Space>

  );

}
