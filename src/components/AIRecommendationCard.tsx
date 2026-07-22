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
  RobotOutlined,
  SendOutlined
} from "@ant-design/icons";

import { CompetitionCard } from "../components/CompetitionCard";
import { competitions } from "../services/competitions";
import { designTokens } from "../styles/tokens";


export function AIRecommendation() {

  return (
    <Space
      direction="vertical"
      size={designTokens.spacing.xl}
      style={{width:"100%"}}
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

        {/* 左侧AI聊天 */}

        <Col xs={24} md={10}>

          <Card
            title={
              <>
                <RobotOutlined /> AI助手
              </>
            }
            style={{
              height:"100%",
              borderRadius:designTokens.borderRadius,
              boxShadow:designTokens.boxShadow
            }}
          >

            <Space
              direction="vertical"
              size="middle"
              style={{width:"100%"}}
            >

              <Card size="small">

                <Typography.Text>
                  你好，我是你的竞赛规划助手。
                  请告诉我你的专业方向、兴趣以及参赛目标。
                </Typography.Text>

              </Card>


              <Card size="small">

                <Typography.Text type="secondary">
                  示例：
                  我是经济学专业学生，希望参加AI相关比赛，
                  提升项目经验和就业竞争力。
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



        {/* 右侧AI推荐 */}

        <Col xs={24} md={14}>

          <Space
            direction="vertical"
            size="large"
            style={{width:"100%"}}
          >

            <Card
              title="AI分析结果"
              style={{
                borderRadius:designTokens.borderRadius,
                boxShadow:designTokens.boxShadow
              }}
            >

              <Space
                direction="vertical"
                style={{width:"100%"}}
              >

                <Typography.Text strong>
                  综合匹配度
                </Typography.Text>


                <Progress
                  percent={95}
                />


                <Typography.Title level={5}>
                  推荐方向：AI创新与应用
                </Typography.Title>


                <Typography.Paragraph>
                  <b>适合你的原因：</b>
                  <br />
                  · AI方向发展空间大，适合积累项目经验
                  <br />
                  · 创新创业类竞赛与个人成长目标匹配
                  <br />
                  · 可以结合专业背景形成差异化优势
                </Typography.Paragraph>


                <Typography.Paragraph>
                  <b>提升方向：</b>
                  <br />
                  · 学习Python基础
                  <br />
                  · 积累AI项目实践经验
                  <br />
                  · 提前准备竞赛作品
                </Typography.Paragraph>


              </Space>

            </Card>




            <Card
              title="推荐竞赛"
              style={{
                borderRadius:designTokens.borderRadius,
                boxShadow:designTokens.boxShadow
              }}
            >

              <Row
                gutter={[
                  designTokens.spacing.lg,
                  designTokens.spacing.lg
                ]}
              >

                {
                  competitions.slice(0,4).map(item=>(

                    <Col
                      xs={24}
                      sm={12}
                      key={item.id}
                    >

                      <Card
                        style={{
                          height:"100%"
                        }}
                      >

                        <Tag color="blue">
                          AI匹配度 90%
                        </Tag>


                        <CompetitionCard
                          competition={item}
                        />

                      </Card>

                    </Col>

                  ))
                }

              </Row>


            </Card>


          </Space>

        </Col>


      </Row>


    </Space>
  );
}
