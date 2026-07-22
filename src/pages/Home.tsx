import { Button, Card, Col, Row, Space, Typography } from 'antd';
import { CompetitionCard } from '../components/CompetitionCard';
import { competitions } from '../services/competitions';
import { designTokens } from '../styles/tokens';

export function Home() {
  return (
    <Space direction="vertical" size={designTokens.spacing.xl} style={{ width: '100%' }}>
      <Card style={{ borderRadius: designTokens.borderRadius, boxShadow: designTokens.boxShadow }}>
        <Typography.Title>找到真正适合你的竞赛</Typography.Title>
        <Typography.Paragraph type="secondary">根据专业、兴趣、技能水平、时间安排与目标，快速获得竞赛推荐。</Typography.Paragraph>
        <Button type="primary" size="large">开始 AI 推荐</Button>
      </Card>
      <Typography.Title level={3}>热门竞赛</Typography.Title>
      <Row gutter={[designTokens.spacing.lg, designTokens.spacing.lg]}>
        {competitions.map((competition) => (
          <Col xs={24} md={8} key={competition.id}><CompetitionCard competition={competition} /></Col>
        ))}
      </Row>
    </Space>
  );
}
