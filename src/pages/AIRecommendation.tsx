import {
  Card,
  Col,
  Row,
  Space,
  Typography,
  Input,
  Button,
  Progress,
  Tag
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

    },2000);


    setInput("");

    setTimeout(()=>{

      inputRef.current?.focus();

    },100);

  };



  return (

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

          智能分析竞赛方向，匹配最佳项目，并生成参赛规划

        </Typography.Text>


      </div>





      <Row

        gutter={24}

        align="stretch"

      >



        {/* 左侧智能体 */}

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
                marginBottom:20
              }}

            >


              <Typography.Text strong>

                当前任务

              </Typography.Text>



              <Typography.Paragraph

                type="secondary"

              >

                根据用户专业背景、兴趣方向，
                推荐适合参加的竞赛。

              </Typography.Paragraph>


              <Tag color="blue">

                AI任务运行中

              </Tag>



            </Card>




            <AgentWorkflow/>



          </Card>






          <Card

            title="与智能体交流"

            style={{

              borderRadius:
              designTokens.borderRadius,

              boxShadow:
              designTokens.boxShadow

            }}

          >



            <Typography.Paragraph

              type="secondary"

            >

              输入你的专业、技能和目标，
              AI会重新规划竞赛路线。

            </Typography.Paragraph>




            <Input.TextArea

              ref={inputRef}

              rows={4}

              value={input}

              onChange={
                e=>setInput(e.target.value)
              }

              placeholder="例如：我是经济学专业，想参加AI创新创业竞赛..."

            />



            <Button

              type="primary"

              block

              icon={
                <SendOutlined/>
              }

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
                "发送给AI"
              }


            </Button>


          </Card>


          </Space>


        </Col>







        {/* 右侧结果 */}

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

            AI已经完成背景分析，
            正在根据竞赛数据库生成推荐。

          </Typography.Paragraph>





          <Card

            size="small"

            title="AI分析状态"

            style={{
              marginBottom:20
            }}

          >

            <p>
              ✓ 用户画像分析完成
            </p>


            <p>
              ✓ 竞赛数据库匹配完成
            </p>


            <p>
              ◉ 正在评估竞赛价值
            </p>


            <p>
              ○ 生成参赛方案
            </p>


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
              percent={90}
            />



            <Typography.Text>
              兴趣匹配
            </Typography.Text>

            <Progress
              percent={85}
            />



            <Typography.Text>
              发展价值
            </Typography.Text>

            <Progress
              percent={88}
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
            competitions
            .slice(0,4)
            .map(

              competition=>(

                <Col

                  xs={24}

                  sm={12}

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


        </Col>




      </Row>




    </Space>

  );

}
