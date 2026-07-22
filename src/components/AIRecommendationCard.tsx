import {
  Card,
  Tag,
  Typography,
  Space
} from "antd";

import { designTokens } from "../styles/tokens";
import { CompetitionCard } from "./CompetitionCard";


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


        <Typography.Paragraph>
          <b>适合你的原因：</b>
          <br/>
          与你的兴趣方向高度匹配，
          适合积累项目经验。
        </Typography.Paragraph>


        <Typography.Text>
          建议准备周期：2-3个月
        </Typography.Text>


        <CompetitionCard
          competition={competition}
        />


      </Space>

    </Card>

  );

}
