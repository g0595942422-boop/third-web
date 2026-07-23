import { Button, Card, Typography, message } from 'antd';
import { useEffect, useState } from 'react';

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
  const [expanded, setExpanded] = useState(false);



  // 监听加入/移除竞赛，实时更新按钮状态
  useEffect(() => {


    const updateJoined = () => {


      setJoined(

        getMyCompetitions().some(
          item => item.id === competition.id
        )

      );


    };



    window.addEventListener(
      'competitionChange',
      updateJoined
    );



    return () => {


      window.removeEventListener(
        'competitionChange',
        updateJoined
      );


    };


  }, [competition.id]);





  const handleAdd = () => {


    if (joined) {


      message.info(
        '该竞赛已经加入我的竞赛'
      );


      return;


    }



    addMyCompetition(
      competition
    );



    setJoined(true);



    // 通知其他页面更新
    window.dispatchEvent(
      new Event('competitionChange')
    );



    message.success(
      '已加入我的竞赛'
    );


  };





        const bodyStyle: React.CSSProperties = {
    padding: '20px 24px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  };

  return (
    <Card
      styles={{ body: bodyStyle }}
      style={{
        borderRadius: designTokens.borderRadius,
        boxShadow: designTokens.boxShadow,
        height: '100%',
      }}
    >
            {/* Tags row - fixed height 32px */}
      <div style={{ height: 32, display: 'flex', gap: 6, alignItems: 'center' }}>
        <CompetitionTag type={statusType[competition.status]}>
          {competition.status}
        </CompetitionTag>
        <CompetitionTag>
          {competition.difficulty}
        </CompetitionTag>
      </div>

      {/* Title - fixed height 48px for 2 rows */}
      <div style={{ height: 48, display: 'flex', alignItems: 'flex-start', marginBottom: 4 }}>
        <Typography.Title
          level={4}
          style={{ margin: 0, fontSize: 16, lineHeight: 1.4 }}
          ellipsis={{ rows: 2 }}
        >
          {competition.name}
        </Typography.Title>
      </div>

      {/* Summary - expands on click */}
      <div style={{ minHeight: 48, marginBottom: 4 }}>
        <Typography.Paragraph
          type="secondary"
          style={{ fontSize: 13, margin: 0, lineHeight: 1.6 }}
          ellipsis={expanded ? false : { rows: 2 }}
        >
          {competition.summary}
        </Typography.Paragraph>
      </div>

      {/* Tags */}
      <div style={{ minHeight: 28, display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
        {competition.tags.map(tag => (
          <CompetitionTag key={tag} type="primary">
            {tag}
          </CompetitionTag>
        ))}
      </div>

      {/* Bottom area */}
      <div style={{ marginTop: 'auto' }}>
        <Typography.Text
          type="secondary"
          style={{ fontSize: 12, display: 'block', marginBottom: 4 }}
        >
          截止时间：{competition.deadline}
        </Typography.Text>

        <div style={{ marginBottom: 4 }}>
          {expanded ? (
            <Typography.Paragraph style={{ fontSize: 12, margin: 0, lineHeight: 1.5 }}>
              推荐理由：{competition.reason}
            </Typography.Paragraph>
          ) : (
            <Typography.Paragraph
              style={{ fontSize: 12, margin: 0, lineHeight: 1.5 }}
              ellipsis={{ rows: 1 }}
            >
              推荐理由：{competition.reason}
            </Typography.Paragraph>
          )}
        </div>

                                {/* 展开/收起 - 理由超长时显示 */}
        {competition.reason.length > 40 && (
          <span
            onClick={() => setExpanded(!expanded)}
            style={{
              cursor: 'pointer',
              color: designTokens.colorPrimary,
              fontSize: 12,
              userSelect: 'none',
              display: 'inline-block',
              marginBottom: 8,
            }}
          >
            {expanded ? '收起详情 ▲' : '展开详情 ▼'}
          </span>
        )}

        <div style={{ display: 'flex', gap: 8 }}>
          <Button
            type="primary"
            size="small"
            disabled={joined}
            onClick={handleAdd}
            style={{ borderRadius: 8, fontSize: 13 }}
          >
            {joined ? '✓ 已加入' : '加入我的竞赛'}
          </Button>

          <Button
            size="small"
            href={competition.officialUrl}
            target="_blank"
            style={{ borderRadius: 8, fontSize: 13 }}
          >
            查看官网
          </Button>
        </div>
      </div>
    </Card>
  );

}
