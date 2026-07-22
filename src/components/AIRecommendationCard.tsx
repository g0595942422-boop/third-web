import {
  Card,
  Tag,
  Typography,
  Space
} from "antd";

import { designTokens } from "../styles/tokens";


interface Props {
  competition:any;
  score:number;
}


export function AIRecommendationCard({
  competition,
  score
}:Props){

  return (

    <Card
      hoverable
      style={{
        height:"100%",
        borderRadius:designTokens.borderRadius,
        boxShadow:designTokens.boxShadow
      }}
    >

      <Space
        direction="vertical"
        size="small"
        style={{width:"100%"}}
      >

        <Tag color="blue">
          AI匹配度 {score}%
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

          推荐原因：
          <br/>
          与你的兴趣方向高度匹配，
          适合积累项目经验。

        </Typography.Paragraph>


        <Typography.Text>
          建议准备周期：2-3个月
        </Typography.Text>


      </Space>

    </Card>

  );

}
