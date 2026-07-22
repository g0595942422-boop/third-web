import {
  Card,
  Col,
  Row,
  Space,
  Typography,
  Input,
  Button,
} from "antd";

import {
  RobotOutlined,
  SendOutlined,
} from "@ant-design/icons";

import { CompetitionCard } from "../components/CompetitionCard";
import { competitions } from "../services/competitions";
import { designTokens } from "../styles/tokens";


export function AIRecommendation() {


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

        gutter={designTokens.spacing.lg}

      >



        {/* 左侧聊天区域 */}

        <Col

          xs={24}

          md={10}

        >

          <Card

            title={
              <>
                <RobotOutlined />
                {" "}AI助手
              </>
            }


            style={{

              height:"100%",

              borderRadius:
                designTokens.borderRadius,

              boxShadow:
                designTokens.boxShadow

            }}

          >



            <Space

              direction="vertical"

              size="middle"

              style={{
                width:"100%"
              }}

            >



              <Card size="small">

                <Typography.Text>

                  你好，我是你的竞赛规划助手。

                  请告诉我你的专业方向、
                  兴趣以及参赛目标。

                </Typography.Text>


              </Card>




              <Card

                size="small"

              >

                <Typography.Text type="secondary">

                  例如：
                  “我是计算机专业，希望参加AI相关比赛，提高科研能力”

                </Typography.Text>


              </Card>





              <Input.TextArea

                rows={4}

                placeholder="输入你的竞赛目标..."

              />



              <Button

                type="primary"

                icon={<SendOutlined />}

                block

              >

                发送给AI分析


              </Button>



            </Space>



          </Card>



        </Col>





        {/* 右侧推荐区域 */}

        <Col

          xs={24}

          md={14}

        >


          <Card


            title="AI推荐竞赛"


            style={{

              height:"100%",

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


              <Typography.Paragraph

                type="secondary"

              >

                根据你的背景分析，
                AI为你推荐以下竞赛方向。

              </Typography.Paragraph>





              {
                competitions.slice(0,2).map(
                  competition=>(

                    <CompetitionCard

                      key={competition.id}

                      competition={competition}

                    />


                  )

                )
              }



            </Space>



          </Card>


        </Col>



      </Row>


    </Space>


  );

}
