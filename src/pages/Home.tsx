import {
  Button,
  Card,
  Col,
  Row,
  Space,
  Tag,
  Typography
} from "antd";

import {
  TrophyOutlined,
  RobotOutlined
} from "@ant-design/icons";

import { competitions } from "../services/competitions";
import { designTokens } from "../styles/tokens";


export function Home() {

  const hotCompetitions = competitions.slice(0,3);

  return (

    <Space
      direction="vertical"
      size={designTokens.spacing.xl}
      style={{width:"100%"}}
    >

      <Card
        style={{
          borderRadius:designTokens.borderRadius,
          boxShadow:designTokens.boxShadow
        }}
      >

        <Space direction="vertical">

          <Typography.Title level={1}>
            AI竞赛智能推荐平台
          </Typography.Title>


          <Typography.Paragraph type="secondary">
            汇聚大学生热门竞赛资源，
            帮助你快速发现适合自己的比赛，
            并通过AI规划提升参赛效率。
          </Typography.Paragraph>


          <Button
            type="primary"
            icon={<RobotOutlined />}
            href="#/ai"
          >
            开始AI竞赛规划
          </Button>

        </Space>

      </Card>



      <div>

        <Typography.Title level={3}>
          <TrophyOutlined />
          热门竞赛
        </Typography.Title>


        <Typography.Paragraph type="secondary">
          当前热门赛事推荐，快速了解比赛方向。
        </Typography.Paragraph>



        <Row
          gutter={[
            designTokens.spacing.lg,
            designTokens.spacing.lg
          ]}
        >

          {
            hotCompetitions.map(item=>(

              <Col
                xs={24}
                md={8}
                key={item.id}
              >

                <Card
                  hoverable
                  style={{
                    height:"100%",
                    borderRadius:designTokens.borderRadius,
                    boxShadow:designTokens.boxShadow
                  }}
                >

                  <Space direction="vertical">

                    <Tag color="blue">
                      {item.status}
                    </Tag>


                    <Typography.Title
                      level={4}
                      style={{margin:0}}
                    >
                      {item.name}
                    </Typography.Title>


                    <Typography.Paragraph type="secondary">
                      {item.summary}
                    </Typography.Paragraph>


                    <Typography.Text>
                      截止时间：
                      {item.deadline}
                    </Typography.Text>


                    <Button
                      type="primary"
                      href={item.officialUrl}
                      target="_blank"
                    >
                      查看竞赛详情
                    </Button>


                  </Space>

                </Card>


              </Col>

            ))
          }


        </Row>


      </div>


    </Space>

  );
}
