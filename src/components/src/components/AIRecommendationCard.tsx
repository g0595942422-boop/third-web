import {
  Button,
  Card,
  Progress,
  Space,
  Tag,
  Typography,
  message
} from "antd";

import {
  RobotOutlined,
  CheckCircleOutlined
} from "@ant-design/icons";


import { Competition } from "../services/competitions";
import {
  addMyCompetition
} from "../services/myCompetitions";

import { designTokens } from "../styles/tokens";



interface AIRecommendationCardProps {

  competition: Competition;

}




export function AIRecommendationCard({

  competition

}: AIRecommendationCardProps) {



  // 模拟AI分析结果
  const matchScore = 90 + (competition.id % 6);



  const handleAdd = () => {


    addMyCompetition(competition);


    message.success(
      "已加入我的竞赛"
    );


  };




  return (


    <Card

      hoverable

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




        {/* AI标识 */}

        <Tag

          color="blue"

          icon={<RobotOutlined />}

        >

          AI推荐

        </Tag>





        {/* 比赛名称 */}

        <Typography.Title

          level={4}

          style={{
            margin:0
          }}

        >

          {competition.name}


        </Typography.Title>






        {/* 匹配度 */}

        <div>


          <Typography.Text strong>

            AI匹配度

          </Typography.Text>



          <Progress

            percent={matchScore}

          />


        </div>







        {/* 推荐原因 */}

        <div>


          <Typography.Text strong>

            为什么推荐？

          </Typography.Text>



          <Typography.Paragraph

            type="secondary"

          >

            <CheckCircleOutlined />

            {" "}

            符合你的竞赛发展方向

            <br />


            <CheckCircleOutlined />

            {" "}

            有助于积累项目经验


            <br />


            <CheckCircleOutlined />

            {" "}

            适合作为个人能力展示

          </Typography.Paragraph>


        </div>








        {/* 提升方向 */}

        <div>


          <Typography.Text strong>

            提升方向

          </Typography.Text>



          <Typography.Paragraph

            type="secondary"

          >

            → 学习相关技术基础

            <br />

            → 完善项目实践能力

            <br />

            → 提前准备竞赛作品

          </Typography.Paragraph>


        </div>







        <Button

          type="primary"

          block

          onClick={handleAdd}

        >

          加入我的竞赛


        </Button>




      </Space>


    </Card>


  );

}
