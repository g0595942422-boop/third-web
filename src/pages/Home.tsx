import {
  Button,
  Card,
  Col,
  Row,
  Space,
  Tag,
  Typography
} from 'antd';

import {
  TrophyOutlined,
  RobotOutlined
} from '@ant-design/icons';


import { competitions } from '../services/competitions';
import { designTokens } from '../styles/tokens';



export function Home() {


  // 首页展示热门竞赛
  const hotCompetitions = competitions.slice(0,3);
  const hotCompetitions = competitions.slice(0, 3);



@@ -41,23 +42,34 @@
    >



      {/* 首页欢迎区域 */}

      <Card

        style={{
          borderRadius:designTokens.borderRadius,
          boxShadow:designTokens.boxShadow

          borderRadius:
            designTokens.borderRadius,

          boxShadow:
            designTokens.boxShadow

        }}

      >


        <Space

          direction="vertical"

          size="middle"

        >



          <Typography.Title level={1}>

            AI竞赛智能推荐平台
@@ -66,6 +78,7 @@




          <Typography.Paragraph type="secondary">

            汇聚大学生热门竞赛资源，
@@ -76,6 +89,7 @@




          <Button

            type="primary"
@@ -91,6 +105,7 @@
          </Button>



        </Space>


@@ -100,6 +115,8 @@





      {/* 热门竞赛 */}

      <div>
@@ -117,25 +134,32 @@

        <Typography.Paragraph type="secondary">

          当前热门赛事推荐，快速了解比赛方向
          当前热门赛事推荐，快速了解比赛方向。

        </Typography.Paragraph>





        <Row

          gutter={[

            designTokens.spacing.lg,

            designTokens.spacing.lg

          ]}

        >



          {

            hotCompetitions.map(

              competition => (


@@ -150,21 +174,27 @@
                >



                  <Card

                    hoverable

                    style={{

                      height:'100%',

                      borderRadius:
                        designTokens.borderRadius,

                      boxShadow:
                        designTokens.boxShadow

                    }}

                  >



                    <Space

                      direction="vertical"
@@ -184,12 +214,15 @@




                      <Typography.Title

                        level={4}

                        style={{

                          margin:0

                        }}

                      >
@@ -202,6 +235,7 @@




                      <Typography.Paragraph

                        type="secondary"
@@ -220,13 +254,15 @@
                      <Typography.Text>

                        截止时间：

                        {competition.deadline}

                      </Typography.Text>





                      <Button

                        type="primary"
@@ -271,7 +307,9 @@



      {/* AI入口 */}


      {/* 平台特色 */}

      <Card

@@ -288,42 +326,131 @@
      >



        <Typography.Title level={3}>

          不知道参加哪个竞赛？
          平台特色

        </Typography.Title>



        <Typography.Paragraph type="secondary">

          输入你的专业、兴趣和目标，
          AI将为你分析适合的竞赛方向。

        </Typography.Paragraph>

        <Row

          gutter={[

        <Button
            designTokens.spacing.lg,

          type="primary"
            designTokens.spacing.lg

          icon={<RobotOutlined />}
          ]}

        >

          使用AI推荐

        </Button>

          <Col

            xs={24}

            md={8}

          >


            <Typography.Title level={4}>

              🤖 AI智能匹配

            </Typography.Title>



            <Typography.Paragraph type="secondary">

              根据你的专业、兴趣和目标，
              智能分析适合你的竞赛方向。

            </Typography.Paragraph>


          </Col>





          <Col

            xs={24}

            md={8}

          >


            <Typography.Title level={4}>

              🏆 丰富赛事库

            </Typography.Title>



            <Typography.Paragraph type="secondary">

              汇集热门大学生竞赛资源，
              快速发现优秀比赛机会。

            </Typography.Paragraph>


          </Col>





          <Col

            xs={24}

            md={8}

          >


            <Typography.Title level={4}>

              📅 竞赛管理

            </Typography.Title>



            <Typography.Paragraph type="secondary">

              收藏关注的竞赛，
              管理报名时间和准备计划。

            </Typography.Paragraph>


          </Col>



        </Row>


      </Card>





    </Space>

