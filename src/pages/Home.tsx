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
  const hotCompetitions = competitions.slice(0, 3);



  return (

    <Space

      direction="vertical"

      size={designTokens.spacing.xl}

      style={{
        width:'100%'
      }}

    >



      {/* 首页欢迎区域 */}

      <Card

        style={{

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







      {/* 热门竞赛 */}

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

            hotCompetitions.map(

              competition => (


                <Col

                  xs={24}

                  md={8}

                  key={competition.id}

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

                      size="small"

                    >



                      <Tag color="blue">

                        {competition.status}

                      </Tag>





                      <Typography.Title

                        level={4}

                        style={{

                          margin:0

                        }}

                      >

                        {competition.name}


                      </Typography.Title>





                      <Typography.Paragraph

                        type="secondary"

                      >

                        {competition.summary}


                      </Typography.Paragraph>





                      <Typography.Text>

                        截止时间：

                        {competition.deadline}

                      </Typography.Text>





                      <Button

                        type="primary"

                        href={competition.officialUrl}

                        target="_blank"

                      >

                        查看竞赛详情

                      </Button>



                    </Space>


                  </Card>



                </Col>


              )

            )

          }



        </Row>



      </div>







      {/* 平台特色 */}

      <Card

        style={{

          borderRadius:
            designTokens.borderRadius,

          boxShadow:
            designTokens.boxShadow

        }}

      >



        <Typography.Title level={3}>

          平台特色

        </Typography.Title>





        <Row

          gutter={[

            designTokens.spacing.lg,

            designTokens.spacing.lg

          ]}

        >



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


  );

}
