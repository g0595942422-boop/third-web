import { Card, Col, Row, Space, Typography } from 'antd';
import { CompetitionCard } from '../components/CompetitionCard';
import { SearchBox } from '../components/SearchBox';
import { competitions } from '../services/competitions';
import { designTokens } from '../styles/tokens';

export function AIRecommendation() {
  return (
    <Space direction="vertical" size={designTokens.spacing.xl} style={{ width: '100%' }}>
      <Card title="AI 推荐条件" style={{ borderRadius: designTokens.borderRadius, boxShadow: designTokens.boxShadow }}><SearchBox /></Card>
      <Typography.Title level={3}>推荐结果</Typography.Title>
      <Row gutter={[designTokens.spacing.lg, designTokens.spacing.lg]}>
        {competitions.map((competition) => <Col xs={24} md={8} key={competition.id}><CompetitionCard competition={competition} /></Col>)}
      </Row>
    </Space>
  );
}
