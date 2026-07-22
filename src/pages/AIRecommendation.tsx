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

        gutter={[
          designTokens.spacing.lg,
          designTokens.spacing.lg
        ]}

        align="stretch"

      >





        {/* 左侧 AI聊天 */}

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



              <Card

                size="small"

              >

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

                  示例：

                  我是计算机专业，希望参加AI相关比赛，
                  提升科研和项目经验。

                </Typography.Text>


              </Card>





              <Input.TextArea

                rows={5}

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







        {/* 右侧推荐结果 */}

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



            <Typography.Paragraph

              type="secondary"

            >

              AI根据你的背景和目标，
              推荐适合你的竞赛方向。

            </Typography.Paragraph>





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

                  competition => (


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
