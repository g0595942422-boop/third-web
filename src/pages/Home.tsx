import { Button, Card, Col, Row, Space, Typography } from 'antd';
import { CompetitionCard } from '../components/CompetitionCard';
import { competitions } from '../services/competitions';
import { designTokens } from '../styles/tokens';

export function Home() {
  return (
    <Space direction="vertical" size={designTokens.spacing.xl} style={{ width: '100%' }}>
      <Card style={{ borderRadius: designTokens.borderRadius, boxShadow: designTokens.boxShadow }}>
        <Typography.Title>AI竞赛规划智能体</Typography.Title>
<Typography.Paragraph type="secondary">
  告诉AI你的专业背景、兴趣方向和竞赛目标，智能分析你的情况，为你推荐适合的竞赛并提供规划建议。
</Typography.Paragraph>
<Button type="primary" size="large">开始AI规划</Button>
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
