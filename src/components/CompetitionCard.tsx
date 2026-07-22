import { Button, Card, Space, Typography, message } from 'antd';
import { useState } from 'react';

import { Competition } from '../services/competitions';
import {
  addMyCompetition,
  getMyCompetitions
} from '../services/myCompetitions';

import { designTokens } from '../styles/tokens';
import { CompetitionTag } from './CompetitionTag';


interface CompetitionCardProps {
  competition: Competition;
}


const statusType = {
  报名中: 'success',
  热门: 'warning',
  推荐: 'primary',
} as const;



export function CompetitionCard({
  competition
}: CompetitionCardProps) {


  const [joined, setJoined] = useState(

    getMyCompetitions().some(
      item => item.id === competition.id
    )

  );



  const handleAdd = () => {


    if (joined) {

      message.info('该竞赛已经加入我的竞赛');

      return;

    }


    addMyCompetition(competition);


    setJoined(true);


    message.success('已加入我的竞赛');

  };



  return (

    <Card
      style={{
        borderRadius: designTokens.borderRadius,
        boxShadow: designTokens.boxShadow,
        height:'100%'
      }}
    >


      <Space
        direction="vertical"
        size={designTokens.spacing.sm}
        style={{
          width:'100%'
        }}
      >


        <Space wrap>


          <CompetitionTag
            type={statusType[competition.status]}
          >
            {competition.status}
          </CompetitionTag>


          <CompetitionTag>
            {competition.difficulty}
          </CompetitionTag>


        </Space>




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





        <Space wrap>


          {
            competition.tags.map(tag => (

              <CompetitionTag
                key={tag}
                type="primary"
              >

                {tag}

              </CompetitionTag>

            ))
          }


        </Space>





        <Typography.Text
          type="secondary"
        >

          截止时间：{competition.deadline}

        </Typography.Text>





        <Typography.Paragraph>

          推荐理由：
          {competition.reason}

        </Typography.Paragraph>





        <Space>


          <Button

            type="primary"

            disabled={joined}

            onClick={handleAdd}

          >

            {
              joined
                ? '✓ 已加入'
                : '加入我的竞赛'
            }


          </Button>





          <Button

            href={competition.officialUrl}

            target="_blank"

          >

            查看官网

          </Button>



        </Space>



      </Space>


    </Card>

  );

}
